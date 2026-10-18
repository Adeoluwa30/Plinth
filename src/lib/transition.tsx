import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import Loader from "../components/Loader";

type Mode = "intro" | "quick";
type Phase = "in" | "out";

type LoaderState = {
  mode: Mode | null;
  phase: Phase;
  duration: number;
};

type TransitionApi = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionApi>({ navigate: () => {} });

export const useFloorTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LoaderState>({
    mode: null,
    phase: "in",
    duration: 0,
  });
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const initialMode = useRef<Mode>(
    typeof window !== "undefined" && sessionStorage.getItem("plinth.visited")
      ? "quick"
      : "intro",
  );

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const lock = (on: boolean) => {
    document.documentElement.classList.toggle("is-locked", on);
  };

  const navigate = useCallback((href: string) => {
    if (busy.current) return;
    const target = document.getElementById(href.replace("#", ""));
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      history.replaceState(null, "", href);
      return;
    }

    busy.current = true;
    setState({ mode: "quick", phase: "in", duration: 950 });
    lock(true);

    timers.current.push(
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        history.replaceState(null, "", href);
        setState((s) => ({ ...s, phase: "out" }));
      }, 380),
    );

    timers.current.push(
      window.setTimeout(() => lock(false), 620),
    );

    timers.current.push(
      window.setTimeout(() => {
        setState({ mode: null, phase: "in", duration: 0 });
        busy.current = false;
      }, 1150),
    );
  }, []);

  // Branded door: full intro once per session, a fast wipe on return visits.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sessionStorage.setItem("plinth.visited", "1");
    if (reduce) return;

    const mode = initialMode.current;
    const duration = mode === "intro" ? 2100 : 900;

    busy.current = true;
    setState({ mode, phase: "in", duration });
    lock(true);

    const openAt = duration - 620;

    timers.current.push(
      window.setTimeout(() => {
        setState((s) => ({ ...s, phase: "out" }));
      }, openAt),
    );

    timers.current.push(
      window.setTimeout(() => lock(false), openAt + 220),
    );

    timers.current.push(
      window.setTimeout(() => {
        setState({ mode: null, phase: "in", duration: 0 });
        busy.current = false;
      }, duration + 340),
    );

    return clearTimers;
  }, []);

  // Every in-page anchor goes through the floor transition.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = e.target as HTMLElement | null;
      const anchor = el?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.classList.contains("skip")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      if (!document.getElementById(href.slice(1))) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <Loader mode={state.mode} phase={state.phase} duration={state.duration} />
      {children}
    </TransitionContext.Provider>
  );
}

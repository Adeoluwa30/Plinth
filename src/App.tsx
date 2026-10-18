import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Problem from "./components/Problem";
import Intelligence from "./components/Intelligence";
import Triage from "./components/Triage";
import Workflow from "./components/Workflow";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import Reports from "./components/Reports";
import Download from "./components/Download";
import Footer from "./components/Footer";
import { TransitionProvider } from "./lib/transition";
import { initParallax } from "./lib/parallax";

export default function App() {
  useEffect(() => {
    const stopParallax = initParallax();

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return stopParallax;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    els.forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      stopParallax();
    };
  }, []);

  return (
    <TransitionProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <Problem />
        <Intelligence />
        <Triage />
        <Workflow />
        <Dashboard />
        <Board />
        <Reports />
        <Download />
      </main>
      <Footer />
    </TransitionProvider>
  );
}

type ParallaxItem = {
  el: HTMLElement;
  speed: number;
  axis: "y" | "x";
  rotate: number;
};

const items = new Set<ParallaxItem>();
let frame = 0;

function update() {
  frame = 0;
  const vh = window.innerHeight;

  items.forEach(({ el, speed, axis, rotate }) => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    const center = rect.top + rect.height / 2;
    const progress = (center - vh / 2) / vh;
    const offset = -progress * speed * 420;
    if (axis === "x") {
      el.style.setProperty("--px", `${offset.toFixed(2)}px`);
    } else {
      el.style.setProperty("--py", `${offset.toFixed(2)}px`);
    }
    if (rotate) {
      el.style.setProperty("--pr", `${(progress * rotate).toFixed(2)}deg`);
    }
  });
}

function request() {
  if (!frame) frame = requestAnimationFrame(update);
}

export function registerParallax(
  el: HTMLElement,
  { speed = 0.12, axis = "y", rotate = 0 }: { speed?: number; axis?: "y" | "x"; rotate?: number } = {},
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return () => {};
  const item: ParallaxItem = { el, speed, axis, rotate };
  items.add(item);
  request();
  const onResize = () => request();
  window.addEventListener("resize", onResize, { passive: true });
  return () => {
    items.delete(item);
    window.removeEventListener("resize", onResize);
    el.style.removeProperty("--py");
    el.style.removeProperty("--px");
    el.style.removeProperty("--pr");
  };
}

export function initParallax() {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}


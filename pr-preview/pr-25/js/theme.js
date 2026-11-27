// Theme toggle: flips and saves overrides (clearing storage when returning to
// the system preference), with a circular wipe where supported.
(() => {
  const toggle = document.getElementById("theme-toggle");
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (!toggle || !meta) return;

  toggle.addEventListener("click", function () {
    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const current = meta.content === "light" || meta.content === "dark" ? meta.content : system;
    const next = current === "dark" ? "light" : "dark";
    const matchesSystem = next === system;

    const apply = () => {
      meta.content = matchesSystem ? "light dark" : next;
      try {
        if (matchesSystem) localStorage.removeItem("theme");
        else localStorage.setItem("theme", next);
      } catch (e) { }
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // No View Transitions support or reduced motion: switch instantly
    if (!document.startViewTransition || reduceMotion) return apply();

    // Wipe grows from the toggle to the farthest corner of the viewport
    const r = toggle.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    // Start at the icon's own size so the wipe visibly grows out of it
    const start = Math.max(r.width, r.height) / 2;

    document.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(${start}px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        // Gentle ease-out: fast near the icon, slowing smoothly into the far corner
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => { }); // skipped or interrupted: nothing to do
  });
})();

(() => {
  const screens = Array.from(document.querySelectorAll("[data-screen]"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const splash = document.getElementById("splash");

  function go(name) {
    if (!name) return;

    screens.forEach((screen) => {
      const active = screen.dataset.screen === name;
      screen.classList.toggle("screen--active", active);
      if (active) {
        screen.removeAttribute("hidden");
      } else {
        screen.setAttribute("hidden", "");
      }
    });

    tabs.forEach((tab) => {
      const active = tab.dataset.nav === name;
      tab.classList.toggle("tab--active", active);
      if (active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", `#${name}`);
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-nav]");
    if (!trigger) return;
    const target = trigger.dataset.nav;
    if (!target) return;
    if (trigger.tagName === "A") return;
    event.preventDefault();
    go(target);
  });

  const initial = (location.hash || "#inicio").replace("#", "");
  const known = screens.some((s) => s.dataset.screen === initial);
  go(known ? initial : "inicio");

  window.setTimeout(() => {
    splash?.classList.add("is-done");
  }, 1100);
})();

(() => {
  const app = document.getElementById("app");
  const tabbar = document.querySelector(".tabbar");
  const screens = [...document.querySelectorAll(".screen")];
  const tabs = [...document.querySelectorAll(".tab")];

  const show = (name) => {
    screens.forEach((screen) => {
      screen.classList.toggle("is-active", screen.dataset.screen === name);
    });
    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.nav === name);
    });
    if (tabbar) {
      tabbar.hidden = name === "splash";
    }
    const active = screens.find((screen) => screen.dataset.screen === name);
    if (active) active.scrollTop = 0;
  };

  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.nav;
      if (!target) return;
      show(target);
    });
  });

  // Splash → home
  window.setTimeout(() => {
    show("home");
  }, 1800);

  // Subtle entrance for phone on desktop
  const phone = document.getElementById("phone");
  if (phone && window.matchMedia("(min-width: 901px)").matches) {
    phone.animate(
      [
        { opacity: 0, transform: "translateY(24px) scale(0.98)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }
    );
  }

  // Expose for quick QA in console
  window.NCCMApp = { show };
})();

// ============================================================================
// vibecrafted.io — global site UI behaviors
//   Served from /site.js (self-hosted, no CSP hash needed).
//   Handles: mobile nav, footer drawer stabilizer, curl banner hover, and the
//   graceful background texture loader across Astro client-side navigations.
// ============================================================================

(function () {
  const mobileNavMedia = "(max-width: 720px)";

  // ============ MOBILE NAV ============
  function initMobileNav() {
    window.__vcNavCleanup?.();

    const shell = document.querySelector("[data-nav-shell]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const panel = document.querySelector("[data-nav-panel]");

    if (
      !(shell instanceof HTMLElement) ||
      !(toggle instanceof HTMLButtonElement) ||
      !(panel instanceof HTMLElement)
    ) {
      return;
    }

    const label = toggle.querySelector(".nav-toggle__label");
    const closedLabel = toggle.dataset.closedLabel ?? "Menu";
    const openLabel = toggle.dataset.openLabel ?? "Close";
    const media = window.matchMedia(mobileNavMedia);

    const setOpen = (open) => {
      shell.dataset.navOpen = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? openLabel : closedLabel);
      if (label) label.textContent = open ? openLabel : closedLabel;
      document.body.classList.toggle("nav-open", open && media.matches);
    };

    const closeNav = () => setOpen(false);

    if (toggle.dataset.navBound === "true") {
      setOpen(shell.dataset.navOpen === "true" && media.matches);
      return;
    }

    toggle.dataset.navBound = "true";
    setOpen(false);

    toggle.addEventListener("click", () => {
      setOpen(shell.dataset.navOpen !== "true");
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (media.matches) closeNav();
      });
    });

    const handleKeydown = (event) => {
      if (event.key === "Escape") closeNav();
    };

    const handleMediaChange = () => {
      if (!media.matches) closeNav();
    };

    document.addEventListener("keydown", handleKeydown);
    media.addEventListener("change", handleMediaChange);

    window.__vcNavCleanup = () => {
      document.removeEventListener("keydown", handleKeydown);
      media.removeEventListener("change", handleMediaChange);
      document.body.classList.remove("nav-open");
    };
  }

  // ============ FOOTER DRAWER STABILIZER ============
  function initFooterDrawer() {
    window.__vcFooterCleanup?.();

    const footer = document.querySelector(".footer-shell");
    if (
      !footer ||
      !window.matchMedia ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    let closeTimer = 0;

    const openDrawer = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = 0;
      }
      footer.setAttribute("data-drawer-open", "true");
    };
    const closeDrawerSoon = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        footer.removeAttribute("data-drawer-open");
        closeTimer = 0;
      }, 120);
    };

    const handleFocusOut = (event) => {
      if (footer.contains(event.relatedTarget)) return;
      closeDrawerSoon();
    };

    const handleWindowBlur = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = 0;
      footer.removeAttribute("data-drawer-open");
    };

    footer.addEventListener("pointerenter", openDrawer);
    footer.addEventListener("pointerleave", closeDrawerSoon);
    footer.addEventListener("focusin", openDrawer);
    footer.addEventListener("focusout", handleFocusOut);
    window.addEventListener("blur", handleWindowBlur);

    window.__vcFooterCleanup = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = 0;
      footer.removeEventListener("pointerenter", openDrawer);
      footer.removeEventListener("pointerleave", closeDrawerSoon);
      footer.removeEventListener("focusin", openDrawer);
      footer.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("blur", handleWindowBlur);
      footer.removeAttribute("data-drawer-open");
    };
  }

  // ============ HOVER CURL BANNER ============
  function initCurlBanner() {
    window.__vcCurlCleanup?.();

    const getZone = document.querySelector(".nav-get-zone");
    const curlBanner = document.querySelector(".curl-banner");
    if (!getZone || !curlBanner) return;

    let curlTimeout = null;
    let lastScrollY = window.scrollY || 0;
    const HIDE_DELAY = 650;

    const showBanner = () => {
      clearTimeout(curlTimeout);
      curlBanner.classList.add("is-visible");
    };
    const hideBanner = (delay = HIDE_DELAY) => {
      clearTimeout(curlTimeout);
      curlTimeout = setTimeout(() => {
        curlBanner.classList.remove("is-visible");
      }, delay);
    };

    const handleZoneLeave = () => hideBanner();
    const handleBannerLeave = () => hideBanner();
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      if (currentY > lastScrollY + 6) hideBanner(200);
      lastScrollY = currentY;
    };

    getZone.addEventListener("mouseenter", showBanner);
    getZone.addEventListener("mouseleave", handleZoneLeave);
    getZone.addEventListener("focusin", showBanner);
    getZone.addEventListener("focusout", handleZoneLeave);

    curlBanner.addEventListener("mouseenter", showBanner);
    curlBanner.addEventListener("mouseleave", handleBannerLeave);
    curlBanner.addEventListener("focusin", showBanner);
    curlBanner.addEventListener("focusout", handleBannerLeave);

    window.addEventListener("scroll", handleScroll, { passive: true });

    window.__vcCurlCleanup = () => {
      clearTimeout(curlTimeout);
      curlBanner.classList.remove("is-visible");
      getZone.removeEventListener("mouseenter", showBanner);
      getZone.removeEventListener("mouseleave", handleZoneLeave);
      getZone.removeEventListener("focusin", showBanner);
      getZone.removeEventListener("focusout", handleZoneLeave);
      curlBanner.removeEventListener("mouseenter", showBanner);
      curlBanner.removeEventListener("mouseleave", handleBannerLeave);
      curlBanner.removeEventListener("focusin", showBanner);
      curlBanner.removeEventListener("focusout", handleBannerLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }

  // ============ BACKGROUND STONE (graceful) ============
  // Loads the background texture only when:
  //   1. the viewport is wide enough to avoid upscaling pixelation
  //   2. the asset actually exists (probe via Image preload)
  //   3. the user does not prefer reduced data / reduced motion
  // On success, adds `has-bg-stone` to <body>, which activates the
  // desktop-only background-image layer defined in global.css.
  function initBackgroundStone() {
    if (document.body.dataset.bgStoneBound === "true") return;
    document.body.dataset.bgStoneBound = "true";

    const MIN_VIEWPORT = 901;
    if (window.innerWidth < MIN_VIEWPORT) return;

    const saveData = navigator.connection && navigator.connection.saveData;
    if (saveData) return;

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const img = new Image();
    img.onload = () => {
      document.body.classList.add("has-bg-stone");
    };
    img.onerror = () => {
      // silently ignore — gradient fallback stays in place
    };
    img.src = "/presence/background-stone.webp";
  }

  // ============ INIT ============
  function initAll() {
    initMobileNav();
    initFooterDrawer();
    initCurlBanner();
    initBackgroundStone();
  }

  document.addEventListener("astro:page-load", initAll);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();

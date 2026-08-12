/* ==========================================================================
   Portfolio behaviour: theme, mobile nav, header shadow, scroll reveal.
   Every feature is optional — nothing here is required to read the page.
   ========================================================================== */

(function () {
    "use strict";

    var root = document.documentElement;

    /* ---------- theme ----------
       The stored value only ever overrides the OS preference. No stored value
       means the CSS media query decides, which is the behaviour most people
       expect on a first visit. */

    var STORE_KEY = "kvw-theme";

    function storedTheme() {
        try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
    }

    function systemPrefersDark() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function activeTheme() {
        return root.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        syncToggle(theme);
    }

    function syncToggle(theme) {
        var btn = document.getElementById("themeToggle");
        if (!btn) return;
        btn.setAttribute("aria-pressed", String(theme === "dark"));
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }

    /* An inline script in <head> has already applied any stored theme so the
       page never flashes the wrong one. Here we sync the button to whatever is
       actually in force — which may be the OS preference, with nothing stored. */
    var saved = storedTheme();
    if (saved === "dark" || saved === "light") applyTheme(saved);
    else syncToggle(activeTheme());

    var themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var next = activeTheme() === "dark" ? "light" : "dark";
            applyTheme(next);
            try { localStorage.setItem(STORE_KEY, next); } catch (e) { /* private mode */ }
        });
    }

    /* ---------- mobile navigation ---------- */

    var burger = document.getElementById("burger");
    var navMenu = document.getElementById("navMenu");

    function closeNav() {
        if (!navMenu || !burger) return;
        navMenu.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
    }

    if (burger && navMenu) {
        burger.addEventListener("click", function () {
            var open = navMenu.classList.toggle("is-open");
            burger.setAttribute("aria-expanded", String(open));
        });

        navMenu.addEventListener("click", function (e) {
            if (e.target.closest("a")) closeNav();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
                closeNav();
                burger.focus();
            }
        });

        /* a resize past the breakpoint leaves the menu stuck open otherwise */
        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) closeNav();
        });
    }

    /* ---------- header shadow ---------- */

    var header = document.querySelector("header");
    if (header) {
        var ticking = false;
        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                header.classList.toggle("is-scrolled", window.scrollY > 24);
                ticking = false;
            });
        }, { passive: true });
    }

    /* ---------- scroll reveal ----------
       Two safety nets, because hidden content is a far worse failure than a
       missed animation:
         1. CSS only hides .reveal under html.js, so no JS means no hiding.
         2. If JS runs but the observer never fires — a headless renderer, a
            frozen tab, an environment that stubs IntersectionObserver — a
            timeout reveals everything anyway. */

    var revealables = document.querySelectorAll(".reveal");

    function revealAll() {
        Array.prototype.forEach.call(revealables, function (el) { el.classList.add("is-visible"); });
    }

    if (!("IntersectionObserver" in window)) {
        revealAll();
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);   /* reveal once, then stop watching */
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    Array.prototype.forEach.call(revealables, function (el) { observer.observe(el); });

    /* Nothing revealed a few seconds in means the observer isn't working.
       Show everything rather than leave the page looking empty. */
    window.setTimeout(function () {
        if (!document.querySelector(".reveal.is-visible")) {
            observer.disconnect();
            revealAll();
        }
    }, 2500);
})();

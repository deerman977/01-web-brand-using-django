(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#primary-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const revealElements = [...document.querySelectorAll(".reveal")];
  const backToTop = document.querySelector("#back-to-top");
  const currentYear = document.querySelector("#current-year");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  function setMenu(open) {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.toggle("open", open);
    navMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  menuToggle?.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu || !menuToggle) return;
    if (navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      setMenu(false);
    }
  });

  function updateScrollUI() {
    const y = window.scrollY;
    header?.classList.toggle("scrolled", y > 10);
    backToTop?.classList.toggle("show", y > 650);

    let currentId = "home";
    sections.forEach((section) => {
      if (y >= section.offsetTop - 180) currentId = section.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

contactForm?.addEventListener("submit", (event) => {

    formStatus.classList.remove("error");

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();

    if (!name || !email || !message) {

        event.preventDefault();

        formStatus.textContent = "Please complete all fields.";
        formStatus.classList.add("error");

        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        event.preventDefault();

        formStatus.textContent = "Please enter a valid email address.";
        formStatus.classList.add("error");

        return;
    }

});

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
})();

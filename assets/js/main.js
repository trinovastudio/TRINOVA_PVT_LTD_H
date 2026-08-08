// Trinova Aether — shared interaction layer
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    /* ---------- Mobile menu ---------- */
    const menuBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIconOpen = document.getElementById("icon-menu-open");
    const menuIconClose = document.getElementById("icon-menu-close");

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.classList.toggle("hidden", isOpen);
          menuIconClose.classList.toggle("hidden", !isOpen);
        }
      });
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
          if (menuIconOpen && menuIconClose) {
            menuIconOpen.classList.remove("hidden");
            menuIconClose.classList.add("hidden");
          }
        });
      });
    }

    /* ---------- Sticky header opacity on scroll ---------- */
    const header = document.getElementById("site-header");
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 24) header.classList.add("is-scrolled");
        else header.classList.remove("is-scrolled");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ---------- Active nav link ---------- */
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const target = link.getAttribute("data-nav");
      if (target === path || (target === "index.html" && path === "")) {
        link.classList.add("active");
      }
    });

    /* ---------- Scroll reveal ---------- */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));

    /* ---------- Card tilt ---------- */
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -6;
        const rotateY = ((x - rect.width / 2) / rect.width) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });

    /* ---------- Footer year ---------- */
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  });
})();

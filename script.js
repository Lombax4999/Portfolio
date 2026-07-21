const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

const savedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersLight = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

const initialTheme =
  savedTheme || (systemPrefersLight ? "light" : "dark");

function applyTheme(theme) {
  root.dataset.theme = theme;

  if (themeIcon) {
    themeIcon.textContent = theme === "light" ? "☀" : "☾";
  }

  localStorage.setItem("portfolio-theme", theme);
}

applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "light" ? "dark" : "light";

  applyTheme(nextTheme);
});

menuToggle?.addEventListener("click", () => {
  if (!siteNav) {
    return;
  }

  const isOpen = siteNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
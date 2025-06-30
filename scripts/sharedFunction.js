
// general header active function

// Exported page name
export const pageName = window.location.pathname.split('/').pop().split('.')[0] || "index";

// Highlight active link in nav
export function highlightActiveNavLink(navSelector = "nav a") {
  const links = document.querySelectorAll(navSelector);

  if (pageName === '' || pageName === 'index') {
    links[0]?.classList.add("active");
  } else {
    links.forEach(link => {
      const linkPage = link.getAttribute("href")?.split('.')[0];
      if (linkPage === pageName) {
        link.classList.add("active");
      }
    });
  }
}



// hamburger nav bar - menu related function
// use in script.js and promotions-script.js

let menu, hamburger;

export function initMenu(menuSelector = "#mobileNav", hamburgerSelector = ".hamburger") {
  menu = document.querySelector(menuSelector);
  hamburger = document.querySelector(hamburgerSelector);

  // Setup nav link auto-close
  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

export function toggleMenu() {
  if (!menu || !hamburger) return; // Prevent errors if not initialized

  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    document.addEventListener("click", outsideClickListener);
    window.addEventListener("scroll", closeOnScroll);
  } else {
    removeListeners();
  }
}

function outsideClickListener(event) {
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    closeMenu();
  }
}

function closeOnScroll() {
  closeMenu();
}

function closeMenu() {
  if (!menu) return;
  menu.classList.remove("show");
  removeListeners();
}

function removeListeners() {
  document.removeEventListener("click", outsideClickListener);
  window.removeEventListener("scroll", closeOnScroll);
}

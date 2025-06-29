// index/promotion/coming-soon
const pageName = window.location.pathname.split('/')[2].split('.')[0] || "index";
const links = document.querySelectorAll("nav a");

//console.log(pageName)

if (pageName === '' || pageName === 'index') {
    links[0].classList.add("active");
}
else {
    links.forEach(link => {
        if (link.getAttribute("href").split('.')[0] === pageName) {
            link.classList.add("active");
        }
    })
}

async function loadPromotions() {
  try {
    const response = await fetch('info/promotions.json');
    const promotions = await response.json();

    const container = document.getElementById('items');
    container.innerHTML = '';

    promotions.forEach(promo => {
      const card = document.createElement('article');
      card.className = 'card';

      card.innerHTML = `
        <div class="card-content">
            <img src="${promo.image}" alt="${promo.name}" class="promo-img">
            <p class="promo-name">${promo.name}</p>
            <a href="${promo.igLink}" target="_blank" class="promo-link">View on Instagram</a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading promotions:', error);
  }
}

loadPromotions();

const menu = document.getElementById("mobileNav");
const hamburger = document.querySelector(".hamburger");

// Toggle menu with animation
function toggleMenu() {
    menu.classList.toggle("show");

    if (menu.classList.contains("show")) {
      document.addEventListener("click", outsideClickListener);
      window.addEventListener("scroll", closeOnScroll);
    } else {
      removeListeners();
    }
}

// Close on outside click
function outsideClickListener(event) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
}

// Close on scroll
function closeOnScroll() {
    closeMenu();
}

// Close on nav link click
document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

function closeMenu() {
    menu.classList.remove("show");
    removeListeners();
}

function removeListeners() {
    document.removeEventListener("click", outsideClickListener);
    window.removeEventListener("scroll", closeOnScroll);
}
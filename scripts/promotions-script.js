// index/promotion/coming-soon/info

import { toggleMenu, initMenu } from './sharedFunction.js';
import { highlightActiveNavLink } from './sharedFunction.js';

// apply active nav link
highlightActiveNavLink();

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

// --------------- hamburger nav bar - menu related function ---------------

// Initialize menu with selectors
initMenu();

// Attach toggle function
document.querySelector(".hamburger")?.addEventListener("click", toggleMenu);

// --------------------------------------------------------------------------
// Responsive nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('show');
});

// Load favorites from local storage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch and display data.json items
async function loadData() {
  try {
    // ✅ Correct path to data.json inside "data" folder
    const response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const items = await response.json();
    console.log(items); // Debugging: check if data loads

    const container = document.getElementById('data-container');
    container.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>Category:</strong> ${item.category}</p>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Read More</a>
        <button class="details">Details</button>
        <button class="favorite">${favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'}</button>
      `;
      container.appendChild(card);

      // Modal functionality
      card.querySelector('.details').addEventListener('click', () => {
        showModal(item);
      });

      // Favorite functionality
      const favBtn = card.querySelector('.favorite');
      favBtn.addEventListener('click', () => {
        toggleFavorite(item.id, favBtn, items);
      });
    });

    // Show favorites section
    displayFavorites(items);
  } catch (error) {
    console.error('Error loading data:', error);
    document.getElementById('data-container').textContent = 'Failed to load data.';
  }
}

// Modal setup
function showModal(item) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${item.title}</h2>
      <p><strong>Category:</strong> ${item.category}</p>
      <p>${item.description}</p>
      <p><em>Link:</em> <a href="${item.link}" target="_blank">${item.link}</a></p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close').addEventListener('click', () => {
    modal.remove();
  });
}

// Toggle favorites in local storage
function toggleFavorite(id, button, items) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
    button.textContent = 'Favorite';
  } else {
    favorites.push(id);
    button.textContent = 'Unfavorite';
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites(items);
}

// Display favorites section
function displayFavorites(items) {
  const favContainer = document.getElementById('favorites-container');
  favContainer.innerHTML = '';

  if (favorites.length === 0) {
    favContainer.textContent = 'No favorites saved yet.';
    return;
  }

  const favItems = items.filter(item => favorites.includes(item.id));
  favItems.forEach(item => {
    const favCard = document.createElement('div');
    favCard.className = 'card favorite-card';
    favCard.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank">Read More</a>
    `;
    favContainer.appendChild(favCard);
  });
}

// Run on page load
loadData();



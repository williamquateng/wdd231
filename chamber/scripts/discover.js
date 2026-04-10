// Import the attractions data
import { items } from "../data/discover.mjs";

// Select the grid container
const container = document.querySelector(".discover-grid");

// Build cards dynamically from the JSON data
items.forEach((item, index) => {
  const card = document.createElement("section");
  card.classList.add("card");
  card.id = `card${index + 1}`;
  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;
  container.appendChild(card);
});

// Visitor message logic using localStorage
const messageArea = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    messageArea.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    messageArea.textContent = "You last visited 1 day ago.";
  } else {
    messageArea.textContent = `You last visited ${days} days ago.`;
  }
}

// Save the current visit date
localStorage.setItem("lastVisit", now);

// Update footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();


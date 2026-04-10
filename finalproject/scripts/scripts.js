// scripts.js

async function loadData() {
  const container = document.getElementById("data-container");

  try {
    // Fetch JSON file (must be in same folder as data.html)
    const response = await fetch("data/data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Clear container
    container.innerHTML = "";

    // Render each item
    if (Array.isArray(data)) {
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          ${item.link ? `<a href="${item.link}" target="_blank">Learn more</a>` : ""}
        `;

        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>No data available.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = `<p class="error">Failed to load data. Please try again later.</p>`;
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadData);



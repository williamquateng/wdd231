// Display copyright year and last modified
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("lastModified").textContent = document.lastModified;
  const year = new Date().getFullYear();
  document.querySelector("footer").insertAdjacentHTML("beforeend", `<p>&copy; ${year} Chamber of Commerce</p>`);
});

// Async function to fetch and display members
async function loadMembers() {
  const container = document.getElementById('directory');
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const members = await response.json();

    container.innerHTML = ''; // clear any previous content

    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>Address: ${member.address}</p>
        <p>Phone: ${member.phone}</p>
        <a href="${member.website}" target="_blank">Website</a>
        <p>Membership Level: ${member.membershipLevel}</p>
        <p>Category: ${member.category}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading members:', error);
    container.innerHTML = `<p class="error">⚠️ Members could not be loaded. Please try again later.</p>`;
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadMembers);

// Toggle between grid and list views
document.getElementById('gridView').addEventListener('click', () => {
  document.getElementById('directory').classList.add('grid');
  document.getElementById('directory').classList.remove('list');
});

document.getElementById('listView').addEventListener('click', () => {
  document.getElementById('directory').classList.add('list');
  document.getElementById('directory').classList.remove('grid');
});

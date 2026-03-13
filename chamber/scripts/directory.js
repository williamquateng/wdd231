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

// Toggle between grid and list views with active state + accessibility
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const directory = document.getElementById('directory');

gridBtn.addEventListener('click', () => {
  directory.classList.add('grid');
  directory.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
  directory.classList.add('list');
  directory.classList.remove('grid');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.setAttribute('aria-pressed', 'false');
});

// Default view on page load
document.addEventListener('DOMContentLoaded', () => {
  directory.classList.add('grid');
  gridBtn.classList.add('active');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
});


document.addEventListener("DOMContentLoaded", () => {
  const directory = document.getElementById("directory");

  fetch("data/members.json")
    .then(response => response.json())
    .then(members => {
      members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Business image
        const img = document.createElement("img");
        img.src = member.image;   // e.g. "sunrise.jpg"
        img.alt = member.name;

        // Business name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Address
        const address = document.createElement("p");
        address.textContent = member.address;

        // Phone
        const phone = document.createElement("p");
        phone.textContent = member.phone;

        // Website link
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";

        // Category & membership
        const category = document.createElement("p");
        category.textContent = `Category: ${member.category}`;

        const level = document.createElement("p");
        level.textContent = `Membership Level: ${member.membershipLevel}`;

        // Append everything
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(category);
        card.appendChild(level);

        directory.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading members:", error));
});

 document.addEventListener("DOMContentLoaded", () => {
    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
      lastModifiedSpan.textContent = document.lastModified;
    }
  });

  // Replace with your chamber location coordinates and API key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const lat = "5.1066";   // Example: Cape Coast latitude
const lon = "-1.2466";  // Example: Cape Coast longitude

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  // Current weather
  const currentTemp = data.list[0].main.temp;
  const description = data.list[0].weather[0].description;

  document.querySelector(".weather").innerHTML = `
    <h2>Local Weather</h2>
    <p>Current: ${currentTemp}°C, ${description}</p>
    <h3>3-Day Forecast</h3>
    <ul>
      <li>Day 1: ${data.list[8].main.temp}°C</li>
      <li>Day 2: ${data.list[16].main.temp}°C</li>
      <li>Day 3: ${data.list[24].main.temp}°C</li>
    </ul>
  `;
}

getWeather();


async function loadSpotlights() {
  try {
    const response = await fetch("members.json");
    const members = await response.json();

    // Filter for Gold and Silver members only
    const eligible = members.filter(m => 
      m.membership && (m.membership.toLowerCase() === "gold" || m.membership.toLowerCase() === "silver")
    );

    // Randomize and select 2–3
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.querySelector(".spotlights");
    container.innerHTML = "<h2>Member Spotlights</h2>";

    selected.forEach(member => {
      container.innerHTML += `
        <div class="company">
          ${member.logo ? `<img src="${member.logo}" alt="${member.name} logo">` : ""}
          <h3>${member.name}</h3>
          ${member.address ? `<p>${member.address}</p>` : ""}
          ${member.phone ? `<p>${member.phone}</p>` : ""}
          ${member.website ? `<a href="${member.website}" target="_blank">Visit Website</a>` : ""}
          <p>Membership Level: ${member.membership}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

loadSpotlights();


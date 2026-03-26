async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json"); // keep consistent path
    const members = await response.json();

    // Normalize membership property (works with either membership or membershipLevel)
    const eligible = members.filter(m => {
      const level = (m.membershipLevel || m.membership || "").toLowerCase();
      return level === "gold" || level === "silver";
    });

    // Randomize and select 2–3
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.querySelector(".spotlights");
    container.innerHTML = "<h2>Member Spotlights</h2>";

    selected.forEach(member => {
      const level = member.membershipLevel || member.membership || "Unknown";
      container.innerHTML += `
        <div class="company">
          ${member.logo ? `<img src="${member.logo}" alt="${member.name} logo">` : ""}
          <h3>${member.name}</h3>
          ${member.address ? `<p>${member.address}</p>` : ""}
          ${member.phone ? `<p>${member.phone}</p>` : ""}
          ${member.website ? `<a href="${member.website}" target="_blank">Visit Website</a>` : ""}
          <p>Membership Level: ${level}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Spotlight error:", error);
    const container = document.querySelector(".spotlights");
    if (container) {
      container.innerHTML = "<p>Unable to load member spotlights at this time.</p>";
    }
  }
}

loadSpotlights();

// Replace with your chamber location coordinates and API key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const lat = "5.1066";   // Example: Cape Coast latitude
const lon = "-1.2466";  // Example: Cape Coast longitude

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    // Current weather (first entry)
    const currentTemp = data.list[0].main.temp;
    const description = data.list[0].weather[0].description;

    // Forecast: pick one entry per day (every 24h = 8 intervals of 3h)
    const forecast = [];
    for (let i = 8; i <= 24; i += 8) {
      if (data.list[i]) {
        forecast.push({
          temp: data.list[i].main.temp,
          desc: data.list[i].weather[0].description,
          date: new Date(data.list[i].dt_txt).toLocaleDateString()
        });
      }
    }

    // Build HTML
    let html = `
      <h2>Local Weather</h2>
      <p>Current: ${currentTemp}°C, ${description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
    `;

    forecast.forEach((day, idx) => {
      html += `<li>Day ${idx + 1} (${day.date}): ${day.temp}°C, ${day.desc}</li>`;
    });

    html += "</ul>";

    document.querySelector(".weather").innerHTML = html;

  } catch (error) {
    console.error("Weather error:", error);
    document.querySelector(".weather").innerHTML = `
      <h2>Local Weather</h2>
      <p>Weather data unavailable at the moment.</p>
    `;
  }
}

getWeather();

 



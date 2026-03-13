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

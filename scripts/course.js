// Course List Array
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, completed: false },
  { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 2, completed: false },
  { code: "CSE111", name: "Data Structures", credits: 3, completed: false }
];

// DOM references
const courseContainer = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");

// Render courses
function displayCourses(courseList) {
  courseContainer.innerHTML = "";
  let credits = 0;

  courseList.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;

    courseContainer.appendChild(card);
    credits += course.credits;
  });

  totalCredits.textContent = `Total Credits: ${credits}`;
}

// Filters
document.getElementById("allBtn").addEventListener("click", () => displayCourses(courses));
document.getElementById("wddBtn").addEventListener("click", () => {
  displayCourses(courses.filter(c => c.code.startsWith("WDD")));
});
document.getElementById("cseBtn").addEventListener("click", () => {
  displayCourses(courses.filter(c => c.code.startsWith("CSE")));
});

// Initial load
displayCourses(courses);

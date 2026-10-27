const form = document.getElementById("marksForm");
const result = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");
const subjectIds = ["maths", "science", "english", "social", "computer"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();

  if (!name || !roll) {
    showError("Please enter the student's name and roll number.");
    return;
  }

  const marks = [];
  for (const id of subjectIds) {
    const input = document.getElementById(id);
    const value = input.valueAsNumber;
    if (input.value.trim() === "" || !Number.isFinite(value) || value < 0 || value > 100) {
      showError("Enter a valid mark from 0 to 100 for every subject.");
      input.focus();
      return;
    }
    marks.push(value);
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / 5;
  const passedAll = marks.every((mark) => mark >= 35);
  let grade;

  if (!passedAll) grade = "F";
  else if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";
  else grade = "E";

  document.getElementById("resultName").textContent = name;
  document.getElementById("resultRoll").textContent = roll;
  document.getElementById("totalMarks").textContent = `${total} / 500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = grade;

  const status = document.getElementById("status");
  status.textContent = passedAll ? "PASS — all subjects cleared" : "FAIL — one or more subjects below 35";
  status.classList.toggle("fail", !passedAll);
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

function showError(message) {
  errorMessage.textContent = message;
  result.hidden = true;
}

form.addEventListener("reset", () => {
  errorMessage.textContent = "";
  result.hidden = true;
});

document.getElementById("printButton").addEventListener("click", () => window.print());

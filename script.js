//your JS code here.

// Select main DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load user answers from session storage or initialize empty
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions dynamically
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before re-rendering
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(`${i + 1}. ${question.question}`);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore previous selections from session storage
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Add event listener to save progress
      choiceElement.addEventListener("change", () => saveProgress(i, choice));

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Save progress into session storage
function saveProgress(questionIndex, selectedChoice) {
  userAnswers[questionIndex] = selectedChoice;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Submit and calculate score
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;

  // Save score to local storage
  localStorage.setItem("score", score);
});

// Show last score if available in local storage
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.innerText = `Your last score was: ${storedScore} out of ${questions.length}.`;
}

// Initial render
renderQuestions();

// Questions dataset
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    choices: ["Elephant", "Tiger", "Lion", "Cheetah"],
    answer: "Lion",
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
];

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

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
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

      label.appendChild(choiceElement);
      label.append(` ${choice}`);
      questionElement.appendChild(label);
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

  // Clear progress after submit
  sessionStorage.removeItem("progress");
});

// Show last score ONLY if progress is not in session storage
const storedScore = localStorage.getItem("score");
if (storedScore !== null && !sessionStorage.getItem("progress")) {
  scoreElement.innerText = `Your last score was: ${storedScore} out of ${questions.length}.`;
}

// Initial render
renderQuestions();

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is the boiling point of water?",
    choices: ["100°C", "90°C", "80°C", "70°C"],
    answer: "100°C",
  },
  {
    question: "What is the square root of 64?",
    choices: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare",
  },
];

// Load Questions
const questionsDiv = document.getElementById("questions");

function loadQuestions() {
  questionsDiv.innerHTML = "";
  const savedAnswers = JSON.parse(sessionStorage.getItem("answers")) || {};

  questions.forEach((q, index) => {
    const questionWrapper = document.createElement("div");
    questionWrapper.innerHTML = `${index + 1}. ${q.question}`;

    q.choices.forEach(choice => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");

      choiceInput.type = "radio";
      choiceInput.name = `question${index}`;
      choiceInput.value = choice;

      if (savedAnswers[`question${index}`] === choice) {
        choiceInput.checked = true;
      }

      choiceInput.addEventListener("click", () => {
        savedAnswers[`question${index}`] = choice;
        sessionStorage.setItem("answers", JSON.stringify(savedAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionWrapper.appendChild(choiceLabel);
      questionWrapper.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionWrapper);
  });
}

loadQuestions();

// Submit Button Handler
document.getElementById("submit").addEventListener("click", () => {
  const savedAnswers = JSON.parse(sessionStorage.getItem("answers")) || {};
  let score = 0;

  questions.forEach((q, index) => {
    if (savedAnswers[`question${index}`] === q.answer) {
      score++;
    }
  });

  document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

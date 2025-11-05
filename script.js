window.questions = [
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

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitButton = document.getElementById("submit");

function renderQuestions() {
  questionsDiv.innerHTML = "";
  const savedAnswers = JSON.parse(sessionStorage.getItem("answers")) || {};

  window.questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice, i) => {
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question${index}`;
      choiceInput.value = choice;
      if (savedAnswers[`question${index}`] === choice) {
        choiceInput.checked = true;
      }
      choiceInput.addEventListener("change", () =>
        saveAnswer(index, choice)
      );
      questionDiv.appendChild(choiceInput);
      questionDiv.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionDiv);
  });
}

function saveAnswer(index, choice) {
  const savedAnswers = JSON.parse(sessionStorage.getItem("answers")) || {};
  savedAnswers[`question${index}`] = choice;
  sessionStorage.setItem("answers", JSON.stringify(savedAnswers));
}

submitButton.addEventListener("click", () => {
  const savedAnswers = JSON.parse(sessionStorage.getItem("answers")) || {};
  let score = 0;

  window.questions.forEach((q, index) => {
    if (savedAnswers[`question${index}`] === q.answer) {
      score++;
    }
  });

  scoreDiv.innerHTML = `Your score is ${score} out of ${window.questions.length}.`;
  localStorage.setItem("score", score);
});

// Initialize
renderQuestions();

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    choices: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What year was JavaScript launched?",
    choices: ["1996", "1995", "1994", "None of the above"],
    answer: "1995",
  },
  {
    question: "What is 2 + 2 * 2?",
    choices: ["6", "8", "4", "10"],
    answer: "6",
  },
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitButton = document.getElementById("submit");

function renderQuestions() {
  questionsDiv.innerHTML = "";
  const savedAnswers = JSON.parse(sessionStorage.getItem("answers")) || {};

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.textContent = `${q.question}`;

    q.choices.forEach((choice, i) => {
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question${index}`;
      choiceInput.value = choice;
      if (savedAnswers[`question${index}`] === choice) {
        choiceInput.checked = true;
      }
      choiceInput.addEventListener("click", () =>
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

  questions.forEach((q, index) => {
    if (savedAnswers[`question${index}`] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Initial rendering
renderQuestions();

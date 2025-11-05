window.questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    choices: ["Elephant", "Tiger", "Lion", "Cheetah"],
    answer: "Lion"
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide"
  }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreContainer = document.getElementById("score");
function loadProgress() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  questionsContainer.innerHTML = "";

  window.questions.forEach((q, qIndex) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.innerText = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice, cIndex) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${qIndex}`;
      input.value = choice;

      if (savedProgress[`question${qIndex}`] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => saveProgress(qIndex, choice));

      questionDiv.appendChild(input);
      questionDiv.append(choice);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });
}

function saveProgress(qIndex, choice) {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  savedProgress[`question${qIndex}`] = choice;
  sessionStorage.setItem("progress", JSON.stringify(savedProgress));
}
submitButton.addEventListener("click", () => {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  window.questions.forEach((q, qIndex) => {
    if (savedProgress[`question${qIndex}`] === q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of ${window.questions.length}.`;
  scoreContainer.innerText = resultText;
  localStorage.setItem("score", score);
});

loadProgress();

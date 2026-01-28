const questions = [
    {
        question: "What is the full form of CSS?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ],
        difficulty: 30
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "css", correct: false },
            { text: "style", correct: true },
            { text: "script", correct: false },
            { text: "link", correct: false },
        ],
        difficulty: 30
    },
    {
        question: "What does API stand for?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Application Program Interface", correct: false },
            { text: "Application Programming Instruction", correct: false },
            { text: "Applied Program Instruction", correct: false },
        ],
        difficulty: 45
    },
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
        difficulty: 30
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ],
        difficulty: 45
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ],
        difficulty: 60
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ],
        difficulty: 30
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false },
        ],
        difficulty: 30
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
        ],
        difficulty: 45
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
        ],
        difficulty: 60
    },
    {
        question: "How many continents are there in the world?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ],
        difficulty: 30
    },
    {
        question: "What is the currency of India?",
        answers: [
            { text: "Dollar", correct: false },
            { text: "Euro", correct: false },
            { text: "Yen", correct: false },
            { text: "Rupee", correct: true },
        ],
        difficulty: 30
    },
    {
        question: "Who is the founder of Microsoft?",
        answers: [
            { text: "Steve Jobs", correct: false },
            { text: "Bill Gates", correct: true },
            { text: "Mark Zuckerberg", correct: false },
            { text: "Jeff Bezos", correct: false },
        ],
        difficulty: 45
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
        ],
        difficulty: 45
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "90°C", correct: false },
            { text: "100°C", correct: true },
            { text: "110°C", correct: false },
            { text: "120°C", correct: false },
        ],
        difficulty: 60
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const progressBar = document.querySelector(".progress-bar");
const resultModal = document.getElementById("result-modal");
const scoreElement = document.getElementById("score");
const starRatingElement = document.getElementById("star-rating");
const leaderboardList = document.getElementById("leaderboard-list");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer(currentQuestion.difficulty);
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer(seconds) {
    timeLeft = seconds;
    timerElement.textContent = `${timeLeft}s`;
    progressBar.style.transform = 'scaleX(1)';
    progressBar.style.transition = `transform ${seconds}s linear`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer();
        }
    }, 1000);

    setTimeout(() => {
        progressBar.style.transform = 'scaleX(0)';
    }, 50);
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e ? e.target : null;
    const isCorrect = selectedBtn && selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        score++;
        if (selectedBtn) selectedBtn.classList.add("correct");
    } else {
        if (selectedBtn) selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.classList.remove("hide");
}

function showScore() {
    resetState();
    scoreElement.textContent = score;
    const percentage = (score / questions.length) * 100;
    let stars = '';
    if (percentage >= 80) stars = '⭐⭐⭐⭐⭐';
    else if (percentage >= 60) stars = '⭐⭐⭐⭐';
    else if (percentage >= 40) stars = '⭐⭐⭐';
    else if (percentage >= 20) stars = '⭐⭐';
    else stars = '⭐';
    starRatingElement.innerHTML = stars;

    updateLeaderboard(score);
    resultModal.classList.add("show");
}

function updateLeaderboard(newScore) {
    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push(newScore);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem("quizScores", JSON.stringify(scores));

    leaderboardList.innerHTML = "";
    scores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        leaderboardList.appendChild(li);
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener("click", () => {
    resultModal.classList.remove("show");
    startQuiz();
});

startQuiz();

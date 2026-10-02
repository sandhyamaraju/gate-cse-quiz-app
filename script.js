// ===============================
// QUIZ VARIABLES
// ===============================

let currentQuestion = 0;
let score = 0;
let answered = false;
let timeLeft = 30;
let timer;


// ===============================
// QUESTIONS
// ===============================

const questions = [
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue"
    },

    {
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Graph", "Heap"],
        answer: "Stack"
    },

    {
        question: "What is the time complexity of Binary Search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: "O(log n)"
    },

    {
        question: "Which of these is an operating system?",
        options: ["MySQL", "Linux", "HTML", "Python"],
        answer: "Linux"
    },

    {
        question: "Which SQL command is used to retrieve data?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        answer: "SELECT"
    },

    {
        question: "Which data structure is used in BFS?",
        options: ["Stack", "Queue", "Heap", "Array"],
        answer: "Queue"
    },

    {
        question: "Which sorting algorithm has O(n log n) average time complexity?",
        options: ["Bubble Sort", "Merge Sort", "Linear Search", "Selection Sort"],
        answer: "Merge Sort"
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing User"
        ],
        answer: "Central Processing Unit"
    },

    {
        question: "Which language is used to structure web pages?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: "HTML"
    },

    {
        question: "Which memory is volatile?",
        options: ["ROM", "Hard Disk", "RAM", "SSD"],
        answer: "RAM"
    }
];


// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    clearInterval(timer);

    answered = false;
    timeLeft = 30;

    const current = questions[currentQuestion];

    // Question number
    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    // Question
    document.getElementById("question").textContent =
        current.question;

    // Timer
    document.getElementById("timer").textContent =
        "⏱️ " + timeLeft;

    // Progress bar
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";

    // Options
    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach(function(button, index) {

        button.textContent = current.options[index];

        button.disabled = false;

        button.classList.remove("correct");
        button.classList.remove("wrong");

        button.onclick = function() {
            submitAnswer(button);
        };

    });

    startTimer();
}


// ===============================
// TIMER
// ===============================

function startTimer() {

    timer = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").textContent =
            "⏱️ " + timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            if (!answered) {

                answered = true;

                const buttons =
                    document.querySelectorAll(".option-btn");

                buttons.forEach(function(button) {
                    button.disabled = true;
                });

                alert("⏰ Time's Up!");

                goToNextQuestion();
            }
        }

    }, 1000);
}


// ===============================
// SUBMIT ANSWER
// ===============================

function submitAnswer(button) {

    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timer);

    const selectedAnswer = button.textContent;

    const correctAnswer =
        questions[currentQuestion].answer;

    const buttons =
        document.querySelectorAll(".option-btn");


    // Correct answer
    if (selectedAnswer === correctAnswer) {

        score++;

        button.classList.add("correct");

    }

    // Wrong answer
    else {

        button.classList.add("wrong");

        buttons.forEach(function(btn) {

            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }

        });

    }


    // Update score
    document.getElementById("score").textContent =
        "Score: " + score;


    // Disable buttons
    buttons.forEach(function(btn) {
        btn.disabled = true;
    });
}


// ===============================
// NEXT BUTTON
// ===============================

document.getElementById("next-btn").onclick = function() {

    if (!answered) {

        alert("Please select an answer first!");

        return;
    }

    goToNextQuestion();
};


// ===============================
// NEXT QUESTION
// ===============================

function goToNextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
}


// ===============================
// RESULT
// ===============================

function showResult() {

    clearInterval(timer);

    const container =
        document.querySelector(".quiz-container");

    container.innerHTML = `
        <div class="header">
            <h1>🎉 Quiz Completed!</h1>

            <p>Great job on completing the quiz!</p>
        </div>

        <h2>
            Your Score: ${score}/${questions.length}
        </h2>

        <p style="margin: 20px 0;">
            Keep practicing for GATE CSE 🚀
        </p>

        <button id="restart-btn">
            🔄 Restart Quiz
        </button>
    `;

    document.getElementById("restart-btn").onclick = function() {
        location.reload();
    };
}


// ===============================
// START QUIZ
// ===============================

loadQuestion();
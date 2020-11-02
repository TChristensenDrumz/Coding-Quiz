// Variables before quiz starts
var header = document.querySelector("#header");
var rules = document.querySelector("#rules");
var startQuiz = document.querySelector("#start-quiz");

// Variable for countdown timer
var timer = document.querySelector("#timer");
var timerCountdown = 75;

// Variables during quiz
var question = document.querySelector("#question");
var answerOne = document.querySelector("#answer-one");
var answerTwo = document.querySelector("#answer-two");
var answerThree = document.querySelector("#answer-three");
var answerFour = document.querySelector("#answer-four");

// Event that starts the quiz
startQuiz.addEventListener("click", function(){
    header.classList.add("hide");
    rules.classList.add("hide");
    startQuiz.classList.add("hide");
});

// Function for timer countdown
function countdown(){
    timerCountdown = 75;
    var countdown = setInterval(function(){
        timer.textContent = "Time: " + timerCountdown;
        timerCountdown--;

        if(timerCountdown === 0){
            clearInterval(countdown);
            timer.textContent = "Time: 0";
            return 0;
        }
    }, 1000);
}

// Array that holds each question
var questions = [questionOne(), questionTwo()];

// Quiz questions
function questionOne() {
    question.textContent = "Commonly used data types DO NOT include";
    answerOne.textContent = "strings";
    answerTwo.textContent = "booleans";
    answerThree.textContent = "alerts";
    answerFour.textContent = "numbers";
}

function questionTwo() {
    question.textContent = "The condition in an if/else statement is enclosed within _________";
    answerOne.textContent = "quotes";
    answerTwo.textContent = "curly brackets";
    answerThree.textContent = "parenthesis";
    answerFour.textContent = "square brackets";
}

// Runs the quiz
function quizRunner(){
    question.classList.remove("hide");
    answerOne.classList.remove("hide");
    answerTwo.classList.remove("hide");
    answerThree.classList.remove("hide");
    answerFour.classList.remove("hide");
}

// Resets the page to retake the quiz
function reset() {
    header.classList.remove("hide");
    rules.classList.remove("hide");
    startQuiz.classList.remove("hide");

    question.classList.add("hide");
    answerOne.classList.add("hide");
    answerTwo.classList.add("hide");
    answerThree.classList.add("hide");
    answerFour.classList.add("hide");
}


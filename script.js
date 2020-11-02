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

function countdown(){
    timerCountdown = 75;
    var countdown = setInterval(function(){
        timer.textContent = "Time: " + timerCountdown;
        timerCountdown--;

        if(timerCountdown === 0){
            clearInterval(countdown);
            timer.textContent = "Time: 0";
        }
    }, 1000);
}
// Variables before quiz starts
var container = document.querySelector(".container");
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
var choices = document.querySelectorAll("button");
var score = 0;
var userInput = false;

// Event that starts the quiz
startQuiz.addEventListener("click", function(event){
    event.stopPropagation();
    header.classList.add("hide");
    rules.classList.add("hide");
    startQuiz.classList.add("hide");

    countdown();
    quizRunner();
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
        }
    }, 1000);
}

// Array that holds each question
var questions = [
    {
        question: "Commonly used data types DO NOT include",
        choiceA: "strings",
        choiceB: "booleans",
        choiceC: "alerts",
        choiceD: "numbers",
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _________",
        choiceA: "quotes",
        choiceB: "curly brackets",
        choiceC: "parenthesis",
        choiceD: "square brackets",
        answer: "parenthesis"
    }
];

// Runs the quiz
function quizRunner(){
    question.classList.remove("hide");
    answerOne.classList.remove("hide");
    answerTwo.classList.remove("hide");
    answerThree.classList.remove("hide");
    answerFour.classList.remove("hide");

    score = 0;

    getQuestion();
}

var questionsIndex = 0;

// Grabs question from the array
function getQuestion(){
    if(questions.length === 0){
        localStorage.setItem("score", score);
    }
    else{
        questionsIndex = Math.floor(Math.random() * questions.length);
        var currentQuestion = questions[questionsIndex];
        question.textContent = currentQuestion.question;
        answerOne.textContent = currentQuestion.choiceA;
        answerTwo.textContent = currentQuestion.choiceB;
        answerThree.textContent = currentQuestion.choiceC;
        answerFour.textContent = currentQuestion.choiceD;

        // questions.splice(questionsIndex, 1);
        userInput = true;
    }
}

for(var i = 1; i < choices.length; i++){
    choices[i].addEventListener("click", function(event){
        if(!userInput){
            return;
        }

        userInput = false;
        var userChoice = event.target.textContent;
        console.log(userChoice);
        console.log(questions[questionsIndex].answer);
        console.log(questionsIndex);
        if(userChoice === questions[questionsIndex].answer){
            score++;
            questions.splice(questionsIndex, 1);
        }
        else{
            timerCountdown -= 10;
            questions.splice(questionsIndex, 1);
        }


    })
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


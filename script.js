// Variables before quiz starts
var view = document.querySelector("#highscore");
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
var choices = container.querySelectorAll("button");
var hr = document.querySelector("#hr");
var popUp = document.querySelector("#popup");
var score = 0;
var userInput = false;

// Variables for highscore
var form = document.querySelector("#form");
var highscoreInitials = document.querySelector("#highscore-initials");
var submitScore = document.querySelector("#submit-score");
var scoreBoard = [];

// Variables for highscore viewer
var viewer = document.querySelector("#viewer");
var scoreSheet = document.querySelector("#highscore-sheet");
var goBack = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear");

init();

console.log(window);
console.log(scoreSheet);
console.log(goBack);
console.log(clearScores);

// Event that initializes site
function init(){
    reset();
    renderHighscores();
}

// Event that starts the quiz
startQuiz.addEventListener("click", function(event){
    event.stopPropagation();
    header.classList.add("hide");
    rules.classList.add("hide");
    startQuiz.classList.add("hide");

    countdown();
    quizRunner();
});

// Event to view highscores
view.addEventListener("click", viewHighscores);

// Event to go back to quiz
goBack.addEventListener("click", reset);

// Event to clear highscores
clearScores.addEventListener("click", clearHighscores);

// Function for timer countdown
function countdown(){
    timerCountdown = 75;
    var countdown = setInterval(function(){
        timer.textContent = "Time: " + timerCountdown;
        timerCountdown--;

        if(timerCountdown <= 0){
            clearInterval(countdown);
            timer.textContent = "Time: 0";
        }
    }, 1000);
}

// Array that holds each question
var questions = [];

// Initializes questions array with it's objects
function initializeQuestions(){
    questions = [
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
        },
        {
            question: "Arrays in JavaScript can be used to store _________",
            choiceA: "numbers and strings",
            choiceB: "other arrays",
            choiceC: "booleans",
            choiceD: "all of the above",
            answer: "all of the above"
        },
        {
            question: "String values must be enclosed in _________ when being assigned to variables",
            choiceA: "quotes",
            choiceB: "commas",
            choiceC: "curly brackets",
            choiceD: "parentheses",
            answer: "quotes"
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is",
            choiceA: "terminal/bash",
            choiceB: "console.log",
            choiceC: "for loops",
            choiceD: "JavaScript",
            answer: "console.log"
        }
    ];
}

// Runs the quiz
function quizRunner(){
    question.classList.remove("hide");
    answerOne.classList.remove("hide");
    answerTwo.classList.remove("hide");
    answerThree.classList.remove("hide");
    answerFour.classList.remove("hide");

    score = 0;
    initializeQuestions();

    getQuestion();
}

var questionsIndex = 0;

// Displays correct
function correct(){
    popUp.textContent = "Correct";

    setTimeout(function(){
        hr.classList.remove("hide");
        popUp.classList.remove("hide"); 
    }, 0);

    setTimeout(function(){
        hr.classList.add("hide");
        popUp.classList.add("hide"); 
    }, 500);
}

// Displays incorrect
function incorrect(){
    popUp.textContent = "Incorrect";

    setTimeout(function(){
        hr.classList.remove("hide");
        popUp.classList.remove("hide"); 
    }, 0);

    setTimeout(function(){
        hr.classList.add("hide");
        popUp.classList.add("hide"); 
    }, 500);
}

// Grabs question from the array
function getQuestion(){
    if(questions.length === 0 || timerCountdown <= 0){
        timerCountdown = 0;
        getHighscore();
        renderHighscores();
    }
    else{
        questionsIndex = Math.floor(Math.random() * questions.length);
        var currentQuestion = questions[questionsIndex];
        question.textContent = currentQuestion.question;
        answerOne.textContent = currentQuestion.choiceA;
        answerTwo.textContent = currentQuestion.choiceB;
        answerThree.textContent = currentQuestion.choiceC;
        answerFour.textContent = currentQuestion.choiceD;

        userInput = true;
    }
}

// Allows for user answer input
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
            console.log("Score:" + score);
            questions.splice(questionsIndex, 1);
            correct();
            getQuestion();
        }
        else{
            timerCountdown -= 10;
            questions.splice(questionsIndex, 1);
            incorrect();
            getQuestion();
        }
    })
}

// Shows highscore elements
function getHighscore(){
    question.classList.add("hide");
    answerOne.classList.add("hide");
    answerTwo.classList.add("hide");
    answerThree.classList.add("hide");
    answerFour.classList.add("hide");

    form.classList.remove("hide");
}

// Shows highscore viewer
function viewHighscores() {
    view.classList.add("hide");
    
    question.classList.add("hide");
    answerOne.classList.add("hide");
    answerTwo.classList.add("hide");
    answerThree.classList.add("hide");
    answerFour.classList.add("hide");

    header.classList.add("hide");
    rules.classList.add("hide");
    startQuiz.classList.add("hide");

    form.classList.add("hide");

    viewer.classList.remove("hide");
}

// Clears highscores
function clearHighscores(){
    for(var i = 0; i < scoreBoard.length; i++){
        scoreBoard.splice(i, 1);
        i--;
    }
    localStorage.setItem("score", JSON.stringify(scoreBoard));
    renderHighscores();
}

// Submits highscore to local storage and scoreboard
var initials = "";
submitScore.addEventListener("click", function(event){
    event.preventDefault();
    initials = highscoreInitials.value;
    scoreBoard.push({
        userInitials: initials,
        userScore: score
    });
    console.log(scoreBoard);
    localStorage.setItem("score", JSON.stringify(scoreBoard));
    renderHighscores();
    viewHighscores();
});

// Resets the page to retake the quiz
function reset() {
    view.classList.remove("hide");
    header.classList.remove("hide");
    rules.classList.remove("hide");
    startQuiz.classList.remove("hide");
    
    hr.classList.add("hide");
    popUp.classList.add("hide");

    form.classList.add("hide");

    viewer.classList.add("hide");
}

// Renders highscores on the highscore page
function renderHighscores(){
    scoreSheet.innerHTML = "";
    scoreBoard = JSON.parse(localStorage.getItem("score"));
    sort();
    for(var i = 0; i < scoreBoard.length; i++){
        var listItem = document.createElement("li");
        listItem.textContent = scoreBoard[i].userInitials + " - " + scoreBoard[i].userScore;
        scoreSheet.appendChild(listItem); 
    }
}

// Sorts scoreBoard array
function sort(){
    var temp;
    for (var i = 1; i < scoreBoard.length; i++) {
        for (var j = i; j > 0; j--) {
            if (scoreBoard[j].userScore > scoreBoard [j - 1].userScore) {
                temp = scoreBoard[j];
                scoreBoard[j] = scoreBoard[j - 1];
                scoreBoard[j - 1] = temp;
            }
        }
    }
}


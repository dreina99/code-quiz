var startButtonEl = document.querySelector("#start-button");
var startScreen = document.querySelector("#start-screen");
var questionsDivEl = document.querySelector("#questions");
var questionHeader = document.querySelector("#question-title");
var answersList = document.querySelector("#choices");
var displayCorrectEl = document.querySelector("#display-correct")
var timerEl = document.querySelector("#timer");
var timeNumberEl = document.querySelector("#time-number");
var endDivEl = document.querySelector("#end-screen");
var highScoresDiv = document.querySelector("#high-scores");
var scoresButton = document.querySelector("#scores-button");
let score = 0;

var name_score = {
    name : "",
    score : 0
};
var names_scores = [];

const Q1 = {
    questionTitle : "Commonly used datatypes do NOT include:", 
    a1 : {answer : "1. strings", right : false},
    a2 : {answer : "2. booleans", right : false},
    a3 : {answer : "3. alerts", right : true},
    a4 : {answer : "4. numbers", right : false}
};
const Q2 = {
    questionTitle : "The condition in an if/else statement is enclosed in:",
    a1 : {answer : "1. quotes", right : false},
    a2 : {answer : "2. parentheses", right: false},
    a3 : {answer : "3. curly brackets", right : true},
    a4 : {answer : "4. square brackets", right : false}
};
const Q3 = {
    questionTitle : "Arrays in JavaScript can be used to store ___________?",
    a1 : {answer : "1. numbers and strings", right : false},
    a2 : {answer : "2. other arrays", right : false},
    a3 : {answer : "3. booleans", right : false},
    a4 : {answer : "4. all of the above", right : true}
};

const Q4 = {
    questionTitle : "String values must be enclosed in __________ when being assigned to variables.",
    a1 : {answer : "1. commas", right : false},
    a2 : {answer : "2. curly brackets", right : false},
    a3 : {answer : "3. quotes", right : true},
    a4 : {answer : "4. parentheses", right : false}
};

const Q5 = {
    questionTitle : "A useful tool during development for printing content to the debugger is:",
    a1 : {answer : "1. JavaScript", right : false},
    a2 : {answer : "2. terminal/bash", right : false},
    a3 : {answer : "3. for loops", right : false},
    a4 : {answer : "4. console.log", right : true}
};

const questions = [Q1, Q2, Q3, Q4, Q5];
let currentIndex;
let time = 60;
let viewHighScoresClicked = false;

function initQuiz() {
    var startContent = document.querySelector("#start-screen");
    startContent.classList.add("hide");
    var setTimer = setInterval(function () {
        timeNumberEl.innerHTML = time;
        time--;
        if(currentIndex == questions.length)
        {   
            // time++ used to balance out of sync timer since it takes a second to switch pages
            time++;
            clearInterval(setTimer);
            endQuiz();
        }
        else if(time <= 0)
        {
            clearInterval(setTimer);
            endQuiz();
        }
        else if(viewHighScoresClicked === true)
        {
            clearInterval(setTimer);
        }
    }, 1000);
    currentIndex = 0;
    questionsDivEl.classList.remove("hide");   
    showQuestion(questions[currentIndex]);   
}

function showQuestion(question) {
    questionHeader.innerHTML = question.questionTitle;

    var button1 = document.querySelector("#btn1");
    button1.innerHTML = question.a1.answer;
    button1.setAttribute("isCorrect", question.a1.right);

    var button2 = document.querySelector("#btn2");
    button2.innerHTML = question.a2.answer;
    button2.setAttribute("isCorrect", question.a2.right);

    var button3 = document.querySelector("#btn3");
    button3.innerHTML = question.a3.answer;
    button3.setAttribute("isCorrect", question.a3.right);

    var button4 = document.querySelector("#btn4");
    button4.innerHTML = question.a4.answer;
    button4.setAttribute("isCorrect", question.a4.right);

    answersList.addEventListener("click", showAnswer)
}

function showAnswer(event)
{
    var eventEl = event;
    var isCorrectEl = event.target.getAttribute("isCorrect");
    if(isCorrectEl == "false")
    {
        event.target.classList.add("btn-red");
    }
    else if(isCorrectEl === "true")
    {
        event.target.classList.add("btn-green");
        score++;
    }
    setTimeout(function(){displayNext(eventEl)}, 1000);
}

function displayNext(event)
{ 
    console.log(event.target.textContent);
    console.log(event.target.getAttribute("isCorrect"));
    var isCorrectEl = event.target.getAttribute("isCorrect");
    if(isCorrectEl === "false")
    {
        time -= 10;
        event.target.classList.remove("btn-red");
    }
    else if(isCorrectEl === "true")
    {
        event.target.classList.remove("btn-green");
    }
    currentIndex++;
    if(currentIndex !== questions.length)
    {
        showQuestion(questions[currentIndex]);
    }    
}

function endQuiz() {
    questionsDivEl.classList.add("hide");
    //timerEl.classList.add("hide");

    var scoreEl = document.querySelector("#score");
    scoreEl.innerHTML = score;
    var timeRemEl = document.querySelector("#time-left")
    timeRemEl.innerHTML = time;

    score = score * 10 + time;

    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.innerHTML = score;
    endDivEl.classList.remove("hide");

    submitButtonEl = document.querySelector("#score-submit");
    submitButtonEl.addEventListener("click", showScores);
}

var showScores = function(event) {
    event.preventDefault();

    initials = document.querySelector("#initials").value;
    
    endDivEl.classList.add("hide");
    highScoresDiv.classList.remove("hide")

    var scoresList = document.querySelector("#high-scores-list")
    var listItemEl = document.createElement("li");
    listItemEl.innerHTML = initials + " " + score;
    scoresList.appendChild(listItemEl);

    name_score.name = initials;
    name_score.score = score;
    names_scores.push(name_score);

    localStorage.setItem("name_scores", JSON.stringify(names_scores));

    goBackButton = document.querySelector("#go-back");
    goBackButton.addEventListener("click", function() {
        highScoresDiv.classList.add("hide");
        startScreen.classList.remove("hide");
        time = 60;
        score = 0;
        timeNumberEl.innerHTML = time;
        timerEl.classList.remove("hide");
        scoresButton.classList.remove("hide");
    });
}

scoresButton.addEventListener("click", function() {
    startScreen.classList.add("hide");
    questionsDivEl.classList.add("hide");
    endDivEl.classList.add("hide");
    timerEl.classList.add("hide");
    scoresButton.classList.add("hide");
    highScoresDiv.classList.remove("hide");    

    viewHighScoresClicked = true;

    goBackButton = document.querySelector("#go-back");
    goBackButton.addEventListener("click", function() {
        highScoresDiv.classList.add("hide");
        startScreen.classList.remove("hide");
        time = 60;
        score = 0;
        timeNumberEl.innerHTML = time;
        timerEl.classList.remove("hide");
        scoresButton.classList.remove("hide");
    });

});

startButtonEl.addEventListener("click", function() {
    initQuiz();
});
var startButtonEl = document.querySelector("#start-button");
var questionsDivEl = document.querySelector("#questions");
var questionHeader = document.querySelector("#question-title");
var answersList = document.querySelector("#choices");
var timerEl = document.querySelector("#timer");
var timeNumberEl = document.querySelector("#time-number");
var endDivEl = document.querySelector("#end-screen");

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

const questions = [Q1, Q2, Q3];
let currentIndex;
let time = 60;

var initQuiz = function() {
    console.log("clicked");
    var startContent = document.querySelector("#start-screen");
    startContent.classList.add("hide");
    //console.log(timeNumberEl.textContent);
    setTimer;
    currentIndex = 0;
    questionsDivEl.classList.remove("hide");   
    timerEl.classList.remove("hide");
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

    answersList.addEventListener("click", displayNext)
}

function displayNext(event)
{
    console.log(event.target.textContent);
    console.log(event.target.getAttribute("isCorrect"));
    var isCorrectEl = event.target.getAttribute("isCorrect");
    if(isCorrectEl === "false")
    {
        time -= 10;
        setTimer;
    }
    currentIndex++;
    if(currentIndex !== questions.length)
    {
        showQuestion(questions[currentIndex]);
    }
    else
    {
        console.log("done");
    }   
}

var setTimer = setInterval(function () {
    timeNumberEl.innerHTML = time;
    time--;
    if(time <= 0)
    {
        clearInterval(setTimer);
        questionsDivEl.classList.add("hide");
        endDivEl.classList.remove("hide");
        timerEl.classList.add("hide");
    }
}, 1000);

startButtonEl.addEventListener("click", initQuiz);
var startButtonEl = document.querySelector("#start-button");
var questionsDivEl = document.querySelector("#questions");
var questionHeader = document.querySelector("#question-title");
var answersList = document.querySelector("#choices");
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

var initQuiz = function() {
    console.log("clicked");
    var startContent = document.querySelector("#start-screen");
    startContent.classList.add("hide");
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

    answersList.addEventListener("click", displayCorrectness)
}

function displayCorrectness(event)
{
    console.log(event.target.textContent);
    console.log(event.target.getAttribute("isCorrect"));
    currentIndex++;
    showQuestion(questions[currentIndex]);
}

startButtonEl.addEventListener("click", initQuiz);



/*
var displayQuestion = function(question)
{
    var questionHeader = document.querySelector("#question-title");
    questionHeader.textContent = question.questionTitle;

    var answersDivEl = document.querySelector("#choices");
    var answersList = document.createElement("ul");
    answersDivEl.appendChild(answersList);

    // create first answer choice for question 1 
    var listItemEl = document.createElement("li");
    listItemEl.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl);
    // create and append button for first choice
    var a1Button = document.createElement("button");
    a1Button.textContent = question.a1.answer;
    a1Button.setAttribute("isRight", question.a1.right);
    listItemEl.appendChild(a1Button);

    // create second answer choice for question 1
    var listItemEl2 = document.createElement("li");
    listItemEl2.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl2);
    // create and append button for first choice
    var a2Button = document.createElement("button");
    a2Button.textContent = question.a2.answer;
    a2Button.setAttribute("isRight", question.a2.right);
    listItemEl2.appendChild(a2Button);

    // create third answer choice for question 1
    var listItemEl3 = document.createElement("li");
    listItemEl3.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl3);
    // create and append button for third choice
    var a3Button = document.createElement("button");
    a3Button.textContent = question.a3.answer;
    a3Button.setAttribute("isRight", question.a3.right);
    listItemEl3.appendChild(a3Button);

    // create fourth answer choice for question 1
    var listItemEl4 = document.createElement("li");
    listItemEl4.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl4);
    // create and append button for third choice
    var a4Button = document.createElement("button");
    a4Button.textContent = question.a4.answer;
    a4Button.setAttribute("isRight", question.a4.right);
    listItemEl4.appendChild(a4Button);

    answersList.addEventListener("click",function(event) {
        console.log(event.target.textContent);
        console.log(event.target);
        console.log(event.target.getAttribute("isRight"));   
    });

    return answersList;
} */
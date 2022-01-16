var startButtonEl = document.querySelector("#start-button");
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

var questions = [Q1, Q2, Q3];

var initQuiz = function() {
    console.log("clicked");
    var startContent = document.querySelector("#start-screen");
    startContent.remove();

    var questionHeader = document.querySelector("#question-title");
    questionHeader.textContent = questions[0].questionTitle;

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
    a1Button.textContent = questions[0].a1.answer;
    listItemEl.appendChild(a1Button);

    // create second answer choice for question 1
    var listItemEl2 = document.createElement("li");
    listItemEl2.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl2);
    // create and append button for first choice
    var a2Button = document.createElement("button");
    a2Button.textContent = questions[0].a2.answer;
    listItemEl2.appendChild(a2Button);

    // create third answer choice for question 1
    var listItemEl3 = document.createElement("li");
    listItemEl3.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl3);
    // create and append button for third choice
    var a3Button = document.createElement("button");
    a3Button.textContent = questions[0].a3.answer;
    listItemEl3.appendChild(a3Button);

    // create fourth answer choice for question 1
    var listItemEl4 = document.createElement("li");
    listItemEl4.className = "noBullet";
    // append to list of answers
    answersList.appendChild(listItemEl4);
    // create and append button for third choice
    var a4Button = document.createElement("button");
    a4Button.textContent = questions[0].a4.answer;
    listItemEl4.appendChild(a4Button);

    answersList.addEventListener("click",function(event) {
        console.log(event.target.textContent);
    });
    
}

startButtonEl.addEventListener("click", initQuiz);
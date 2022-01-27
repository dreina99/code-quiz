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

var user_info = {
    name : "",
    score : 0
};
// array of user names and scores
var name_scores = [];

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
    // remove start screen
    viewHighScoresClicked = false;
    var startContent = document.querySelector("#start-screen");
    startContent.classList.add("hide");
    // timer countdown
    var setTimer = setInterval(function () {
        timeNumberEl.innerHTML = time;
        time--;
        // if at end of questions array, stop timer and call endQuiz
        if(currentIndex == questions.length)
        {   
            // time++ used to balance out of sync timer since it takes a second to switch pages
            time++;
            clearInterval(setTimer);
            endQuiz();
        }
        // if user runs out of time, stop timer and call endQuiz
        else if(time <= 0)
        {
            clearInterval(setTimer);
            endQuiz();
        }
        // if the user clicks the view high scores button, stop the timer
        else if(viewHighScoresClicked === true)
        {
            clearInterval(setTimer);
        }
    }, 1000);
    currentIndex = 0;
    questionsDivEl.classList.remove("hide"); 
    // load first question  
    showQuestion(questions[currentIndex]);   
}

function showQuestion(question) {
    // set question title
    questionHeader.innerHTML = question.questionTitle;

    // create button for each answer option
    var button1 = document.querySelector("#btn1");
    button1.innerHTML = question.a1.answer;
    button1.setAttribute("isCorrect", question.a1.right);
    button1.classList.remove("btn-red", "btn-green");

    var button2 = document.querySelector("#btn2");
    button2.innerHTML = question.a2.answer;
    button2.setAttribute("isCorrect", question.a2.right);
    button2.classList.remove("btn-red", "btn-green");

    var button3 = document.querySelector("#btn3");
    button3.innerHTML = question.a3.answer;
    button3.setAttribute("isCorrect", question.a3.right);
    button3.classList.remove("btn-red", "btn-green");

    var button4 = document.querySelector("#btn4");
    button4.innerHTML = question.a4.answer;
    button4.setAttribute("isCorrect", question.a4.right);
    button4.classList.remove("btn-red", "btn-green");

    // add an event listener on the list of buttons
    answersList.addEventListener("click", showAnswer)
}

function showAnswer(event)
{
    var eventEl = event;
    // find out if button user clicked was the right answer
    var isCorrectEl = event.target.getAttribute("isCorrect");
    // if wrong set button color to red, if correct set color to green
    if(isCorrectEl == "false")
    {
        event.target.classList.add("btn-red");
    }
    else if(isCorrectEl === "true")
    {
        event.target.classList.add("btn-green");
        score++;
    }
    // call displayNext function after 1 second
    setTimeout(function(){displayNext(eventEl)}, 500);
}

function displayNext(event)
{ 
    // find out if button user clicked was the right answer
    var isCorrectEl = event.target.getAttribute("isCorrect");
    // if wrong, subtract time from clock and remove red color
    if(isCorrectEl === "false")
    {
        time -= 10;
        event.target.classList.remove("btn-red");
    }
    // if true, remove green color
    else if(isCorrectEl === "true")
    {
        event.target.classList.remove("btn-green");
    }
    // increment to the next question
    currentIndex++;
    // if you are not at the end of questions list, display next question
    if(currentIndex !== questions.length)
    {
        showQuestion(questions[currentIndex]);
    }    
}

function endQuiz() {
    questionsDivEl.classList.add("hide");
    //timerEl.classList.add("hide");

    // set display message score and time to user's score and remaining time
    var scoreEl = document.querySelector("#score");
    scoreEl.innerHTML = score;
    var timeRemEl = document.querySelector("#time-left")
    timeRemEl.innerHTML = time;

    // calculate final score
    score = score * 10 + time;

    // displat final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.innerHTML = score;
    // show ending screen
    endDivEl.classList.remove("hide");

    // on submite button click, show high scores page
    submitButtonEl = document.querySelector("#score-submit");
    submitButtonEl.addEventListener("click", showScores);
}

// get saved scores from local storage and put into name_scores array
function loadScores() {
    var saved_scores = localStorage.getItem("name_scores");
    if(saved_scores === null)
    {
        return false;
    }
    name_scores = JSON.parse(saved_scores);
}

// push user data into name_scores and sort
function getUserData() {
    // get  initials from end form
    var initials = document.querySelector("#initials").value;

    // set current players info in user info
    user_info.name = initials;
    user_info.score = score;
   
    // push new user into name_scores array
    name_scores.push(user_info);
    // sort name_scores array in descending order based on score
    name_scores.sort((a, b) => (a.score <= b.score) ? 1 : -1);  
}

// save sorted name_scores in local storage
function saveScores() {
    localStorage.setItem("name_scores", JSON.stringify(name_scores));
}

// display name_scores array on high scores page
function displayScores() {
    var scoresList = document.querySelector("#high-scores-list");
    for(var i = 0; i < name_scores.length; i++)
    {
        var listItemEl = document.createElement("li");
        listItemEl.classList.add("scores-li");
        listItemEl.innerHTML = name_scores[i].name + " - " + name_scores[i].score;
        scoresList.appendChild(listItemEl);
    }

    endDivEl.classList.add("hide");
    highScoresDiv.classList.remove("hide");
}

// remove name_scores array from high scores page
function removeScores() {
    var scoresList = document.querySelector("#high-scores-list");
    scoresList.innerHTML = "";
}

// clear local storage and remove scores from high scores page
function clearScores() {
    name_scores = [];
    localStorage.clear();
    removeScores();
}

var showScores = function(event) {
    event.preventDefault();

    loadScores();
    getUserData();
    saveScores();
    displayScores();

    timerEl.classList.add("hide");
    scoresButton.classList.add("hide");

    var form = document.querySelector("#submit-form");
    form.reset();

    // back button to restart quiz
    goBackButton = document.querySelector("#go-back");
    goBackButton.addEventListener("click", function() {
        highScoresDiv.classList.add("hide");
        startScreen.classList.remove("hide");
        time = 60;
        score = 0;
        timeNumberEl.innerHTML = time;
        timerEl.classList.remove("hide");
        scoresButton.classList.remove("hide");
        // call remove scores so the page will not have duplicate scores with every load
        removeScores();
    });

    // clear button to clear scores
    clearButton = document.querySelector("#clear-scores");
    clearButton.addEventListener("click", function() {
        clearScores();
    });
}

// display high scores page when user clicks view high scores button
scoresButton.addEventListener("click", function() {
    // remove any content from page
    startScreen.classList.add("hide");
    questionsDivEl.classList.add("hide");
    endDivEl.classList.add("hide");
    timerEl.classList.add("hide");
    scoresButton.classList.add("hide");
    // show high scores page
    highScoresDiv.classList.remove("hide");  
    
    // get data from storage and display
    loadScores();
    displayScores();
    // stop timer
    viewHighScoresClicked = true;

    // go back to home page
    goBackButton = document.querySelector("#go-back");
    goBackButton.addEventListener("click", function() {
        highScoresDiv.classList.add("hide");
        startScreen.classList.remove("hide");
        time = 60;
        score = 0;
        timeNumberEl.innerHTML = time;
        timerEl.classList.remove("hide");
        scoresButton.classList.remove("hide");
        // call remove scores so the page will not have duplicate scores with every load
        removeScores();
    });

    // clear button to clear scores
    clearButton = document.querySelector("#clear-scores");
    clearButton.addEventListener("click", function() {
        clearScores();
    });
});

// start quiz
startButtonEl.addEventListener("click", function() {
    initQuiz();
});
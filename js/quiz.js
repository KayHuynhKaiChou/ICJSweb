var title = document.querySelector('.title');
var testTime = document.querySelector('.time');
var numberQue = document.querySelector('.number-que');

var listQues = document.querySelector('.list-question');
var ques = listQues.querySelector('.info-question');

var choiceMenu = document.querySelector('.choice-menu');

var url = location.href;
var quizID = (url.split('=')[1])[4];

var accountApi = 'http://localhost:3000/accounts';
var quesApi = '/data/quiz.json';
var userProfile = JSON.parse(sessionStorage.getItem('accountSS'));

console.log(userProfile);
console.log(quizID);

function start() {
    getData(renderQues)
}

start();

function getData(callBack) {
    fetch(quesApi)
        .then(resp => resp.json())
        .then(callBack)
}

function renderQues(data) {
    var list = data[quizID].content;
    setNoitice(data[quizID].title, list.length);
    list.forEach((element, index) => {
        getQues(index + 1, element);
        getMenu(index + 1);
    });
    listQues.removeChild(ques)
    choiceMenu.removeChild(choiceMenu.firstElementChild);
}

function handleWrongQues(data, callBack) {
    var options = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(accountApi, options)
        .then(resp => resp.json())
        .then(callBack)
}

function getQues(index, data) {
    var newQue = ques.cloneNode(true);
    var quesContent = newQue.querySelector('.question');
    var quesNumber = quesContent.querySelector('.que-number');
    var quesTitle = quesContent.querySelector('.que-title');

    quesContent.id = 'question-' + index;
    quesNumber.innerHTML = '第' + index;
    quesTitle.innerHTML = data.question;

    getAns(data, newQue, index);
    listQues.append(newQue);
}

var listRightQues = [];
function getAns(ansData, quesContain, index) {
    var ansContain = quesContain.querySelector('.answer');
    var ansBtn = ansContain.querySelector('.button');
    var ansContent = ansBtn.querySelector('label');
    var ansValue = ansBtn.querySelector('input');

    ansData.answer.forEach((element) => {
        ansContent.innerHTML = element;
        ansValue.name = 'question' + index;
        ansValue.value = element;
        var generateBtn = ansBtn.cloneNode(true);
        if (element == ansData.key) {
            listRightQues.push(generateBtn.querySelector('label'))
        }
        generateBtn.onclick = () => changeMenuItem(generateBtn.parentElement);
        ansContain.appendChild(generateBtn);
    });
    ansContain.removeChild(ansBtn);
}

function changeMenuItem(element) {
    var id = element.parentElement.firstElementChild.id
    var a = document.querySelector("a[href='#" + id + "']");
    a.setAttribute('style', 'color: #ffffff;background: #123b57;')
}

function getMenu(data) {
    var newMove = choiceMenu.firstElementChild.cloneNode(true);
    newMove.href = '#question-' + data;
    newMove.innerHTML = data;
    choiceMenu.appendChild(newMove);
}

function setNoitice(testTitle, time) {
    title.innerHTML = testTitle;
    numberQue.innerHTML = time;
    countTime.setMinutes(countTime.getMinutes() + time);
}

var sumit = document.getElementById('submit-quiz');
var back = document.getElementById('out-quiz');
var main = document.querySelector('.main-swing');
var input = document.querySelector('input');

let clientAns = [];
let clientWrongAns = [];
var clientScore = 0;
var wrongQuiz = {};
var titleName = '';

function checkClientKey(data) {
    var list = data[quizID].content;
    titleName = data[quizID].title;
    clientAns = list.map((element, index) => {
        var a = document.querySelector(`input[name="question${index + 1}"]:checked`);
        if (a) {
            if (element.key == a.value) {
                clientScore++
            } else {
<<<<<<< HEAD
=======
                a.parentElement.querySelector('label').style.backgroundColor = 'red'
>>>>>>> 0d78f4744e48d656daa8533ef0a99ffa4d5d2145
                clientWrongAns.push(element);
            }
            return a.value;
        } else {
            clientWrongAns.push(element);
            return "nocheck";
        }
    });
    wrongQuiz = {
        titleQuiz: title,
        idQ: clientWrongAns
    }

    noitce(clientScore, list.length);
}

function saveWrongQue(wrongQue) {
    var firstProfile = getAccountfromJSON();
    var currentQuiz = firstProfile.list_WrongQ;
    if (currentQuiz.length == 0) {
        currentQuiz.push(wrongQue)
    } else {
        currentQuiz.forEach((element, index) => {
            if (element.title == wrongQue.title) {
                currentQuiz.splice(index, index + 1)
                currentQuiz.push(wrongQue)
            }else{
                currentQuiz.push(wrongQue)
<<<<<<< HEAD
=======

>>>>>>> 0d78f4744e48d656daa8533ef0a99ffa4d5d2145
            }
        });
    }
    updateProfile(firstProfile);
}

function saveScore() {
    var quiz = {
        title: titleName,
        score: clientScore
    }
    var firstProfile = getAccountfromJSON();
    var compleQuiz = firstProfile.completedQuiz;
    compleQuiz.push(quiz)
    updateProfile(firstProfile);
}


sumit.onclick = () => {
    getData(checkClientKey)
    listRightQues.forEach((element) => {
        element.style.backgroundColor = 'green';
        element.style.color = 'white';
        element.style.borderRadius = '20px';
    })
    sumit.parentElement.removeChild(sumit);
}
back.onclick = () => {
    saveWrongQue(wrongQuiz);
    saveScore();
    window.location = `/trac-nghiem.html?username=${userProfile.username}`;
}
function noitce(score, ques) {
    alert(`Congratulations. You are correct ${score}/${ques}`);
}
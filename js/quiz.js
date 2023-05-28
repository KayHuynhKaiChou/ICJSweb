var title = document.querySelector('.title');
var testTime = document.querySelector('.time');
var numberQue = document.querySelector('.number-que');

var listQues = document.querySelector('.list-question');
var ques = listQues.querySelector('.info-question');

var choiceMenu = document.querySelector('.choice-menu');

var quesApi = '/data/quiz.json';

function start() {
    getData(renderQues)
}

start();

function getData(callBack) {
    fetch(quesApi)
        .then(resp => resp.json())
        .then(callBack)
        .catch(() => {
            clearInterval(x);
            noitce(clientScore);
            console.log(clientAns);
        })
}

function renderQues(data) {
    var list = data.content;
    setNoitice(data.title, list.length);
    list.forEach((element, index) => {
        getQues(index + 1, element);
        getMenu(index + 1);
    });
    listQues.removeChild(ques)
    choiceMenu.removeChild(choiceMenu.firstElementChild);
}

function getQues(index, data) {
    var newQue = ques.cloneNode(true);
    var quesContent = newQue.querySelector('.question');
    var quesNumber = quesContent.querySelector('.que-number');
    var quesTitle = quesContent.querySelector('.que-title');

    quesContent.id = 'question-' + index;
    quesNumber.innerHTML = '第' + index;
    quesTitle.innerHTML = data.question;

    getAns(data.answer, newQue, index);
    listQues.append(newQue);
}

function getAns(ansData, quesContain, index) {
    var ansContain = quesContain.querySelector('.answer');
    var ansBtn = ansContain.querySelector('.button');
    var ansContent = ansBtn.querySelector('label');
    var ansValue = ansBtn.querySelector('input');

    ansData.forEach((element) => {
        ansContent.innerHTML = element;
        ansValue.name = 'question' + index;
        ansValue.value = element;
        var generateBtn = ansBtn.cloneNode(true);
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
var main = document.querySelector('.main-swing');

let clientAns = [];
let clientWrongAns = [];
let clientScore = 0;

function checkClientKey(data) {
    var list = data.content;
    clientAns = list.map((element, index) => {
        var a = document.querySelector(`input[name="question${index + 1}"]:checked`);
        if (a) {
            if (element.key == a.value) {
                clientScore++
            } else {
                clientWrongAns.concat(element.id);
            }
        }
        return a == null ? "nocheck" : a.value;
    });
    clearInterval(x);
    noitce(clientScore, list.length);
}

sumit.onclick = () => {
    getData(checkClientKey)
    sumit.parentElement.removeChild(sumit);
}

function noitce(score, ques) {
    alert(`Congratulations. You are correct ${score}/${ques}`);
}
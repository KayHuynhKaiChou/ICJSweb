var quesApi = '/data/quiz.json';


function start() {
    getData(renderMenu)
}

start();

function getData(callBack) {
    fetch(quesApi)
        .then(resp => resp.json())
        .then(callBack)
}



function renderMenu(data) {
    getTestMenu(data)
}

function getTestMenu(quesData) {
    var menuQuesBlock = document.querySelector('.all-quiz');
    var htmls = quesData.map((quiz,index) => {
        return `<div class="quiz">
        <div class="quiz-top">
          <a class="title-top" >
            <h2 class="title-content">${quiz.title}</h2>
          </a>
          <a class="start" href="quizJapan.html?quiz=test${index}" >start quiz</a>

        </div>
        <div class="quiz-info">
          <div class="title-quiz">Title : ${quiz.title}</div>
          <div class="number-ques">Question : ${quiz.content.length}</div>
          <div class="time">Time : ${quiz.content.length} minutes</div>
        </div>
      </div>`;
    });
    menuQuesBlock.innerHTML = htmls.join('');
}
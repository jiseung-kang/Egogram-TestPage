const lastIndex = 50;
// const lastIndex = 5;
const btnGo = document.querySelector('.btn-go_info');
const btnStart = document.querySelector('.btn-start');
const btnYes = document.querySelector('.btn-yes')
const btnNo = document.querySelector('.btn-no')
const btnSoso = document.querySelector('.btn-soso')

const btnShare = document.querySelector('.btn-share')
const btnReset = document.querySelector('.btn-reset')

const pageMain = document.querySelector('.page-main')
const pageInfo = document.querySelector('.page-info')
const pageTest = document.querySelector('.page-test')
const pageResult = document.querySelector('.page-result')

const boxQuestion = document.querySelector('.box-question')

const resultType = document.querySelector('.res-type');
const resultDesc = document.querySelectorAll('.res-desc');

const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0].replace(/-/g, '');

let userName = "";
let userAge = 0;
let userSex =  "";
let userJob = "";
let code = date;

let total = [0, 0, 0, 0, 0] // cp, np, a, fc, ac
let result = '';
let desc = "";

initPage();
function initPage() {
	if (location.search != '') {
    let tmp = location.search.replace('?', '').split('-');
    loadChart(tmp[1],tmp[2],tmp[3],tmp[4],tmp[5])
    result = tmp[0];
    btnReset.innerHTML = "나도하기";
    viewResult(result)
    setResultForm()
	}
}

function setResultForm() {
	pageMain.style.display = 'none';
  pageResult.style.display = "block";
}

function setData() {
  const ref = firebase.database().ref(code);
  ref.push({
    type: result,
    age: userAge,
    sex: userSex,
    job: userJob,
    name: userName,
    score: total
  });
}

function calResult() {
	if (total[0] >= 14) result += 'A';
	else if (total[0] >= 8) result += 'B';
	else result += 'C';

	if (total[1] >= 14) result += 'A';
	else if (total[1] >= 8) result += 'B';
	else result += 'C';

	if (total[2] >= 14) result += 'A';
	else if (total[2] >= 8) result += 'B';
	else result += 'C';

	if (total[3] >= 14) result += 'A';
	else if (total[3] >= 8) result += 'B';
	else result += 'C';

	if (total[4] >= 14) result += 'A';
	else if (total[4] >= 8) result += 'B';
	else result += 'C';

  viewResult(result)
  setData();
}

function viewResult(type) {
  let tmp;
	tmp = dictType[type]
  desc = tmp.desc;

  resultType.textContent = result;
  resultDesc[0].innerHTML = tmp.desc.replace(/\n/g, '<br/><br/>');
  resultDesc[1].innerHTML = tmp.per.replace(/\n/g, '<br/><br/>');
  resultDesc[2].innerHTML = tmp.manage.replace(/\n/g, '<br/>');
  resultDesc[3].innerHTML = tmp.rel.replace(/\n/g, '<br/>');
}

btnGo.addEventListener('click', () => {
  pageMain.style.display = "none";
  pageInfo.style.display = "block";
})

btnStart.addEventListener('click', () => {
  pageInfo.style.display = "none";
  pageTest.style.display = "block";
  getInput();
  Next();
})

function getInput() {
  userName = document.querySelector('#name').value;
  userAge = document.querySelector('#age').value;
  userSex = document.querySelector('#sex').value;
  userJob = document.querySelector('#job').value;
}

let count = 0;
btnYes.addEventListener('click', () =>{
  total[qna[count].a] += 2
  count += 1;
  Next()
})

btnNo.addEventListener('click', () =>{
  total[qna[count].a] += 0
  count += 1;
  Next()
})

btnSoso.addEventListener('click', () =>{
  total[qna[count].a] += 1
  count += 1;
  Next()
})

function Next() {
  let status = document.querySelector('.bar-status');
	status.style.width = (100 / lastIndex) * (count) + '%';

  if (count == lastIndex) {
    pageTest.style.display = "none";
    pageResult.style.display = "block";
    calResult();
    loadChart(total[0], total[1], total[2], total[3], total[4]);
    return
  }
  boxQuestion.textContent = qna[count].q;
}

let qna = []
function getData() {
  fetch('./data/questions.json')
    .then((response) => response.json())
    .then((data) => {
      for(let d of data){
        qna.push(d)
      }
    });
  }

function loadChart(cp, np, a, fc, ac) {
  const ctx = document.querySelector('#myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['CP', 'NP', 'A', 'FC', 'AC'],
        datasets: [{
            label: '결과',
            data: [cp, np, a, fc, ac],
            // data: [total[0], total[1], total[2], total[3], total[4]],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
        }]
    },
    options: {
      legend: {
        display: false
    },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 20,
        }
      }
    }
});
}
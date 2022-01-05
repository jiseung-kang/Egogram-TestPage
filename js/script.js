const lastIndex = 3;
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

let userEmail = "0";
let userAge = 0;
let userSex =  "";
let userJob = "";

let total = [0, 0, 0, 0, 0] // cp, np, a, fc, ac
let result = '';
let desc = "";

function setData() {
  const ref = firebase.database().ref('data');
  ref.push({
    type: result,
    age: userAge,
    sex: userSex,
    job: userJob,
    email: userEmail,
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

  resultType.textContent = result;

  viewResult(result)
  setData();
}

function viewResult(type) {
	let tmp;
	tmp = dictType[type]
  desc = tmp.desc;
  resultDesc[0].innerHTML = tmp.desc.replace(/\n/g, '<br/><br/>');;
  resultDesc[1].innerHTML = tmp.per.replace(/\n/g, '<br/><br/>');;
  resultDesc[2].innerHTML = tmp.manage.replace(/\n/g, '<br/>');;
  resultDesc[3].innerHTML = tmp.rel.replace(/\n/g, '<br/>');;

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
  userEmail = document.querySelector('#email').value;
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
  if (count == lastIndex) {
    pageTest.style.display = "none";
    pageResult.style.display = "block";
    calResult()
    return
  }
  boxQuestion.textContent = qna[count].q;
  console.log(total)
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
const boxDate = document.querySelector('#date');
const wrapData = document.querySelector('.wrap-data');
const wrapDate = document.querySelector('.wrap-date');
let allData = {}
let dates = []

wrapDate.addEventListener('change', (event) => {
  if (event.target.value == 'all'){
    loadAllUserData();
  }
  else{
  loadSelectedData(event.target.value)
  }
})

function loadData() {
  const ref = firebase.database().ref();

  ref
    .once('value', (snapshot) => {
      const userData = snapshot.val();
      for (let i in userData) {
        let date = JSON.parse(i)
        dates.push(date)
        allData[date] = []
        for (let j in userData[date]){
          allData[date].push(userData[date][j])
        }
      }
      dates = Object.keys(allData)
  for (let date of dates) {
    let dateOption = document.createElement('option');
    dateOption.textContent = date;
    wrapDate.appendChild(dateOption);
  }
    }).then(() => loadAllUserData())
}

// 전체 데이터 로드
function loadAllUserData() {
  clearData()
  for (let date in allData) {
    let value = allData[date]
    setResultPage(value);
  }
}

// 해당 날짜 데이터 로드
function loadSelectedData(date) {
  clearData();
  let value = allData[date]
  setResultPage(value);
}

function setResultPage(value) {
  for (let v in value) {
    let userInfo = document.createElement('div');
    userInfo.innerHTML = `<span style="font-weight:700;">${value[v].name} ${value[v].sex}  ${value[v].age} ${value[v].type}</span>  ${value[v].job}`;
    wrapData.appendChild(userInfo)
    let score = [value[v].score[0], value[v].score[1], value[v].score[2], value[v].score[3], value[v].score[4]] 
    let chart = document.createElement('canvas');
    loadChart(score[0], score[1], score[2], score[3], score[4], chart)
    userInfo.appendChild(chart)
  }
}

function clearData() {
  while(wrapData.hasChildNodes()){
    wrapData.removeChild(wrapData.firstChild);
  }
}

// 통계
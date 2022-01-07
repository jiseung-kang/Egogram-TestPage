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
  
  for (let date in allData) {
    const value = allData[date]
    for (let v in value) {
      let title = document.createElement('div');
      title.textContent = `${value[v].name} ${value[v].sex} ${value[v].age} ${value[v].job}`;
      wrapData.appendChild(title)
      let score = [value[v].score[0], value[v].score[1], value[v].score[2], value[v].score[3], value[v].score[4]] 
      let chart = document.createElement('canvas');
      loadChartManager(score[0], score[1], score[2], score[3], score[4], chart)
      title.appendChild(chart)
    }
  }
}

// 해당 날짜 데이터 로드
function loadSelectedData(date) {
  while(wrapData.hasChildNodes()){
    wrapData.removeChild(wrapData.firstChild);
  }

  let value = allData[date]
  for (let v in value) {
    let title = document.createElement('div');
    title.textContent = `${value[v].name} ${value[v].sex} ${value[v].age} ${value[v].job}`;
    wrapData.appendChild(title)
    let score = [value[v].score[0], value[v].score[1], value[v].score[2], value[v].score[3], value[v].score[4]] 
    let chart = document.createElement('canvas');
    loadChartManager(score[0], score[1], score[2], score[3], score[4], chart)
    title.appendChild(chart)
  }
}

// 통계
const boxDate = document.querySelector('#date');
const wrapData = document.querySelector('.wrap-data');
let allData = {}
let dates = []

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
    }).then(() => test())
}

// 전체 데이터 로드
function test() {
  dates = Object.keys(allData)
  for (let date in allData) {
    const value = allData[date]
    for (let v in value) {
      // document.write(v, value[v])
      let title = document.createElement('p');
      title.textContent = `${value[v].name} ${value[v].sex} ${value[v].age} ${value[v].job}`;
      wrapData.append(title)
      let score = [value[v].score[0], value[v].score[1], value[v].score[2], value[v].score[3], value[v].score[4]] 
      console.log(typeof score)
      document.querySelector('.test').innerText = `${value[v].name} ${value[v].sex} ${value[v].age} ${value[v].job}`
    }
  }
}

// 해당 날짜 데이터 로드
function test2(date) {
  let value = allData[date]
  for (let v in value) {
    console.log(v, value[v])
  }
}

// 통계
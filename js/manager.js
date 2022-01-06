let allData = {}

function loadData() {
  const ref = firebase.database().ref();

  ref
    .on('value', (snapshot) => {
      const userData = snapshot.val();
      for (let i in userData) {
        let date = JSON.parse(i)
        allData[date] = []
        for (let j in userData[date]){
          allData[date].push(userData[date][j])
        }
        console.log(allData[date][0])
      }
    })
}


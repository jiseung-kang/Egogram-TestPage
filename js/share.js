const url = 'https://egogram.shop/';

function setShare() {

  var resultImg = document.querySelector("#resultImg");
  const shareTitle = "나의 Egogram 결과";
  const shareDes = result + " : " + desc;
  const shareImage = url + "img/main.png";
  const resURL = url + '?' + result + '-' + total[0] + '-' + total[1] + '-' + total[2] + '-' + total[3] + '-' + total[4];
  console.log(resURL);

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDes,
      imageUrl: resURL,
      link: {
        mobileWebUrl: resURL,
        webUrl: resURL
      },
    },

    buttons: [{
      title: '결과확인하기',
      link: {
        mobileWebUrl: resURL,
        webUrl: resURL,
      },
    }, ]
  });
}
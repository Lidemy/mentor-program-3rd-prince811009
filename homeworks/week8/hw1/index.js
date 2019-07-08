const request = new XMLHttpRequest();
const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const message = document.querySelector('.message');
const picture = document.querySelector('.picture');

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText;
    const json = JSON.parse(response);
    const result = json.prize;

    switch (result) {
      case 'FIRST': {
        picture.classList.remove('active');
        picture.src = 'fly.jpg';
        message.innerText = '恭喜你中頭獎!日本東京來回雙人遊！';
        body.style.background = 'lightblue';
        btn.innerText = '再試一次';
        break;
      }
      case 'SECOND': {
        picture.classList.remove('active');
        picture.src = 'tv.jpg';
        message.innerText = '二獎！90 吋電視一台！';
        body.style.background = 'lightgreen';
        btn.innerText = '再試一次';
        break;
      }
      case 'THIRD': {
        picture.classList.remove('active');
        picture.src = 'youtuber.jpg';
        message.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        body.style.background = 'pink';
        btn.innerText = '再試一次';
        break;
      }
      case 'NONE': {
        picture.classList.add('active');
        message.innerText = '銘謝惠顧';
        body.style.background = 'gray';
        btn.innerText = '再試一次';
        break;
      }
      default: {
        alert('系統不穩定，請再試一次');
        break;
      }
    }
  } else {
    alert('系統不穩定，請再試一次');
  }
};

btn.addEventListener('click', function () {
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.send();
});

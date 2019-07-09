const url = 'https://lidemy-book-store.herokuapp.com/posts?_order=desc&_limit=20&_sort=id';
const urlPost = 'https://lidemy-book-store.herokuapp.com/posts';
const msgWrap = document.querySelector('.messageWrap');
const message = {
  content: '',
};

// 以下為每次新增留言的 div 格式，如果為空白則無法送出
function renderHtml(data) {
  for (let i = 0; i < data.length; i += 1) {
    msgWrap.innerHTML
    += `
    <div class="message">
      <div class="messagebox">
        <div class="messageboxContent"> ${data[i].content ? data[i].content : '請重試'} </div>
      </div>
    </div>`;
  }
}

// 向 API 拿取儲存的資料(這裡的物件是每次新增的留言都會自動加在這裡嗎?)
function getMessages() {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const messageContent = JSON.parse(request.responseText);
      msgWrap.innerHTML = '';
      renderHtml(messageContent);
    } else {
      alert('請重試');
    }
  };
}

// 沒輸入文字則無法送出
function checkInput(str, event) {
  if (event.target.parentElement.firstElementChild.value !== '') {
    return JSON.stringify(str);
  }
  return false;
}

//監聽 'input' 事件
document.querySelector('textarea').addEventListener('input', (e) => {
  message.content = e.target.value;
});


//監聽 'click' 事件
document.querySelector('button').addEventListener('click', (e) => {
  const postMessage = new XMLHttpRequest();
  postMessage.open('post', urlPost);
  postMessage.setRequestHeader('content-type', 'application/json');
  //上述的 type,json 是指定格式的意思嗎? 為什麼除了'send'還需要多一個 'setRequestHeade'動作 ? 
  postMessage.onload = () => {
    if (postMessage.status >= 200 && postMessage.status < 400) {
      getMessages();
    }
  };
  postMessage.send(checkInput(message, e));

  e.target.parentElement.firstElementChild.value = '';
});

getMessages();
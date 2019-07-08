const url = 'https://lidemy-book-store.herokuapp.com/posts?_order=desc&_limit=20&_sort=id';
const urlPost = 'https://lidemy-book-store.herokuapp.com/posts';
const msgWrap = document.querySelector('.messageWrap');
const message = {
  content: '',
};

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

function checkInput(str, event) {
  if (event.target.parentElement.firstElementChild.value !== '') {
    return JSON.stringify(str);
  }
  return false;
}

document.querySelector('textarea').addEventListener('input', (e) => {
  message.content = e.target.value;
});


document.querySelector('button').addEventListener('click', (e) => {
  const postMessage = new XMLHttpRequest();
  postMessage.open('post', urlPost);
  postMessage.setRequestHeader('content-type', 'application/json');
  postMessage.onload = () => {
    if (postMessage.status >= 200 && postMessage.status < 400) {
      getMessages();
    }
  };
  postMessage.send(checkInput(message, e));
  e.target.parentElement.firstElementChild.value = '';
});
getMessages();

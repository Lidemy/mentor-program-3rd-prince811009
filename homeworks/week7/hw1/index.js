let startTime = 0;
//宣告 startTime ( 起始時間 ) 的值為0
let timer = 0;
//宣告 timer ( 計時器 ) 的值為0
let isFinished = false;
//宣告 isFinished ( 是否完成遊戲 ) 指定的值為 false

function playGame() {
  document.querySelector('body').style.background = "white"
  timer = setTimeout(() => {
    document.querySelector('body').style.background = "orange"
    startTime = new Date()
  }, Math.random() * 2000 + 1000)
}
/*
宣告函式 playGame 先指定背景為白色
宣告 timer 為 setTimeout( 延遲了一段時間後執行指定背景變色，延遲時間為 random1-3 秒)，
startTime 指定為現在的時間
*/

function restartGame() {
  clearTimeout(timer)
  startTime = 0
  isFinished = false
  playGame()
}
/*
宣告函式 restartGame 重新開始遊戲
清除時間 ( 計時器 )
startTime ( 起始時間 ) 的值為0
遊戲未結束
繼續執行 playGame
*/

document.querySelector('#block').addEventListener('click', function (e) {
  document.querySelector('#block').classList.toggle('active')
  restartGame()
  e.stopPropagation()
})
/* #block 被點擊之後新增 class('active')
重新開始遊戲
阻止 button 回傳 (到父層 div)
*/

document.addEventListener('click', function () {
  if (startTime == 0) {
    alert('還沒變色，失敗 ~')
    restartGame()
  } else if (!isFinished){
    alert('你的成績為：' + ((new Date() - startTime) / 1000).toFixed(2) + '秒')
    isFinished = true
    const element = document.querySelector('#block')
    element.classList.add('active')
  }
})
/*當 startTim 起始時間為 0 時， alert 訊息並重新開始遊戲
如果遊戲還沒結束， alert 你的成績 ( 你的成績為現在的時間減掉從遊戲開始之後你按下的時間點 )
並在 #block 加入 class ('active)
遊戲結束
*/

playGame()

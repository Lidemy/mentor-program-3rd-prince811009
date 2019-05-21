## Week1
了解 CML 以及 Git 版本控制
### Command Line
   *  常用指令
|指令名稱|功能 |
|:------:|:---:|
|ls      |列出目前有的所有檔案名稱|
|cd/cd ..|切換到指定資料夾 / 回到上一層資料夾|
|touch|更改檔案最後時間 / 新增檔案|
|mkdir|新增資料夾|
|rm |刪除檔案|
|rmdir|刪除資料夾|
|pwd|印出目前位置|
|exit|離開|
### Git
   *  常用指令
|指令名稱|功能|
|git init|初化這個目錄，讓 Git 開始對該目錄進行版本控制|
|git add [name] / git add . |將檔案暫存 / 將所有檔案暫存|
|git commit -m "鍵入commit message"/git commit -am "鍵入commit message"|對檔案進行版本控制 / 將檔案暫存並進行版本控制|
|.ignoregit| 將不需要需要進行版本控制的檔案放置於此|
|git status|檢視目前版本控制狀態|
|git log|檢視各版本的亂數命名、時間以及各種資訊|
|git branch [name]|建立一個新的分支|
|git branch -d [name]/git branch -D [name] |刪除分支 / 強制刪除分支|
|git checkout [name]|切換到此分支|
|git push origin [anme]|將檔案 push 到 GitHub 分享|
|git pull origin master|將最新版本 pull 至本地|
#### 學習心得
在電影中常看到的工程師或是駭客常在電腦中打一些很酷炫的指令，如今終於也懂得一點皮毛中的皮毛了，感覺很興奮 ! 這周了解到 CML 的基本操作以及 Git 版本控制的功能以及重要性，而且這也是往後
工作的重要工具和技能之一，非常實用 !
******
## Week2
JavaScript 程式基礎
### Node.js 環境建置
   *  如何執行JavaScript
### 基本運算
   *  算數運算
   *  邏輯運算 (and、or、not)
   *  邏輯運算小撇步 (|| 與 &&)
### 位元運算
   *  位移運算子
   *  位元運算的 and、or、xor 及 not
### 變數
   *  變數宣告
   *  陣列 (Array)
   *  物件
   *  變數的運算
   *  == 與 === 的差別
### 判斷式
   *  if/else statement
   *  if/else if statement
   *  switch case
   *  三元運算子 (Ternary)
### 迴圈
   *  while 迴圈
   *  foor loop
### 函式 (Function)
   *  函式結構
   *  宣告函式
   *  引數 (Argument) 與參數 (Parameter)
   *  return 用法
### 常用內建函式
   *  Number 類型內建函式
   *  String 類型內建函式
   *  Array 類型內建函式
### 注意事項
   *  回傳 (return) 和印出 (console.log) 的差別
### 學習心得
這周集中火力開始初學 JaveScript收穫滿滿，其中也是終於搞懂了一些運算的基本邏輯，另外就是把大學時期一直很害怕的三大魔王「判斷式」、「迴圈」、「函式」各自搞清楚，熟悉這樣子的模式之後就較不恐懼接觸新的事物，能夠按部就班把課程理解並且實際運用，很期待後續 JavaScript 的衍伸課程。
******
## Week3
ES6 語法與加強 JavaScrip 
### Module (模組)
   *  require
   *  export
### ES6 
   *  let/const
   *  新版字串
   *  解構
   *  展開運算子
   *  反向展開
   *  default Parameters
### npm(Node Package Manager)
   *  npm install
   *  npm scripts
   *  yarn(npm 以外的另一個選擇)
### 測試
   *  Jest
   *  TDD
### 學習心得
這次的課程解惑了之前為何在 git commit 的時候出現的那麼多錯誤的解析，順便真正的了解如何改正錯誤，之後再回頭檢視自己 Week2 和 Week3 作業的一些小細節，也終於把 const 和 let 弄懂了，不然之前寫練習題的時候都是隨意放一個變數，之後再等 commit 的時候再依照錯誤訊息更改。
******
## Week4
網路基礎概論
### 溝通與回傳
   *  協定 (protocol) 的重要性
### HTTP 協定
   *  何謂 HTTP
   *  HTTP request
   *  DNS Server
   *  溝通中產生的 Header 與 Body
   *  GET 與 POST
   *  其他 HTTP Method
   *  常見 HTTP Status code 
   *  實作 HTTP Server
### TCP/IP
   *  何謂TCP/IP
   *  IP 位置
   *  虛擬 IP、浮動 IP、固定 IP
   *  Port
   *  TCP 與 UDP
### API 
   *  何謂 API
   *  API 與 Web API
   *  串接 HTTP API
### 資料格式
   *  純文字與自定義格式
   *  XML
   *  JSON
### SOAP
   *  何謂 SOAP
   *  其他 SOAP 以外的 HTTP API
   *  RESTful
   *  API 串接
### 自定義資料交換
### 其他工具及指令
   *  curl
   *  ping, telnet, nslookup
### 學習心得
之前有使用 wordpress 架設一個簡易的網站，當中在設定主機與網域之間的設定時也是懵懵懂懂看著教學操作，藉著這次機會也是一併把 DNS 設定釐清，雖然還不是很清楚（本周課程比較抽象），但是至少知道自己在架設網站中所需具備的一些基本配備和設定以及原理。
## 複習周心得

### Week 9
#### 資料庫基礎語法
本周課程介紹使用 MySQL 的基礎與法，從建立資料庫到後端使用 php 撈取資料庫中資料，其中也包括設定 MySQL 相關流程。
 - 建立資料庫
 ```
 CREATE DATABASE [DATABASE__NAME]
 ```

 - 刪除資料庫
 ```
 DROP DATABASE [DATABASE__NAME]
 ```

 - 列出目前資料庫清單
 ```
 DESCRIBE [DATABASE__NAME]
 ```

 - 新增欄位
 ```
 INSERT INTO [TABLE__NAME] VALUES [值]
 ```

 - 更新欄位
 ```
 UPDATE [TABLE__NAME] SET [欄位] = [值] WHERE [條件]
 ```

 - 刪除資料欄位
 ```
 DELETE FROM [TABLE__NAME] WHERE [條件]
 ```

 - 查詢資料
 ```
 SELECT FROM [TABLE__NAME] WHERE [條件]
 ```

 #### PHP 基礎語法
在 php 語法中會使用 ```<?php ?>``` 將 php 語法寫在裡面執行，另外則會在變數前面加上 ```$``` 使用
 - 與資料庫連線：將連線資料庫所需的資料設定在此
 ```
 $server_name = 'localhost';
 $user_name = 'root';
 $user_password = 'root';
 $db_name = 'your db name';

 $conn = new mysql($server_name, $user_name, $user_password, $db_name);

 $if ($conn->connect_error) {
     die;
 } else {
     echo 'success';
 }
 ```

 - 在 php 中使用 SQL 語法
 ```
 $sql = "SELECT * FROM myTableName WHERE uaername = 'myUserName'";
 $result = $conn->query($sql);
 $row = $result->fetch_assoc;
 ``` 

#### Cookie 與 Session
##### 最初：Cookie 的誕生
Cookie 可以把他想像成最簡單溝通的方式，有點像是學生時期的傳紙條，前端和後端的溝通也可以像是這樣，前端發出 request 讓 server 帶上紙條給後端。

 - Cookie 缺點： 
    *  Cookie 放置位置為 client 端本身，因此資料來源會有資安方面的問題，因為 client 可以自行變更 Cookie 本身的內容，因此一些敏感性資料不適合使用此方式。
    * Cookie 大小有所限制，因此超過此容量的資料無法被放置。
##### Session
Session 機制可以比喻為像是一張「通行證」，在你造訪各網站時，網站會核發給你通行證，之後只要出示此通行證就能夠登入。

 - Session 的實現作法：
    *  常常會讓 Session 和 Cookie 搞錯的部分也是在此，因為 Session 常使用的做法是用 Cookie 機制實現，讓使用者每次登入時都可以自動帶上驗證身分的 Cookie ，避免使用者每次都需要執行登入的動作。
```
// setcookie(name, value, time);
 if (verify === true) {
    setcookie("member_id", "001", time()+3600*24);
}
```

### Week 11
#### 雜湊與加密
 - Hash
將一值經過 hash function 後產生出新的值。
```
// hash function()
echo hash('sha256', 'password', Boolean)
```
另外 hash 也常常搭配 salt 一起使用，使碰撞的機率再降低。
 - 加密
 和 hash 不同的是，加密過後的資料能夠使用解密來找到這項值所相對應的值，但 hash 則不是，除非把 hash 過後的結果製成一張 table 後來查考，不然解出 hash function 的機率也是極小。

### Week 12
#### 資訊安全
 - SQL Injection
利用 SQL 語法進行對資料庫資料的攻擊。因為在我們使用 php 連接資料庫資料時通常可使用以下做法：
```
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users_table WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);
```
常見手法則是利用單引號或雙引號進行字串拼接的方式，讓 SQL 的語法邏輯改變
```
'OR 1=1 --
```
其結果會變成
```
"SELECT * FROM users_table WHERE username = '' OR 1=1 --"
```

 - SQL Injection 預防方法：Prepared statement
預先準備可執行資料庫語法的模組，後續再加上 / 更新內容，因此單引號或是雙引號就比較無法達到原先的效果 / 攻擊了。
```
$stmt = $conn->prepare("SELECT * FROM users_table WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();
```

 - XSS (Cross Site Scripting)
 指跨站式腳本攻擊，若使用者從前端使用 js <script></script> 將一些惡意程式碼嵌入網站，便會被執行其中惡意程式碼。

 - XSS 預防方法：
 使一些字元跳脫，來預防一些會誤導程式碼邏輯的字元
 ```
 htmlspecialchars($htmlsanitize,ENT_QUOTES,'utf-8');
 ```

### Week 13
####  jQuery and Bootstrap
##### jQuery
jQuery 唯一套 JavaScript 的 Library，因此因為之前有寫過一些 js 作業，因此邏輯上有蠻多部分共通點，所以只需要練習熟悉一些語法及應用方式。例如 add class 的範例如下：
 - js 語法
```
el.classList.add(className);
```

 - jQuery 語法
 ```
 #(el).addClass(className);
 ```

##### Bootstrap
Bootstrap 為一項用於網站及應用程式開發的框架，包括 HTML、CSS 及 JavaScript 的框架，提供各種元件及 Javascript 的擴充套件，讓開發者在動態網頁或是 Web 開發上更加方便。
 - 結構與功能
   *  CSS: 
   Bootstrap 對一系列 HTML 元件的基本樣式 ( 包括文字、表格和表單等元素 ) 設計了一套樣式。
   
   * 可重用元件 : 
   除了基本的 HTML 元素之外，Bootstrap 還包括了其他常用的介面元素，例如進階功能的按鈕（按鈕組合、下拉式選單、導航欄、分頁等）、標籤、進階排版、縮圖、進度條等，皆是開發者非常高度使用的一些元件。

   * JavaScript元件 : 
   通過 jQuery，Bootstrap 加入了一些 JavaScript 的元件，例如對話方塊、工具提示、輪播等功能。此外還增強了一些使用者介面元素的功能，例如輸入框的自動完成。

##### Promise
為 ES6 新增的語法，用來解決非同步的執行。
 - 語法
```
new Promise( /* executor */ function(resolve, reject) { ... } );
```

 - 非同步執行
```
const myFirstPromise = new Promise((resolve, reject) => {
  // 執行一些非同步作業，最終呼叫:
  //
  //   resolve(someValue); // 實現
  // 或
  //   reject("failure reason"); // 拒絕
});
```

 - 要提供一個 function promise 的功能，讓它回傳 promise 即可 :
```
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
```

### Week 14
#### 部署
將前幾周使用 php 製作的留言板部署至虛擬主機上，其中需要執行的步驟為：
 - 設定遠端主機 ( 本次使用 AWS )
 - 設定 phpmyadmin
 - 將網站部署至主機
 - 設定 DNS 將 domain 綁定 IP 位址。

 這周部署網站的內容比較沒什麼問題，一方面是參考筆記非常詳細，能夠查考的部分很多 ( 再次感謝 ~)，另一方面也是曾經有興趣而製作過一次，因此在設定虛擬主機或是 DNS 的部分也比較熟悉，比較生疏的地方為還需要另外設定 phpmyadmin，以及之前設定都是使用網站介面完成，這次部署的流程也順便複習了 command line 的一些指令。













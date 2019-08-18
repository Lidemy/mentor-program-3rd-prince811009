## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
SQL Injection 主要針對資料庫進行攻擊，藉由在任何前端抓取或是寫入後端資料庫過程中竊取資訊。 其中最常見的就是登入的過程，因為 ```$username``` 以及 ```$password``` 為使用 ```POST```，因此可透過從輸入 username 處輸入成 ```' or 1=1 --- ``` 讓 username 一定為 true(1=1 為 true)，且 password 使用註解符號因此不用輸入 password 就可以登入。

### 防範方法
   *  mysqli_real_escape_string 函式 

      在參數串入 SQL 語句之前，先使用函式將希望輸入的參數過濾，這函數會使 SQL 的關鍵字元替換成跳脫字元，因此在 SQL 查詢中會成為普通的字串，不讓輸入變成程式語法的一部分，例如 ``` \' ``` 就會是單純單引號的字串。
   *  Prepared Statement 

      這是目前實際上最推薦的作法，可以從根本解決 SQL Injection 的問題。它的原理是利用 PHP 內建的函式對 SQL 語法進行預處理，並且綁定參數或變數，讓傳入數值時，可以保證不成為 SQL 語句的一部分，也就不會產生 SQL Injection。

## 請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
使用者輸入的指令碼語言被瀏覽器成功的執行，所以惡意的使用者可能會在網頁中植入惡意的程式碼，使頁面變動或是取走其他使用者的敏感資訊等。而常見的幾種類型有：
   *  Stored XSS

      將惡意程式碼直接寫入到後端資料庫中，這種會直接影響到此網址的整個變動，以及所有網站的使用者，例如跳出 alert 視窗等。
      ```
      <script>alert('Hello)</script>
      ```

   *  Reflected XSS 

      這類攻擊不會被儲存在資料庫中，而是從網頁後端直接將使用者輸入的內容撈出到畫面上，最常見的就是以 ```GET``` 的方式傳送資料給伺服器的時候，伺服器未檢查就將內容回應到網頁上，造成資安漏洞。例如最簡單的就是在表單的 input 中輸入做此動作，
      ```
      <?php
         if (isset($_GET['name'])): ?>
         <h3>Hi, <? =$_GET['name'] ?></h3>
      <?php else: ?>
         <h3>what's your name?</h3>
         <form method="GET">
            <input type="text" name="name" />
            <button type="submit">Say Hi</button>
         </form>
      <?php endif; ?>
      ```
      使用者在 input 輸入名字之後，網頁就會出現 Hi, username 的訊息，但是網址的地方也會出現 GET 到的參數，( 網址上會出現 ?name=username )，惡意使用者可以隨意修改成 ( 例如： ``` ?name=<script>alert(123)</script>``` )，就能更改網頁的內容。

      因此如果網頁後端沒有將惡意字元過濾掉，直接回傳的內容理所當然會依照程式碼執行，讓攻擊者有機會用釣魚手法或其他方式讓其他使用者受騙或點入特定連結中。

   *  DOM-Based XSS

      指的是網頁上 JavaScript 在執行的過程中，未經過詳細檢查資料就執行，使得操作 DOM 的過程中代入了惡意指令。
      ```
      <script>
         var create_text = function() {
            var name = document.getElementById('name').value;
            document.getElementById('show_name').innerHTML = name;
         }
      </script>
      <h3>Hi, <span id="show_name"></span></h3>
      <input id="name" type="text" />
      <button onclick="create_text();">Say Hi</button>
      ```
      假設程式碼沒有經過妥善檢查就執行的話，輸入任意的內容都會被建立成有效的 DOM 物件，不過這類手法需要他配合上述兩個手法，讓內容保存在伺服器資料庫中，接著再藉由 JavaScritp 動態產生有效的 DOM 物件來執行程式碼。

## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
為一種 Web 上的攻擊手法，全名為 Cross Site Request Forgery，跨站請求偽造。而 CSRF 攻擊之所以能成立，是因為使用者在被攻擊的網頁已經處於登入的狀態，也就是未落實身分確認所致，所以才能做出一些行為。

其中最常見也最容易的攻擊範例為，會以不正確的 URL 設計做為開端，例如刪除功能， ``` /delete?articleid=123 ``` 這樣的 GET 請求，而且在實際執行刪除動作之前沒有經過進一步的再確認動作，因此攻擊者只要在網站上設法引誘其他使用者點及圖片或是其他手法 ``` <a href="user_site/delete?articleid=123"></a> ``` 的連結，使用者會在不知情的情況下執行了此行程式碼。

### 防範方法
若在 Client 端進行防範方式有限，通常是讓使用者不要保持登入的狀態，但是可能會對使用者體驗有影響。

因此在 Server 端進行防禦措施才是解決根本的方法，因為造成 CSRF 的前提是因為相信來自 Client 端的資訊，而防範方法有以下幾點：

   *  檢查 Referer

   檢查 Referer 確認來源非跨站請求為相對簡單的防禦方式，但檢查規則容易有遺漏或是規避的情況發生，且瀏覽器可以控制傳送或是停用 Referer，因此此方式只適合用在暫時性防禦，或是已知使用者環境情況下。
   

   *  Synchronizer Token Pattern
   指在每次使用者發出請求時，不管是透過 POST 或是 GET，都必須回傳一個網站系統所指定的亂數，且這個亂數可以設計成適用於整個 Session 階段，也可以設計為只能使用一次。





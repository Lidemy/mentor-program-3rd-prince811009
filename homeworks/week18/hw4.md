## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？
### Gulp
Gulp 是建構在 node.js 和 npm 上的自動化整合工具，目的在於加強工作流程並且自動化。並且 Gulp 也提供了幾項 API : 
 - gulp.task : 執行工作
 - gulp.src : 執行資料來源
 - gulp.dest : 執行結果位置
 - gulp.watch : 監視執行過程中資料是否變更
 
參考：[Gulp - why do we need `Gulp` ?](https://github.com/prince811009/learning-notes/issues/18)

### Webpack
Webpack 為一個前端的打包工具，重點在於 Webpack 提供了前端開發所缺乏的模組化開發方式，所以當我們要引入各種模組時就變得容易許多。

參考：[Webpack - 超入門安裝](https://github.com/prince811009/learning-notes/issues/19)

### Gulp 跟 Webpack 有什麼不一樣？
 - 不同之處在於， Gulp 重點在於簡化工作流程，例如我們能夠一次編寫多個任務 (tasks) ，內容可包括處理 Scss 傳換成 CSS 、 JavaScript 的 ES6 以上語法轉譯成 ES5 語法 、壓縮文件檔等等，將這些每次都會需要重複執行的工作流程寫入 task 中，讓每次更新檔案或是檔案有異動時，就能夠將所需的任務執行一次，簡化開發者手動執行這些流程。
 - 而 Webpack 在於使模組化開發更方便，起因源自於目前的前端開發越來越複雜，當專案變的很龐大的時候，切割各個模組就顯得更加重要，因此目的也是希望類似使用 node.js 時，透過 `require` 引入，使各個模組的互相溝通更簡便。
 - 我們也可以不使用這些工具，改以手動方式進行，但就是比較耗時且耗力，在大型專案中也可能會有疏漏的地方，因此使用這些工具其實能夠帶來更多便利，且將減少一些人為的錯誤發生。
## hw3 把 todo list 這樣改寫，可能會有什麼問題？
在練習 hw3 時遇到 3 項狀況題：
 - 當每次送出 todo 的時候，整個頁面會重新 render 一次，會耗費許多資源，因此在 click 事件後加入這行程式碼修飾。
    ```
    e.preventDefault()
    ```        
 - 狀況題 2 和 3 則是當 todo 已經送出之後，若不小心繼續按到送出的按鈕，仍會一直送出空白的 todo ，以及當使用者輸入空白鍵時，一樣會送出空白的 todo ，因此多加了一道檢查手續。
    ```
    if (target.hasClass('btn btn-outline-secondary') && $('.form-control').val()) {
        // prevent users from using whitespace in input field 
        const content = $('.form-control').val().trim()
        // console.log(content.length)
        if(content.length === 0) return;
        addTodo(content)
    }
    ```    
## CSS Sprites 與 Data URI 的優缺點是什麼？
 - CSS Sprites
     *  優點
        1. 將各個圖片整合為一張大圖，讀取時只需發送一次 request ，減少資源的消耗
        2. 增加網頁讀取速度
     *  缺點
        1. 圖片定為點 / 參數座標需定位清楚
        2. 圖片可能會有失真的狀況
 - Data URL
     *  優點
        1. 使用 base64 編碼，以文字方式儲存在 HTML 中
        2. 圖片讀取速度快
     *  缺點 
        1. 編碼後變成不是圖檔，無法存在瀏覽器的 cache 中
        2. 當圖片有異動須重新編碼
        3. 易讀性差，透過編碼後的內容無法從檔案名稱判斷圖片內容。

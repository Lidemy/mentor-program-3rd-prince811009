## CSS 預處理器是什麼？我們可以不用它嗎？
### CSS 預處理器
CSS 預處理器可讓使用者透過該預處理器語法產生 CSS 的程式，例如加入 pure CSS 所沒有的功能，
 - mixin
 - nesting
 - selector
 - inheritance selector

 可以使 CSS 結構上的可讀性更高、也更容易維護。另外常見的 CSS preprocessors 有：
 - SASS
 - LESS
 - Stylus
 - PostCSS

### 我們可以不用它嗎 ? 
使用 CSS preprocessor 目的在於使 CSS 的寫法更工程化。
 - 優點：
   *  解決樣式覆寫的問題，尤其是mixin式複用
   *  可緩解多瀏覽器相容造成的冗餘
   *  提高效率，節約成本.
   *  使CSS開發更加靈活 ( 可使用變數、function、邏輯、繼承、匯入 )
 - 缺點：
   *  開發過程增加步驟

因此可以依照目前要開發的專案大小或是複雜度，決定是否要引入這一套語法，如果只是小型專案，一樣可以不使用 CSS preprocessor 而是使用 pure CSS 即可。

## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
 - Expires: 
 指 Cache 的到期時間。
 ```
 Expires: Wed, 21 Oct 2019 15:23:00 GMT
 ```
 當瀏覽器收到 Response 後會將資源存入 Cache，直到下次使用者再進入這個頁面後，瀏覽器會從中檢視目前的時間是否有超過 Expires 的日期 ( 及過期的意思 )，如果沒有過期，則瀏覽器不做任何動作 ( 不發送 Request)，一樣繼續從本地端拿取先前存好的 Cache 資料；如果 Cache 為過期的，則瀏覽器會再重新發送 Request。

 - Cache-Control and max-age:
此為解決上述 Expires 所遇到的問題。其中一項用法為：
```
Cache-Control: max-age=31536000
```
代表目前這個 Response 的期限為 31536000 秒，也就是 365 天，因此使用者一年之內造訪這個網站，瀏覽器皆不會再發送出 Request，而是直接使用之前紀錄再 Cache 的 Response，這部分可以在 header 看到。
``` 
Status code 200 (from memory cache)
```
## Stack 跟 Queue 的差別是什麼？
### Stack
一種資料結構型態，當加入資料 (push) 和移除資料 (pop) 時，會遵循後進先出的概念 (LIFO, Last In First Out) 運作。最常比喻成類似餐盤的拿取，第一個放置的餐盤在最底下，最後一個放置的餐盤在最上層，當使用者要拿取時需要從最上層開始拿取，而它其實是最後一個放置的餐盤。

```
stack.push(1) // [1]
stack.push(2) // [1, 2]
stack.push(3) // [1, 2, 3]
stack.pop() // [1, 2]
stack.pop() // [1]
```

### Queue
也是為一種資料結構型態，和 Stack 不同，Queue 則是先進先出的概念 (FIFO, First In First Out)，可以比喻為排隊中的隊伍，大家往同一個方向排隊，而最先排隊的人最先進入。

```
queue.push(1) // [1]
queue.push(2) // [1, 2]
queue.push(3) // [1, 2, 3]
queue.pop() // [2, 3]
queue.pop() // [3]
```

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
CSS Selector，之前的權重計算為在「同選擇器」中，因此當開發者在同選擇器中撰寫了相同屬性的樣式，瀏覽器就會依據權重來計算等級。
 - 影響因素 ( 依序為最高權重至最低權重 ) 
```
!important > inline-style > Id > Class > Element > *
```
另外，當選擇器的指定越精準時，權重的分數也就越高，例如：
```
// 權重分數較高
div p {
    color: red;
}

// 權重分數較低
p {
    color: red;
}
```

若需要更精確地了解 CSS Selector 的權重排序，可直接計算出權重分數。
 - Element:
 所有 Element 的權重分數皆為 0,0,0,1。

 - Class:
  所有 Class 的權重分數皆為 0,0,1,0。

 - Id: 
  所有 Id 的權重分數皆為 0,1,0,0。

 - inline-style: 
  所有 inline-style 的權重分數皆為 1,0,0,0。

 - !import:
  權重分數蓋過上述所有權重分數，1,0,0,0,0。

### Reference
[CSS Specificity: Things You Should Know](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)


## 挑戰題：去查詢什麼是 PostCSS 並使用它，順便解釋為什麼我們需要 PostCSS。
### PostCSS
為一個使用 js 轉換 CSS 語法的工具，功能有以下：
 - 支援各瀏覽器環境，加入前綴詞 (prefix)，例如: -webkit-, -moz- 等。
 - 語法檢查
 - 支援 Grid System
 - 可使用類似 SASS 
 
### 優點
 - 功能容易擴充：
   可以根據需求加入或刪除功能 (precss, prefix, mixin 等)，若要移除 plugin 也較容易。
 - 可使用最新語法或是自訂語法，新增 plugin 比 SASS 方便。
 - 增加語法可讀性。
 - 模組化 CSS。
## hw2：Event Loop + Scope
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
---
- answer : 
    ```
    i: 0
    i: 1
    i: 2
    i: 3
    i: 4
    5 (第 0 秒)
    5 (第 1 秒) 
    5 (第 2 秒) 
    5 (第 3 秒) 
    5 (第 4 秒) 
    ```

### 執行順序
 - 迴圈

    1. 當 i = 0 ( i < 5 )
        ```
        // 先執行
        console.log('i: ' + i) // i: 0

        // 接著執行
        setTimeout(() => {
            console.log(i)
        }, i * 1000) // timeoutID = 1

        // `setTimeout()` 為非同步行為，先移進 Web API 中等待 time's up
        //  等待 1 秒時間到，移至 Callback Queue
        ```

    2. 當 i = 1 ( i < 5 )
        ```
        // 先執行
        console.log('i: ' + i) // i: 1

        // 接著執行
        setTimeout(() => {
            console.log(i)
        }, i * 1000) // timeoutID = 2

        // `setTimeout()` 為非同步行為，先移進 Web API 中等待 time's up
        //  等待 1 秒時間到，移至 Callback Queue
        ```
    3. 當 i = 2 ( i < 5 )
        ```
        // 先執行
        console.log('i: ' + i) // i: 2

        // 接著執行
        setTimeout(() => {
            console.log(i)
        }, i * 1000) // timeoutID = 3

        // `setTimeout()` 為非同步行為，先移進 Web API 中等待 time's up
        //  等待 1 秒時間到，移至 Callback Queue
        ```

    4. 當 i = 3 ( i < 5 )
        ```
        // 先執行
        console.log('i: ' + i) // i: 3

        // 接著執行
        setTimeout(() => {
            console.log(i)
        }, i * 1000) // timeoutID = 4

        // `setTimeout()` 為非同步行為，先移進 Web API 中等待 time's up
        //  等待 1 秒時間到，移至 Callback Queue
        ```

    5. 當 i = 4 ( i < 5 )
        ```
        // 先執行
        console.log('i: ' + i) // i: 4

        // 接著執行
        setTimeout(() => {
            console.log(i)
        }, i * 1000) // timeoutID = 5

        // `setTimeout()` 為非同步行為，先移進 Web API 中等待 time's up
        //  等待 1 秒時間到，移至 Callback Queue
        ```
    6. 當 i = 5 跳出回圈

 - 此時 Call Stack 任務 ``` console.log('i: ' + i) ``` 皆已執行完畢，而 Callback Queue 目前有 timeoutID = 1~5 總共 5 項任務。
 - Event Loop 將 Callback Queue 尚未執行的 function 移到 Call Stack 中執行。

    1.  timeoutID = 1 ，( i = 5 )
    ```
    console.log(i) // 5 ( 第 0 秒 )
    ```

    2.  timeoutID = 2 ，( i = 5 )
    ```
    console.log(i) // 5 ( 第 1 秒 )
    ```

    3.  timeoutID = 3 ，( i = 5 )
    ```
    console.log(i) // 5 ( 第 2 秒 )
    ```

    4.  timeoutID = 4 ，( i = 5 )
    ```
    console.log(i) // 5 ( 第 3 秒 )
    ```

    5.  timeoutID = 5 ，( i = 5 )
    ```
    console.log(i) // 5 ( 第 4 秒 )
    ```
- 執行結束
---

## 變化題型
1. 試想將在 `setTimeout()` 函式裡面 `log` 出來的值輸出成 0~4。

 - method-1

    將 `var i=0` 替換為 `let i=0`

    ```
    for(let i=0; i<5; i++) {
        console.log('i: ' + i)
        setTimeout(() => {
            console.log(i)
        }, i * 1000)
    }
    ```
    - answer : 
        ```
        i: 0
        i: 1
        i: 2
        i: 3
        i: 4
        0 (第 0 秒)
        1 (第 1 秒) 
        2 (第 2 秒) 
        3 (第 3 秒) 
        4 (第 4 秒) 
        ```

 - method-2

    使用 `IIFE` 概念，短暫建立所需的一個 scope 並可立即使用。

    ```
    for (var i = 0; i < 5; i++) {
        console.log('i: ' + i)
        (function(j){
            setTimeout(function(){
                console.log(j)
            }, 1000 * (i + 1))
        })(i)
    }
    ```
    - answer : 
        ```
        i: 0
        i: 1
        i: 2
        i: 3
        i: 4
        0 (第 1 秒)
        1 (第 2 秒) 
        2 (第 3 秒) 
        3 (第 4 秒) 
        4 (第 5 秒) 
        ```

2. 試執行一個可重複執行 n 次、每次間隔隨機時間的 function。

    ```
    function randomInterval(numLoop, min, max) {
    var loop = function () {
        var rand = Math.round(Math.random()*(max-min) + min)
        setTimeout((rand) => {
            if (numLoop > 0) {
                console.log(numLoop)
                console.log(rand)
                numLoop -= 1
                loop(rand)
            }
        }, rand, rand)}
    loop()
    }

    randomInterval(6, 100, 1000)
    ```

## 後記
在此練習中發現一項有趣的返回值

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
- 此時使用 node.js 中會得到的答案為： 
    ```
    i: 0
    i: 1
    i: 2
    i: 3
    i: 4
    5 (第 0 秒)
    5 (第 1 秒) 
    5 (第 2 秒) 
    5 (第 3 秒) 
    5 (第 4 秒) 
    ```

- 但如果使用瀏覽器中的 devTools 則會出現此項現象：

    ```
    i: 0
    i: 1
    i: 2
    i: 3
    i: 4
    此行會多出一個數值
    5 (第 0 秒)
    5 (第 1 秒) 
    5 (第 2 秒) 
    5 (第 3 秒) 
    5 (第 4 秒) 
    ```
    可能會依據所使用的不同瀏覽器 (Chorme, Mozilla Firefox) 而回傳一個不同的數值，甚至是使用一般分頁或是無痕模式分頁也會有所不同。

    參考筆記：[About `window.setTimeout()](https://github.com/prince811009/learning-notes/issues/9)

### Reference
 - [ES6 的 var 和 let](http://www.jstips.co/zh_tw/javascript/keyword-var-vs-let/)
 - [實作非同步迴圈](http://www.jstips.co/zh_tw/javascript/implementing-asynchronous-loops/)
 - [Immediately invoked function expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression)
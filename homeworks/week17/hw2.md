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

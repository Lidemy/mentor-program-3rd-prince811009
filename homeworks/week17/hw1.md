## hw1：Event Loop
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
---
- answer : 
    ```
    1
    3
    5
    2
    4
    ```

- 執行順序 : 先編譯

    1. 主程式 `main()`

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | main() |  |  | |

    2.  line 1 : `console.log(1)`
        
        將 `console.log(1)` 放進 Call Stack

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | console.log(1) |  |  | |
        | main() |  |  | |

         將 `console.log(1)` pop out

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | main() |  |  | 1|
    
    3. line 2-4 : `setTimeout(() => { console.log(2) }, 0)`

        因為 `setTimeout()` 為非同步行為，所以移進 Web API 中等待 time's up

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | main() | setTimeout(() => { console.log(2) }, 0) |  | 1|

        等待 0 秒時間到，移至 Callback Queue

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | main() |  | setTimeout(() => { console.log(2) }, 0) |1 |

    4. line 5 : `console.log(3)`

        將 `console.log(3)` 放進 Call Stack

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | console.log(3) |  |  |  |
        | main() |  | setTimeout(() => { console.log(2) }, 0) | 1|

         將 `console.log(3)` pop out

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | |  |  | 1 |
        | main() |  | setTimeout(() => { console.log(2) }, 0) |3 |

    5. line 6-8 : `setTimeout(() => { console.log(4) }, 0)`

        因為 `setTimeout()` 為非同步行為，所以移進 Web API 中等待 time's up

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  | setTimeout(() => { console.log(4) }, 0) |  |1  |
        | main() |  | setTimeout(() => { console.log(2) }, 0) |3 |

        等待 0 秒時間到，移至 Callback Queue

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | | |  setTimeout(() => { console.log(4) }, 0) | 1 |
        | main() |  | setTimeout(() => { console.log(2) }, 0) |3 |

    6. line 9 : `console.log(5)`

        將 `console.log(5)` 放進 Call Stack

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        | console.log(5) | |  setTimeout(() => { console.log(4) }, 0) | 1 |
        | main() |  | setTimeout(() => { console.log(2) }, 0) |3 |

    7. 執行 `console.log(1)`，Call Stack pop out

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  |  |  | 1 |
        |  | |  setTimeout(() => { console.log(4) }, 0) | 3 |
        | main() |  | setTimeout(() => { console.log(2) }, 0) |5 |

    8. 待 Call Stack 都已執行完畢，將 `console.log(2)` 移到 Call Stack 中

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  |  |  | 1 |
        | console.log(2) | |  setTimeout(() => { console.log(4) }, 0) | 3 |
        | main() |  |  |5 |

        執行 `console.log(2)`，Call Stack pop out

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  |  |  | 1 |
        |  |  |  | 3 |
        | | |  setTimeout(() => { console.log(4) }, 0) | 5 |
        | main() |  |  |2 |

    9. 待 Call Stack 都已執行完畢，將 `console.log(4)` 移到 Call Stack 中

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  |  |  | 1 |
        |  |  |  | 3 |
        |console.log(4) | | | 5 |
        | main() |  |  |2 |

        執行 `console.log(4)`，Call Stack pop out

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  |  |  | 1 |
        |  |  |  | 3 |
        |  |  |  | 5 |
        |  | | | 2 |
        | main() |  |  |4 |

    10. 執行結束

        | Call Stack | Web API | Callback Queue | console.log |
        | --- | --- | --- | --- |
        |  |  |  | 1 |
        |  |  |  | 3 |
        |  |  |  | 5 |
        |  | | | 2 |
        |  |  |  |4 |


## 名詞解釋
### Event Loop
JavaScript 在瀏覽器中是以 single thread 執行，也就是一次執行一個任務；那非同步的運算則是怎麼進行呢 ? 因此就需要 Event Loop 這個機制幫我們操作 / 處理執行的順序。

### Call Stack
很重要的觀念是，所有程式語言都有 Call Stack 的概念。

類似 stack 資料結構的樣子，把呼叫的 function 層層往上堆疊，如果 call stack 超出上限，則會出現 stack overflow。

### Callback Queue
一般的 function 會放在 Call Stack 中，而會放在 callback Queue 則是在有非同步事件的時候發生，例如 ```setTimeout()``` ，當執行到這個 function 時會放在 web API 中，等到 timer 時間到再放入 callback Queue 中，等 Event Loop 檢查完 Call Stack 內的函式都已經執行完畢後，就會把它再放入 Call Stack 中執行。

### Event Loop 
Event Loop 則是會來回一直不斷地去監測 Call Stack & Callback Queue 是否還有未執行的 function ，如果 Call Stack 都已執行完畢，且 Callback Queue 有尚未執行的東西，就將 Callback Queue 的 function 放置到 Call Stack 。

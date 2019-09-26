## hw4：What is this?
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

- answer : 
    ```
    2
    2
    undefined
    ```
---
### 我是誰 ? 我在哪裡 ? 
大前言：

可將 ```this``` 試想成 "呼叫 function 的那項物件" ，也就是 ( In a function definition, ```this``` refers to the "owner" of the function. )，可參考 [JavaScript Object Methods
](https://www.w3schools.com/js/js_object_methods.asp) 。

 - ```const obj2 = obj.inner```
    將 obj.inner 指給變數 obj2。

 - ```const hello = obj.inner.hello```
    將 obj.inner.hello 指給變數 hello。

 - ```obj.inner.hello() // ??```
 
    首先來看看 ```obj.inner.hello()``` 會找到什麼 ? 由 key 可以得到 value 為
    ```
    function() {
      console.log(this.value)
    } 
    ```
    因此下一步就必須知道 ```this.value``` 其中的 ```this``` 指的是什麼了 ? 可以將 ```this``` 試想成 "呼叫 function 的那項物件" ( In a function definition, ```this``` refers to the "owner" of the function )。

     *  目前呼叫的 function() => ```obj.inner.hello()``` 
     *  其父層的元素為 => ```obj.inner```
     *  此時 ```this``` =>  ```obj.inner``` 
     *  因此 ```console.log``` 內的 ```this.value``` 實際上要找尋的是 => ```obj.inner.value```
     *  而 ```obj.inner.value``` => 2


 - ```obj2.hello() // ??```

    同上，先來看看 ```obj2.hello()``` 指的是什麼 ? 而變數 ```obj2``` 可由 ```const obj2 = obj.inner``` 來找尋，發現是由 ```obj.inner``` 將值指給他。
    ```
    inner: {
        value: 2,
        hello: function() {
            console.log(this.value)
        }
    }
     ```

    因此 ```obj2.hello()``` 所要呼叫的 function 也是為：
    ```
    function() {
            console.log(this.value)
    }
    ```

    下一步找尋 ```this.value``` 其中的 ```this``` 為何 ?

     *  目前呼叫的 function() => ```obj2.hello()``` 
     *  其父層的元素為 => ```obj2```
     *  ```obj2``` => 由 ```obj.inner``` 將值指給他。
     *  此時 ```this``` =>  ```obj.inner``` 
     *  因此 ```console.log``` 內的 ```this.value``` 實際上要找尋的是 => ```obj.inner.value```
     *  而 ```obj.inner.value``` => 2

 - ```hello() // ?? ```

    這個 function 有趣的是，沒有一個 "誰" 來呼叫這項 function，但是我們要找到 ```this``` 的大前提必須知道 "呼叫 function 的那項物件"。

    因此目前的狀況適用預設來綁定，在非嚴格模式底下為 window，所以會 log 出 ```window.value``` 也就是 ```undefined``` 。

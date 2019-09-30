## hw3：Hoisting
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
---
- answer : 
    ```
    undefined
    5
    6
    20
    1
    10
    100
    ```

### 名詞解釋
JavaScript 為 Interpreted language ( 直譯語言 )，因此會先將程式碼逐行進行編譯後再執行。
 - 建立 Execution Context ( 執行環境，(EC))

    JavaScript 需先建立 Execution Context，將程式碼所需的資源先建立好，程式碼才能夠在此執行環境下執行。當進入 Execution Context 之後，其中的 Scope Chain 也會被建立並初始化、變數也被初始化

    ```
    global EC: {
        VO: {
            arguments: {
            },
            function declaration: {
            }
        },
        scopeChain: [globalEC.VO],
        this:
    }

    function EC: {
        AO: {
            arguments: undefined,
            function declaration: {
            }
        },
        scopeChain: [function EC.AO, ],
        this:
    }

    Enter function EC =>
    scope chain: [AO , [[Scope]] ]
    ```

     * VO / AO :
        其中會記錄 ```arguments``` , ``` variable``` 及 ``` function``` ，在全域範圍內稱為 Variable Object (VO)，在 function 中稱為 Activation Object (AO)。
     * arguments : 
        紀錄 function 的參數，如果為定義則為 undefined
     * function declaration : 
        將 function 的宣告紀錄在此，且權重最高。
     * variable : 
        初始值為 undefined，紀錄變數宣告，但權重最低。
     * Scope Chain : 
        以 array 的方式紀錄 EC 的 scope，而且 child 也會存取到 parent 的 scope。

### 執行順序
 - 建立 / 編譯 global Execution Context
 - 執行主程式
 - 建立 / 編譯 fn Execution Context
 - 執行 fn
 - 建立 / 編譯 fn2 Execution Context
 - 執行 fn2
 - fn2 執行完畢
 - fn 執行完畢
 - 主程式執行完畢

---
 1. 建立 / 編譯 global Execution Context
    ```
    globalEC: {
        VO: {
            a: undefined,
            fn: function {
            }
        },
        scopeChain: [globalEC.VO]
    }
    ```
      * 建立 global Execution Context，VO 紀錄變數及函式的宣告，以及初始化 scopeChain。
      * Line 1 : ```var a = 1```
        
        a 變數宣告為 undefined
      * Line 2 : ```function fn(){}```
       
        ```fn``` 函式宣告

 2. 執行主程式
    ```
    globalEC: {
        VO: {
            a: 1,
            fn: function {
            }
        },
        scopeChain: [globalEC.VO]
    }
    ```
      *  執行主程式
      * Line 1 : ```var a = 1``` 
        
        將 a 賦值 1 。 

 3. 建立 / 編譯 fn Execution Context
    ```
    globalEC: {
        VO: {
            a: 1,
            fn: function {
            }
        },
        scopeChain: [globalEC.VO]
    }

    fnEC: {
        AO: {
            a: undefined,
            fn2: function {
            }
        },
        scopeChain: [fnEC.AO, globalEC.VO]
    }
    ```
    
 4.  執行 fn 
   
        ```
        globalEC: {
            VO: {
                a: 1,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: undefined,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }
        ```

      * Line 3: ```console.log(a) // undefined ```
      * Line 4: ```var a = 5```

        將 a 賦值 5 。 
        ```
        globalEC: {
            VO: {
                a: 1,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: 5,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }
        ```

      * Line 5: ```console.log(a) // 5```

      * Line 6: ```a++```

        a++ => a = 6
        ```
        globalEC: {
            VO: {
                a: 1,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: 6,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }
        ```
      * Line 7: ```var a ```

        宣告 a，a 不變

5.  建立 / 編譯 fn2 Execution Context
    ```
    globalEC: {
        VO: {
            a: 1,
            fn: function {
            }
        },
        scopeChain: [globalEC.VO]
    }

    fnEC: {
        AO: {
            a: 6,
            fn2: function {
            }
        },
        scopeChain: [fnEC.AO, globalEC.VO]
    }

    fn2EC: {
        AO: {

        },
        scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
    }
    ```

      * Line 8: ``` fn2()```
        建立 fn2 Execution Context

6.  執行 fn2

    ```
    globalEC: {
        VO: {
            a: 1,
            fn: function {
            }
        },
        scopeChain: [globalEC.VO]
    }

    fnEC: {
        AO: {
            a: 6,
            fn2: function {
            }
        },
        scopeChain: [fnEC.AO, globalEC.VO]
    }

    fn2EC: {
        AO: {

        },
        scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
    }
    ```

      * Line 11: ```console.log(a)```

        fn2EC 的 scope 中沒有紀錄 a，往上至 fnEC.AO 找尋 a => a = 6，```console.log(a) // 6 ```
      * Line 12: ```a = 20```

        將 a 賦值 20，但同上 fn2EC 的 scope 中沒有紀錄 a，往上至 fnEC.AO 找尋 a => a = 20。

        ```
        globalEC: {
            VO: {
                a: 1,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: 20,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }

        fn2EC: {
            AO: {

            },
            scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
        }
        ```
      * Line 13: ```b = 100```

        將 b 賦值 100，但同上 fn2EC 的 scope 中沒有紀錄 b，往上至 fnEC.AO 找尋 b => 沒有紀錄 b，往上至 globalEC.VO 找尋 b => 沒有紀錄 b，最後在全域範圍宣告 b 變數，b => b = 100。


        ```
        globalEC: {
            VO: {
                a: 1,
                b: 100,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: 20,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }

        fn2EC: {
            AO: {

            },
            scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
        }
        ```

    *  回到 Line 9: ```console.log(a) // 20 ```

        注意：執行此行程式為在 fn() 內，因此到 fnEC.AO 找 a => a = 20。
        
7. ```fn2()``` 執行完畢

8. ```fn()``` 執行完畢

9. Line 17~20

    ```
        globalEC: {
            VO: {
                a: 1,
                b: 100,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: 20,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }

        fn2EC: {
            AO: {

            },
            scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
        }
    ```

      * Line 17: ```console.log(a) // 1 ```

        在 globalEC.VO 找 a => a = 1。
      * Line 18: ```a = 10```

        將 a 賦值 10。

        ```
        globalEC: {
            VO: {
                a: 10,
                b: 100,
                fn: function {
                }
            },
            scopeChain: [globalEC.VO]
        }

        fnEC: {
            AO: {
                a: 20,
                fn2: function {
                }
            },
            scopeChain: [fnEC.AO, globalEC.VO]
        }

        fn2EC: {
            AO: {

            },
            scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
        }
        ```

      * Line 19: ```console.log(a) // 10 ```

      * Line 20: ```console.log(b) // 100```

10. 主程式執行完畢
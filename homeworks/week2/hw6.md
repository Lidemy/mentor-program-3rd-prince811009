``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第1行，設定一個為陣列的函式
2. 執行第2行，設定變數 i 的初始值為 0 ，i 的範圍小於陣列的長度，每一圈 i 增加 1
3. 執行第3行，如果陣列為空陣列，則回傳無效
4. 執行第5行，設定變數 i 初始值為 2 ，i 的範圍小於陣列的長度，每一圈 i 增加 1
5. 執行第6行，如果陣列的值不等於前 2 項數值的加總則回傳無效
5. 如果等於則跳到執行第8行，回傳有效
6. 函式帶入此陣列數值

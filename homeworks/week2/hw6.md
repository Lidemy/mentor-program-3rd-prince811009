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
1. 執行第 1 行，設定函式為一個陣列。
2. 執行第 2 行，設定變數 i 的初始值為 0 ，i 的範圍小於於此陣列的長度，每圈增加 1 。
3. 執行第 3 行，如果陣列值為小於等於 0 則回傳"無效"，一直執行到陣列的最後一個值。
4. 執行第 5 行，第 2 個迴圈初始值 i 帶入 2 開始，一直到小於此陣列長度的 i 值，每圈 i 加 1。
5. 執行第 6 行，如果陣列數值不等於前2個值加總，則回傳"無效"，如果是則跳到第 8 行回傳"有效"
6. 執行第 11 行，陣列帶入值檢查。

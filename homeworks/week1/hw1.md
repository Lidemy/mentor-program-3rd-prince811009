##  交作業流程
---
+ **備註：請記得每次交作業一定要新開一個 branch**
1. 新開一個branch 
    > `git branch hw1`
2.  進入分支branch
     > `git checkout hw1`
3.  新增或修改作業內容
     > 每次變更須執行 commit， `git commit -am "hw1"`
4.  此時 eslint 會檢查 JS 程式碼是否符合規範
5.  檢查目前 commit 狀態
     >  `git status`
6.  檢查完畢後將 branch push 到 GitHub 上
     > `git push origin hw1` ，（此時會 tag 同學來看作業囉~）
7.  執行 Pull requests （可輸入心得 / 問題）
8.  新增 Issues （此步驟最重要，Huli 才能看到作業）
     > 在 [交作業專區](https://github.com/Lidemy/homeworks-3rd)新增Issue，標題需符合規範才能上傳
9.  push 完檔案之後再 pull 最新檔案至本地
     > 審核過後的作業（Issues 被 closed 之後），把 檔案pull下來 `git pull origin master`
10.  把先前的 branch 刪除
      > `git branch -d hw1`

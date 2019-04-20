## 跟你朋友介紹 Git
## Git 概念的比喻
其實說穿了 Git 就是一種版本控制的概念，因為當我們在製作一項報告或是專案時，大概很難一次一個版本就 ok，可能需要多次的修改或是和伙伴 / 同事共同增修、合併檔案，因此版本的控制就顯得更加的重要了~因為大家大概不想把辛苦的心血結晶（笑話大全XD）付諸流水戶或是搞不清楚哪一個版本已經修改過或是哪個才是最新版本，但是藉由時間來排序檔案順序也並非絕對正確，因此 Git 就為此誕生囉

## Git 的基礎使用
1. 完成檔案之後，將檔案加入版本控制
    > `git add [檔案名]`
    > `git add .`（將所有所需檔案加入版本控制）
2. 執行 commit
    >`git commit "鍵入commit message"` （資料夾將以亂碼命名，以防重複）
3. 查詢各版本狀態
    > `git log` （查詢各版本的亂數命名、時間以及各種資訊）
4. 跳至某版本
    > `git checkout [亂數版本名]`
5. 每次進行修改內容，則都需要
    >`git add`
    >`git commit`
    才有真的加入版本控制
    也可將上述兩個指令合併為一`git commit -am "鍵入commit message"`
6. 可將擬作的 git push 到 GitHub 上分享，首先先新增一個branch
    > `git branch name`
7. 把檔案 push 到 GitHub
    > `git push origin name`
8. 把檔案 merge
    > 按下「Pull requests」，此時你的 branch 和 master 合併
9. 將最新版本 pull 至本地
    > `git pull origin master`
10. 刪除分支
      >`git branch -d name`


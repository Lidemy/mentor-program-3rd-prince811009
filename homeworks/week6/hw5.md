## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. 標籤一：button：網頁中使用標籤的時機很多，因此不用先從建立色塊形狀開始做成按鈕的樣子，直接使用 button 是很方便的做法，再一一去修改它的屬性。
2. 標籤二：<br/> 換行標籤：用於內文中須要換新的一行時使用 ( 若是換段落則應直接結束 <p> 標籤接下一個新的 ) ，而不應該間隔元素間的間距。
3. 標籤三：<video> 嵌入影片標籤，可制定影片想放置的大小 (width/height)，以及來源和型態 (source/type)。
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
</video>

## 請問什麼是盒模型（box modal）
表示為一個矩形的盒子，可以在 CSS裡面使用：外邊距 (margin)、邊框 (border)、內邊距 (padding)、內容 (content) 來編輯屬性。
 
## 請問 display: inline, block 跟 inline-block 的差別是什麼？
1. display : inline -- 可以使兩個元素連在一起，在同一行呈現
2. display : block -- 使下一個元素換到下一行，並不會相連在一起，每個元素會將整行的寬度佔滿
3. display : inline-block -- 可以用字面上的意思來聯想，表示整體是 inline 但是各自是 block，此時元素不會換行，會在同一行呈現，但是又可以設定 padding, width, height 等。 

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
1. static -- 為預設值，因此使用 positon: static; 的元素不會被定位，而是照著瀏覽器預設的配置自動排版。
2. relative -- 可以設定 top, botton, right, left 屬性，讓元素相對定位在定位點上，頁面的移動也不會影響元素的位置。
3. absolute -- 元素定位在它的上一層容器的相對位置，所以會以它的上一個容器的位置為主，來定位它的相對位置。
4. fixed -- 表示為固定定位，元素會固定在相同的位置，就算頁面移動也不會改變，同樣也可以用 top, botton, right, left 來修改位置。

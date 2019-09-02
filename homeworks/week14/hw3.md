## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
#### DNS
DNS (Domsin Name System / Domain Name Service)為一套可將網域名稱轉化成 IP 位址的系統，因此 DNS Server 就可稱作為執行這套系統的伺服器。
#### 對 Google 的好處
 - 使用者於網站輸入網址之後，伺服器需要藉由 IP Address 才能導向正確位址，因此一般的網址都需要經過這曾服務，由 DNS 轉換域名成 IP Address；而 Google 提供公開 DNS 服務 (Google Public DNS)，也在使用者藉由這項服務的過程中，蒐集大量相關資訊，例如需要大量被轉換的網址為哪些 ? 或是時間與地點的相關性。
#### 對一般大眾的好處
 - 若使用者本身的網路伺服器業者有任何的問題，導致無法成功使頁面導向，也可由 Google 提供的 DNS 伺服器轉向，速度與安全隱私上皆較穩定。
    *  Google Public DNS IPv4設定(1)：8.8.8.8
    *  Google Public DNS IPv4設定(2)：8.8.4.4


## 什麼是資料庫的 lock？為什麼我們需要 lock？
 - 在交易處理 (transaction) 中執行的一系列資料操作，需要遵守交易的不可分割性、一致性、隔離性以及持久性，而鎖定機制 (Lock) 就是為了實現交易的隔離性，使多筆交易在資料的寫入和讀取過程中不會互相影響。
 - 此機制在資料被寫入或讀取時會被加入 lock 標記，表示這筆資料正在被寫入或是讀取中。

 開啟 transaction
 ```
 $conn->begin_transaction();
 ```

 將執行 id = 0 的 row 進行 lock
 ```
 $stmt = $conn->prepare("SELECT amount from products where id = 0 for update");
 ```

 若要再次開啟時
 ```
 $conn->commit();
 ```

## NoSQL 跟 SQL 的差別在哪裡？
 - NoSQL 全名為 (Not only SQL)，是相對於傳統的關聯式資料庫 (如 SQL) 的非關聯式資料庫管理系統，最大的特點為採用 key-value 的資料結構，讓每一筆資料各自獨立，具有高擴充能力的特性。
 - NoSQL 資料庫通常可分割，因為 key-value 的存取模式可向外擴充，且存取比關聯式資料庫有更高的效能。
#### Reference
[什麼是 NoSQL](https://aws.amazon.com/tw/nosql/)


## 資料庫的 ACID 是什麼？
ACID 是指 DBMS 在寫入或是更新資料時，保證 transaction 是正確可靠的，其中包括四項特性：
 - 原子性 (atomicity): 不可分割性，表示執行若不是全變成功便是全部失敗。
 - 一致性 (consistency): 資料庫的完整性不被破壞。
 - 隔離性 (isolation): 獨立性，資料庫在允許同時多項 transaction 時，能夠防止因為執行時產生的交互作用而影響數據前後不一致。
 - 持久性 (durability): transaction 完成後，這項數據的修改就是永久保存，並不會不見或被改變。
 
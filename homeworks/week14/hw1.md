## Design URL Shortening service


 - 由 Client 端發出 request，Load Balancer 會平均分攤各伺服器的流量後傳送出去。
 - 此時若 cache 已有資料的話，server 會優先向 cache 查詢，若無資料則才會向正規 database 查詢。
 - 存入 batabase 的資料格式 ( 其一方式 ) 為：
 ```
Table Tiny_Url( 
ID : int PRIMARY_KEY AUTO_INC, 
Original_url : varchar, 
Short_url : varchar 
) 
``` 

## Reference
[Design URL Shortening service like TinyURL](https://leetcode.com/discuss/interview-question/124658/Design-a-URL-Shortener-(-TinyURL-)-System/)


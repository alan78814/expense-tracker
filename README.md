# 老爸的私房錢
簡易的支出記帳網站，可藉由登入帳密管理屬於自身的支出。

## 功能說明
- 使用者在首頁可一次瀏覽所有支出的清單。
- 使用者在首頁看到所有支出清單的總金額。
- 使用者可新增一筆支出。
- 使用者可編輯支出的所有屬性 (一次只能編輯一筆)。
- 使用者可刪除任何一筆支出 (一次只能刪除一筆)。
- 使用者可在首頁可以根據支出"類別"& "有支出之月份"篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## 環境建置
- Visual Studio Code:1.57.1
- Node.js:v10.15.0
- Express.js:4.17.1
- Express-handlebars:5.3.2
- Nodemon:2.0.7

## 安裝流程
請依照敘述於終端機輸入指令

1.開啟終端機將專案存至本機:
```
git clone https://github.com/alan78814/expense-tracker.git
```
2.設定環境變數檔案
將檔案 .env.example 檔名改為 .env。
若要使用 facebook login 功能，需要先到 Facebook for Developers:
https://developers.facebook.com/?locale=zh_TW 
取得應用程式編號/密鑰取代 .env 中 FACEBOOK_ID=SKIP / FACEBOOK_SECRET=SKIP 的 SKIP才可使用。

3.進入專案目錄
```
cd expense-tracker
```
4.安裝套件
```
npm install
```
5.加入種子資料
```
npm run seed
```
6.啟動專案
```
npm run dev
```
7.使用
終端機出現下列訊息" "App is running on http://localhost:3000"
可開啟瀏覽器輸入 http://localhost:3000 使用

8.預設使用者 Seed User
加入種子資料後，可使用下列預設帳號進行登入
- email: user1@example.com
- password: 123

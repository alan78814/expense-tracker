# 老爸的私房錢
簡易的支出記帳網站

## 功能說明
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

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
2.進入專案目錄
```
cd expense-tracker
```
3.安裝套件
```
npm install
```
4.加入種子資料
```
npm run seed
```
5.啟動專案
```
npm run dev
```
6.可開啟瀏覽器輸入http://localhost:3000 開始使用

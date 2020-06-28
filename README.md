# TodoList x MySQL(Sequelize)

這是一個利用 MySQL + Express + Node.js 所打造的 Todo List 專案

## 專案畫面

**登入畫面/LoginPage**
![專案畫面](/public/image/project_screenshot1.png)

**註冊畫面/RegisterPage**
![專案畫面](/public/image/project_screenshot2.png)

**首頁/MainPage**
![專案畫面](/public/image/project_screenshot3.png)

**修改畫面/EditPage**
![專案畫面](/public/image/project_screenshot4.png)

## 安裝&使用

#### 下載專案

```
git clone https://github.com/waiting33118/Todo-List-Sequelize.git
```

#### 安裝 Package

```
npm install
```

#### 建立 MySQL Connection(請在 WorkBench 裡操作 SQL 指令)

**預設密碼為 password**

```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```

#### 建立 Table & Schema (請在 VSCode 裡操作 Sequelize 指令)

```
npx sequelize db:migrate
```

#### 建立種子資料 (請在 VSCode 裡操作 Sequelize 指令)

```
npx sequelize db:seed:all
```

#### 使用 nodemon 啟動伺服器

```
npm run dev
```

#### 或正常啟動

```
npm start
```

#### 預設測試帳號 Default Testing Account

```
   email:  root@example.com
password:  12345678
```

## 環境建置

```
"node":"^12.18.1"
"bcryptjs": "^2.4.3",
"connect-flash": "^0.1.1",
"express": "^4.17.1",
"express-handlebars": "^4.0.4",
"express-session": "^1.17.1",
"method-override": "^3.0.0",
"mysql2": "^2.1.0",
"passport": "^0.4.1",
"passport-local": "^1.0.0",
"sequelize": "^6.1.1",
"sequelize-cli": "^6.0.0"
```

## 產品功能(User Story)

- 使用者可以**瀏覽**自己所有的待辦事項
- 使用者可以**新增**待辦事項
- 使用者可以**修改**待辦事項
- 使用者可以**刪除**待辦事項
- 遊客必須先註冊帳號才可使用此服務

## Contributor

- [x] TonyChung

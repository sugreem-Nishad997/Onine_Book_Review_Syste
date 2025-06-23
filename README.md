# 📚 Book Review Platform

A full stack application where users can browse books, read and write reviews, and rate books. Built using React for frontend and Node.js/Express with MongoDB for backend.

---

## 🚀 Live Demo

> [Live Demo URL](https://your-deployment-link.com) *(Add once deployed)*

---

## 🧰 Tech Stack

### 🔹 Frontend

* React.js
* React Router
* React Context
* Axios
* CSS , MUI and Bootstrap

### 🔹 Backend

* Node.js
* Express.js
* MongoDB with Mongoose 
* JWT for Authentication
* Bcrypt for Password Hashing

---

## ✨ Features

### 👤 Users

* Register / Login /Logout
* Browse, search, and filter books
* View individual book details
* Submit reviews and ratings
* Edit their profile

### 🛡️ Admin

* Add new books

### API Endpoints

## Books--

| Method | Endpoint     | Description            | Access |
| ------ | ------------ | ---------------------- | ------ |
| GET    | `/books`     | Get all books          | Public |
| GET    | `/books/:id` | Get book details by ID | Public |
| POST   | `/books`     | Add new book           | Admin  |

## Reviews--

| Method | Endpoint           | Description                | Access        |
| ------ | ------------------ | -------------------------- | ------------- |
| GET    | `/reviews?bookId=` | Get all reviews for a book | Public        |
| POST   | `/reviews?bookId=` | Add a new review           | Authenticated |

## Users--

| Method | Endpoint        | Description         | Access        |
| ------ | --------------- | ------------------- | ------------- |
| GET    | `/users/:id`    | Get user profile    | Authenticated |
| PUT    | `/users/:id`    | Update user profile | Authenticated |
| POST   | `/users/login`  | Login user profile  | Public        |
| POST   | `/users/register`| Register new user  | Public        |


🛠 Installation & Setup

Prerequisites

. Node.js (v16+)

. MongoDB (local or Atlas)

## Backend
cd server
npm install

## Create a .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

## Run the backend:
npm run dev

## Frontend:
cd client
npm install
npm run dev


## Future Improvements

.Admin dashboard to manage books and reviews

.Review edit and delete features

.Pagination and sorting

.OAuth via Google/GitHub

.Mobile responsive UI

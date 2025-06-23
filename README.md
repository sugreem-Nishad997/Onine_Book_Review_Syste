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
* Cloudinary for Image Upload

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
 cd backend
 npm install

## Create a .env file:
MONGO_URL=your_mongodb_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

## Run the backend:
npm run dev

## Frontend:
 cd frontend
 npm install

## Update in src/environment.js file:
change the value of IS_Prod=false

## Run the frontend
npm run dev

📂 Cloudinary Configuration

This project uses Cloudinary for handling image uploads (e.g., book cover images). To enable Cloudinary:

1. Sign up at https://cloudinary.com.

2. Go to your Dashboard and note the following:

   . CLOUD_NAME

   . API_KEY

   . API_SECRET

3. Add them to your .env file as shown above.

4. Use a Cloudinary upload utility in your backend to send images directly to the cloud.

## Future Improvements

.Admin dashboard to manage books and reviews

.Review edit and delete features

.Pagination and sorting

.OAuth via Google/GitHub

.Mobile responsive UI

# Node.js Blog Project

This project is a simple blog application built with **Node.js** for the backend and a frontend using  React. It includes user authentication, CRUD functionality for blogs, and dashboard features.

------------------------------------------------------------------------

## Features

### Authentication

-   User Registration (Email & Password)
-   Profile Image Upload
-   JWT-based Login

### Dashboard

-   Displays logged-in user information
-   Shows user profile image
-   Overview of user-created blogs

### Blog Management (CRUD)

Create\
- Add blog with title, image, and description

Read\
- View all blogs\
- View full blog details

Update\
- Edit blog title, image, and description

Delete\
- Delete blog with confirmation

Additional Feature\
- Add comments to blogs\
- Reply to comments\
- Data stored in MongoDB

------------------------------------------------------------------------

## Tech Stack

Backend\
- Node.js\
- Express.js\
- MongoDB\
- Mongoose\
- JWT\
- Multer

Frontend\
- React
- Tailwind

------------------------------------------------------------------------

## Installation & Setup

Clone the repository:

git clone https://github.com/AbhinandanDaksh/Vega6blog-task.git

Backend setup:

cd Vega6blog-task/backend\
npm install\
npm start

Frontend setup:

If using HTML/CSS/JS, open index.html in browser.\
If using React:

cd frontend\
npm install\
npm start

------------------------------------------------------------------------

## Environment Variables

Create a `.env` file inside backend folder and add:

PORT=5000\
MONGO_URI=your_mongodb_connection_string\
JWT_SECRET=your_secret_key

------------------------------------------------------------------------

## API Endpoints

Authentication\
POST /api/register\
POST /api/login

Blogs\
GET /api/blogs\
POST /api/blogs\
PUT /api/blogs/:id\
DELETE /api/blogs/:id

------------------------------------------------------------------------

## Developed By

Abhinandan Daksh\
GitHub: https://github.com/AbhinandanDaksh

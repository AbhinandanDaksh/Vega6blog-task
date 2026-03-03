# Node.js Blog Project

This project is a simple blog application built with **Node.js** for the backend and a frontend using HTML/CSS/JS (or React if used). It includes user authentication, CRUD functionality for blogs, and dashboard features.

---

## **Features**

### Authentication
- User Sign Up with email, password, and profile image upload
- Login with JWT token generation
- Protected routes for dashboard and blog management

### Dashboard
- Display logged-in user's profile image
- Quick overview of user's blogs

### Blog Management (CRUD)
- **Create:** Add blog with title, image, and description
- **Read:** Display all blogs in a table
- **Update:** Edit blog details
- **Delete:** Remove a blog with confirmation
- **View Full Blog:** Button to view complete blog content

### (Optional) Comments/Replies
- Users can leave comments and reply to specific comments
- Comments stored in the database

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/<repo-name>.git


cd backend
npm install
node server.js   # or npm start

cd frontend
npm install      # only if using React or build tools
npm start        # or open index.html in browser

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

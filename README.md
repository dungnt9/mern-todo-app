# MERN Stack Todo Application

This is a full-stack Todo application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to create, read, update, and delete todo items, with user authentication implemented using Google OAuth.

## Features

- User authentication with Google OAuth
- Create, read, update, and delete todo items
- Mark todos as completed
- Responsive design using Bootstrap

## Technologies Used

- Frontend:
  - React.js
  - Bootstrap for styling
  - Axios for API requests
  - @react-oauth/google for Google OAuth integration
- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose ODM
  - Cors for handling Cross-Origin Resource Sharing
  - Morgan for HTTP request logging

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm
- You have a MongoDB instance running (locally or a MongoDB Atlas cluster)
- You have obtained Google OAuth 2.0 credentials

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/mern-todo-app.git
   cd mern-todo-app
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install --force
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - In the `backend` folder, create a `.env` file and add your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```
   - In the `frontend` folder, create a `.env` file and add your Google OAuth Client ID:
     ```
     REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
     ```

4. Start the backend server:
   ```
   cd backend
   npm start
   ```

5. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to use the application.

## Demo Images

### Home Page
![Home Page](./Demo%20images/Home_Page.png)

### Create Task
![Create Task](./Demo%20images/Create.png)

### Update Task
![Update Task](./Demo%20images/Update.png)

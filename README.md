# MERN Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application.

## 🚀 Features

- User Authentication
- Dashboard
- CRUD Operations
- REST API
- MongoDB Database
- Responsive UI
- JWT Authentication
- Protected Routes

---

# 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# 🛠️ Prerequisites

Before running the project, make sure the following are installed:

- Node.js (v18 or later)
- npm or yarn
- MongoDB Atlas or Local MongoDB
- Git

Check versions:

```bash
node -v
npm -v
git --version
```
---

# ⚙️ Backend Setup

### Navigate to backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

### Start Backend Server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

Backend will run on:

```bash
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open a new terminal.

### Navigate to frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create `.env` file inside frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

### Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🗄️ MongoDB Setup

### Local MongoDB

```bash
mongodb://localhost:27017/database_name
```

### MongoDB Atlas

1. Create Atlas Cluster
2. Create Database User
3. Add IP Address
4. Copy Connection String

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

---

# 📦 Available Scripts

## Backend

```bash
npm run dev
```

Runs backend with Nodemon.

```bash
npm start
```

Runs backend server.

---

## Frontend

```bash
npm run dev
```

Runs React application.

```bash
npm run build
```

Builds production files.

```bash
npm run preview
```

Preview production build.

---

# 🔗 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```



# 👨‍💻 Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Redux Toolkit (Optional)
- Bootstrap / Tailwind CSS

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- mongoose

### Database

- MongoDB

---

# 🚀 Deployment

## Frontend (Vercel)

```bash
npm run build
```

Deploy build folder to Vercel.

---

## Backend (Render)

1. Push code to GitHub
2. Connect GitHub Repository
3. Add Environment Variables
4. Deploy

---

# 🤝 Contributing

1. Fork Repository
2. Create Feature Branch

```bash
git checkout -b feature-name
```

3. Commit Changes

```bash
git commit -m "Added new feature"
```

4. Push Changes

```bash
git push origin feature-name
```

5. Create Pull Request

---


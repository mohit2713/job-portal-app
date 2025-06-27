# 🧑‍💼 Job Portal Web App (Developing Phase)
# Demo link: https://tubular-lollipop-16e892.netlify.app/


A Full-stack job portal application built using **React (with Parcel)** on the frontend and **Node.js + Express + MongoDB** on the backend. This project is aimed at helping users view and apply for jobs, and companies to post job listings.

---

## 🛠️ Tech Stack

### ✅ Frontend (src/Components)
- **React** – Component-based UI
- **Parcel** – Bundler for fast dev builds
- **Tailwind CSS** – Utility-first styling
- **Fetch** – For making HTTP requests

### ✅ Backend (server/)
- **Node.js** – JavaScript runtime
- **Express** – Minimal web framework for APIs
- **mongoose**: Model MongoDB data in Node.
- **CORS** – Cross-origin support
- **dotenv** – Manage environment variables
- **bcryptjs** – Hash passwords securely for storage.
- **jsonwebtoken**: Create and verify user tokens.
---
## 📌 Features

- 🔍 View job listings
- 📡 Connect React frontend to Express API
- 🧩 Modular backend structure
- 🧑‍🎓 Beginner-friendly full-stack setup
- 🎯 Built as part of Mohit's personal learning & portfolio project

---

## Backend Structure

server/
├── config/
│   └── db.js           # MongoDB connection setup
├── models/
│   ├── User.js         # Schema for users (candidates/recruiters)
│   └── Job.js          # Schema for job posts
├── routes/
│   ├── auth.js         # Handles signup/login routes
│   └── jobs.js         # Handles job listing/posting
├── .env                # Stores MongoDB URI and secret key
└── index.js            # Entry point - sets up server, routes, DB



## 🙋‍♂️ Author

**Mohit Kashyap**
Frontend Developer | React Enthusiast | Learning Full Stack




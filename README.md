# 🎓 Classroom Helper App

A full-stack web application for managing teachers, students, assignments, and submissions. Built with Flask, PostgreSQL, and a React frontend.

## 🚀 Features

### ✅ Teachers
- Add, edit, and delete teachers
- Form validation using Formik + Yup

### ✅ Students
- Add, edit, and delete students
- Validation with Yup
- Responsive student list view

### ✅ Assignments
- Assign assignments to teachers
- Edit title & description
- Delete assignments

### ✅ Submissions
- Students can submit work for assignments
- Teachers can edit grades and feedback
- Full CRUD support with validation

---

## 📂 Project Structure

project-root/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/ # Shared display components
│ │ ├── forms/ # Formik forms with Yup validation
│ │ ├── list-items/ # ListItem components for CRUD
│ │ ├── pages/ # React Router pages
│ │ └── App.jsx
│ └── ...
├── server/ # Flask Backend
│ ├── models/ # SQLAlchemy models
│ ├── routes/ # Flask Blueprints
│ └── app.py # Entry point
└── README.md

yaml
Copy code

---

## ⚙️ Tech Stack

- **Frontend:** React, React Router, Formik, Yup
- **Backend:** Flask, SQLAlchemy, Marshmallow, Flask-Migrate
- **Database:** PostgreSQL

---

## 🧪 API Endpoints (Flask)

| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| GET    | `/api/teachers`             | List all teachers                 |
| POST   | `/api/teachers`             | Add new teacher                   |
| PATCH  | `/api/teachers/<id>`        | Edit a teacher                    |
| DELETE | `/api/teachers/<id>`        | Delete a teacher                  |
| GET    | `/api/students`             | List all students                 |
| POST   | `/api/students`             | Add new student                   |
| PATCH  | `/api/students/<id>`        | Edit a student                    |
| DELETE | `/api/students/<id>`        | Delete a student                  |
| GET    | `/api/assignments`          | List all assignments              |
| POST   | `/api/assignments`          | Create assignment                 |
| PATCH  | `/api/assignments/<id>`     | Edit assignment                   |
| DELETE | `/api/assignments/<id>`     | Delete assignment                 |
| GET    | `/api/submissions`          | List all submissions              |
| POST   | `/api/submissions`          | Submit assignment                 |
| PATCH  | `/api/submissions/<id>`     | Edit submission (grade/feedback)  |
| DELETE | `/api/submissions/<id>`     | Delete submission                 |

---

## 📦 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/Zayelle/Classroom-helper.git
cd classroom-helper

2. Backend Setup (Flask + PostgreSQL)
bash
cd server
pipenv install
createdb classroom_helper_dev
pipenv run flask db upgrade
pipenv run flask run
Make sure you configure config.py or .env for your database URL.

3. Frontend Setup (React)
bash
cd client
npm install
npm run dev
Make sure vite.config.js or package.json includes proxy for /api.

✨ Highlights
Built with modular and scalable structure

Real-time list updates after create/edit/delete

Optimized form UX with validation and error handling

Clear separation of concerns (API vs UI)



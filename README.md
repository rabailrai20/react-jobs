# React Jobs Portal

A full-stack-inspired React Job Portal built as an internship project. The application allows job seekers to browse and apply for jobs, while employers can securely log in, post jobs, and manage their own listings. All data is stored in an in-browser SQLite database using **sql.js** and persisted with **Local Storage**.

---

## Features

### Job Seeker

- Browse all available jobs
- View complete job details
- Filter Part-Time jobs
- Apply for jobs
- Submit:
  - Full Name
  - Email
  - Resume Link
- Applications are stored in the SQLite database

### Employer

- Employer Login
- Employer Dashboard
- Add new jobs
- View previously posted jobs
- View applications received for their jobs
- Jobs are linked to the logged-in employer

### General

- SQLite database running completely in the browser using sql.js
- Database persistence using Local Storage
- React Router navigation
- Responsive UI with Tailwind CSS
- Loading Spinner
- Custom 404 Page
- Component-based architecture

---

## Technologies Used

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Icons
- SQL.js
- SQLite
- Local Storage
- JavaScript (ES6)

---

## Project Structure

```
src
│
├── Components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── JobList.jsx
│   ├── JobListing.jsx
│   ├── Spinner.jsx
│   ├── Filter.jsx
│
├── Layouts
│   └── MainLayout.jsx
│
├── Pages
│   ├── HomePage.jsx
│   ├── JobsPage.jsx
│   ├── JobPage.jsx
│   ├── AddJob.jsx
│   ├── EmployerDashboard.jsx
│   ├── EmployerPage.jsx
│   └── NotFoundPage.jsx
│
├── Services
│   └── database.js
│
├── jobs.json
│
└── App.jsx
```

---

## Database

This project uses **sql.js**, allowing SQLite to run entirely inside the browser.

Three tables are created automatically:

### Employers

| Field | Type |
|-------|------|
| employerid | INTEGER |
| emailid | TEXT |
| password | TEXT |

---

### Jobs

| Field | Type |
|-------|------|
| id | INTEGER |
| title | TEXT |
| type | TEXT |
| description | TEXT |
| location | TEXT |
| salary | TEXT |
| employerid | INTEGER |

---

### Applications

| Field | Type |
|-------|------|
| applicationid | INTEGER |
| jobid | INTEGER |
| name | TEXT |
| email | TEXT |
| resumeLink | TEXT |

---

## Persistence

The SQLite database is exported and saved into **Local Storage** after every change.

This means:

- Newly added jobs remain after refreshing the page.
- Applications remain after refreshing.
- Employer data remains available.
- No backend server is required.

---

## Routing

| Route | Description |
|--------|-------------|
| `/` | Home Page |
| `/jobs` | Browse Jobs |
| `/jobs/:id` | Job Details & Apply |
| `/add-job` | Add New Job |
| `/employer/login` | Employer Login |
| `/employer/dashboard` | Employer Dashboard |
| `*` | 404 Page |

---

## Employer Accounts

Two demo employer accounts are available.

### Employer 1

Email

```
admin@gmail.com
```

Password

```
1234
```

---

### Employer 2

Email

```
hr@gmail.com
```

Password

```
5678
```

Each employer only sees:

- Their own posted jobs
- Applications submitted to their jobs

---

## Installation

Clone the repository

```bash
git clone https://github.com/rabailrai20/react-jobs.git
```

Navigate into the project

```bash
cd react-jobs
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

## Dependencies

- React
- React DOM
- React Router DOM
- React Icons
- React Spinners
- Tailwind CSS
- SQL.js
- Vite

---

## Future Improvements

- Employer Registration
- Applicant Dashboard
- Resume Upload
- Search by Keywords
- Filter by Location
- Salary Range Filter
- Company Profiles
- Authentication using JWT
- Backend using Node.js & Express
- MySQL/PostgreSQL Integration

---

## Learning Outcomes

Through this project I learned:

- React Component Architecture
- React Hooks (`useState`, `useEffect`)
- React Router
- Tailwind CSS
- SQL.js
- SQLite Database Design
- CRUD Operations
- SQL Queries
- Local Storage Persistence
- Form Handling
- Client-side Authentication
- State Management
- Conditional Rendering

---

## Author

**Rabail Rai**

BS Computer Science

University of Lahore

GitHub

https://github.com/rabailrai20

---

## License

This project was developed for educational and internship purposes.

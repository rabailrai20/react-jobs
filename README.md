# React Jobs Portal

A modern React-based job portal built as an internship project. The application allows users to browse jobs, view detailed job information, filter part-time jobs, and manage job listings using an in-browser SQLite database powered by **sql.js**.

---

## Features

- Browse all available jobs
- View detailed information for each job
- Filter jobs by Part-Time positions
- Multi-page navigation using React Router
- Responsive UI with Tailwind CSS
- SQLite database running in the browser using sql.js
- Loading spinner while data is fetched
- 404 Not Found page
- Add Job page (extendable)
- Clean and reusable React components

---

## Technologies Used

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Icons
- SQL.js (SQLite compiled to WebAssembly)
- JavaScript (ES6+)

---

## Project Structure

```
src/
│
├── Components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── JobList.jsx
│   ├── JobListing.jsx
│   ├── Spinner.jsx
│   ├── Filter.jsx
│   └── ...
│
├── Layouts/
│   └── MainLayout.jsx
│
├── Pages/
│   ├── HomePage.jsx
│   ├── JobsPage.jsx
│   ├── JobPage.jsx
│   ├── AddJob.jsx
│   └── NotFoundPage.jsx
│
├── Services/
│   └── database.js
│
├── jobs.json
│
└── App.jsx
```

---

## Database

This project uses **sql.js**, allowing SQLite to run directly in the browser without a backend server.

### Database Initialization

When the application starts:

1. SQLite is initialized.
2. A `jobs` table is created if it does not already exist.
3. Data from `jobs.json` is inserted into the database.
4. Components retrieve data using SQL queries instead of API calls.

Example SQL query:

```sql
SELECT * FROM jobs;
```

Retrieve a single job:

```sql
SELECT * FROM jobs
WHERE id = ?;
```

---

## Routing

| Route | Description |
|--------|-------------|
| `/` | Home Page |
| `/jobs` | Browse all jobs |
| `/jobs/:id` | Job Details |
| `/add-job` | Add Job Page |
| `*` | 404 Not Found |

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

Start the development server

```bash
npm run dev
```

---

## Dependencies

- react
- react-dom
- react-router-dom
- react-icons
- react-spinners
- tailwindcss
- sql.js
- vite

---

## Future Improvements

- Add Job functionality
- Edit existing jobs
- Delete jobs
- Persistent database storage
- Search jobs by keyword
- Filter by location
- Salary filtering
- Company profile page

---

## Learning Outcomes

Through this project I learned:

- React component architecture
- React Hooks (`useState`, `useEffect`)
- React Router
- Tailwind CSS
- Conditional rendering
- State management
- SQLite database concepts
- SQL queries (SELECT, INSERT, UPDATE, DELETE)
- Using SQL.js with React
- Managing application data without a backend

---

## Author

**Rabail Rai**

BS Computer Science  
University of Lahore

GitHub: https://github.com/rabailrai20

---

## License

This project was developed for learning and internship purposes.
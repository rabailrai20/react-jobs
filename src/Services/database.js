import initSqlJs from "sql.js";
import jobs from "../jobs.json";

let db;

// ======================
// SAVE DATABASE
// ======================

function saveDatabase() {
  const data = db.export();

  localStorage.setItem(
    "jobsDB",
    JSON.stringify(Array.from(data))
  );
}

// ======================
// INITIALIZE DATABASE
// ======================

export async function initializeDatabase() {
  const SQL = await initSqlJs({
    locateFile: () => "/sql-wasm.wasm",
  });

  const savedDB = localStorage.getItem("jobsDB");

  if (savedDB) {
    const uint8Array = Uint8Array.from(
      JSON.parse(savedDB)
    );

    db = new SQL.Database(uint8Array);

    return db;
  }

  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS employers(
      employerid INTEGER PRIMARY KEY AUTOINCREMENT,
      emailid TEXT UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      type TEXT,
      description TEXT,
      location TEXT,
      salary TEXT,
      employerid INTEGER,
      FOREIGN KEY(employerid)
      REFERENCES employers(employerid)
    );

    CREATE TABLE IF NOT EXISTS applications(
      applicationid INTEGER PRIMARY KEY AUTOINCREMENT,
      jobid INTEGER,
      name TEXT,
      email TEXT,
      resumeLink TEXT,
      FOREIGN KEY(jobid)
      REFERENCES jobs(id)
    );
  `);

  // ======================
  // DEFAULT EMPLOYERS
  // ======================

  db.run(`
    INSERT INTO employers(emailid,password)
    VALUES
    ('admin@gmail.com','1234'),
    ('hr@gmail.com','5678');
  `);

  // ======================
  // DEFAULT JOBS
  // ======================

  jobs.Jobs.forEach((job) => {
    db.run(
      `
      INSERT INTO jobs
      (
        id,
        title,
        type,
        description,
        location,
        salary,
        employerid
      )
      VALUES(?,?,?,?,?,?,?)
      `,
      [
        Number(job.id),
        job.title,
        job.type,
        job.description,
        job.location,
        job.salary,
        1,
      ]
    );
  });

  saveDatabase();

  return db;
}

// ======================
// DATABASE
// ======================

export function getDatabase() {
  return db;
}

// ======================
// JOBS
// ======================

export function getAllJobs() {
  const result = db.exec("SELECT * FROM jobs");

  if (result.length === 0) return [];

  return result[0].values.map((row) => ({
    id: row[0],
    title: row[1],
    type: row[2],
    description: row[3],
    location: row[4],
    salary: row[5],
    employerid: row[6],
  }));
}

export function getJobById(id) {
  const result = db.exec(
    `SELECT * FROM jobs WHERE id=${Number(id)}`
  );

  if (result.length === 0) return null;

  const row = result[0].values[0];

  return {
    id: row[0],
    title: row[1],
    type: row[2],
    description: row[3],
    location: row[4],
    salary: row[5],
    employerid: row[6],
  };
}

export function addJob(job, employerid) {
  db.run(
    `
    INSERT INTO jobs
    (
      title,
      type,
      description,
      location,
      salary,
      employerid
    )
    VALUES (?,?,?,?,?,?)
    `,
    [
      job.title,
      job.type,
      job.description,
      job.location,
      job.salary,
      employerid,
    ]
  );

  saveDatabase();
}

export function updateJob(job) {
  db.run(
    `
    UPDATE jobs
    SET
      title=?,
      type=?,
      description=?,
      location=?,
      salary=?
    WHERE id=?
    `,
    [
      job.title,
      job.type,
      job.description,
      job.location,
      job.salary,
      Number(job.id),
    ]
  );

  saveDatabase();
}

export function deleteJob(id) {
  db.run(
    `DELETE FROM jobs WHERE id=?`,
    [Number(id)]
  );

  saveDatabase();
}

export function getJobsByEmployer(employerid) {
  const result = db.exec(
    `SELECT * FROM jobs WHERE employerid=${Number(employerid)}`
  );

  if (result.length === 0) return [];

  return result[0].values.map((row) => ({
    id: row[0],
    title: row[1],
    type: row[2],
    description: row[3],
    location: row[4],
    salary: row[5],
    employerid: row[6],
  }));
}

// ======================
// EMPLOYERS
// ======================

export function loginEmployer(email, password) {
  const result = db.exec(
    `
    SELECT *
    FROM employers
    WHERE emailid='${email}'
    AND password='${password}'
    `
  );

  if (result.length === 0) return null;

  const row = result[0].values[0];

  return {
    employerid: row[0],
    emailid: row[1],
  };
}

// ======================
// APPLICATIONS
// ======================

// ======================
// APPLICATIONS
// ======================

export function addApplication(application) {
  db.run(
    `
    INSERT INTO applications
    (
      jobid,
      name,
      email,
      resumeLink
    )
    VALUES (?,?,?,?)
    `,
    [
      Number(application.jobid),
      application.name,
      application.email,
      application.resumeLink,
    ]
  );

  saveDatabase();
}

export function getApplicationsByJob(jobid) {
  const result = db.exec(
    `SELECT * FROM applications WHERE jobid=${Number(jobid)}`
  );

  if (result.length === 0) return [];

  return result[0].values.map((row) => ({
    applicationid: row[0],
    jobid: row[1],
    name: row[2],
    email: row[3],
    resumeLink: row[4],
  }));
}

export function getAllApplications() {
  const result = db.exec("SELECT * FROM applications");

  if (result.length === 0) return [];

  return result[0].values.map((row) => ({
    applicationid: row[0],
    jobid: row[1],
    name: row[2],
    email: row[3],
    resumeLink: row[4],
  }));
}

export function getApplicationsByEmployer(employerid) {
  const result = db.exec(`
    SELECT
      applications.applicationid,
      applications.jobid,
      applications.name,
      applications.email,
      applications.resumeLink,
      jobs.title
    FROM applications
    JOIN jobs
      ON applications.jobid = jobs.id
    WHERE jobs.employerid = ${Number(employerid)}
  `);

  if (result.length === 0) return [];

  return result[0].values.map((row) => ({
    applicationid: row[0],
    jobid: row[1],
    name: row[2],
    email: row[3],
    resumeLink: row[4],
    jobTitle: row[5],
  }));
}
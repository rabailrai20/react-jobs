import initSqlJs from "sql.js";
import jobs from "../jobs.json";

let db;

export async function initializeDatabase() {
const SQL = await initSqlJs({
  locateFile: () => "/sql-wasm.wasm",
});

  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY,
      title TEXT,
      type TEXT,
      description TEXT,
      location TEXT,
      salary TEXT,
      company TEXT,
      companyDescription TEXT,
      contactEmail TEXT,
      contactPhone TEXT
    );
  `);

  const count = db.exec("SELECT COUNT(*) FROM jobs");

  if (count[0].values[0][0] === 0) {
    jobs.Jobs.forEach((job) => {
      db.run(
        `
        INSERT INTO jobs (
          id,
          title,
          type,
          description,
          location,
          salary,
          company,
          companyDescription,
          contactEmail,
          contactPhone
        )
        VALUES (?,?,?,?,?,?,?,?,?,?)
      `,
        [
          Number(job.id),
          job.title,
          job.type,
          job.description,
          job.location,
          job.salary,
          job.company.name,
          job.company.description,
          job.company.contactEmail,
          job.company.contactPhone,
        ]
      );
    });
  }

  return db;
}

export function getDatabase() {
  return db;
}


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
    company: {
      name: row[6],
      description: row[7],
      contactEmail: row[8],
      contactPhone: row[9],
    },
  }));
}


export function getJobById(id) {
  const result = db.exec(
    `SELECT * FROM jobs WHERE id = ${Number(id)}`
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
    company: {
      name: row[6],
      description: row[7],
      contactEmail: row[8],
      contactPhone: row[9],
    },
  };
}
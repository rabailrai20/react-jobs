import initSqlJs from "sql.js";
import jobs from "../jobs.json";

let db;

export async function initializeDatabase() {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      `https://sql.js.org/dist/${file}`,
  });

  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS jobs(
      id INTEGER PRIMARY KEY,
      title TEXT,
      company TEXT,
      location TEXT,
      type TEXT,
      description TEXT
    );
  `);

  // Prevent duplicate inserts if initializeDatabase() is called again
  const count = db.exec("SELECT COUNT(*) FROM jobs");

  if (count[0].values[0][0] === 0) {
    jobs.forEach((job) => {
      db.run(
        `
        INSERT INTO jobs
        (id,title,company,location,type,description)
        VALUES(?,?,?,?,?,?)
        `,
        [
          job.id,
          job.title,
          job.company,
          job.location,
          job.type,
          job.description,
        ]
      );
    });
  }

  return db;
}

export function getDatabase() {
  return db;
}
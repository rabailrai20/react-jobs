import JobList from "./JobList";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { getDatabase } from "../Services/database";

const JobListing = ({ ShowPartTime }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const db = getDatabase();

        if (!db) {
          console.log("Database not initialized.");
          return;
        }

        const result = db.exec("SELECT * FROM jobs");

        if (result.length > 0) {
          const rows = result[0].values;

const jobData = rows.map((row) => ({
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

          setJobs(jobData);
        }
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) => !ShowPartTime || job.type === "Part-Time"
  );

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobList key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListing;
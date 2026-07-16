import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getJobsByEmployer,
  getApplicationsByEmployer,
} from "../Services/database";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const employerid = Number(localStorage.getItem("employerid"));

    if (!employerid) {
      navigate("/employer/login");
      return;
    }

    setJobs(getJobsByEmployer(employerid));
    setApplications(getApplicationsByEmployer(employerid));

  }, [navigate]);

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Employer Dashboard
      </h1>

      <button
        onClick={() => navigate("/add-job")}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        + Add New Job
      </button>

      {/* Posted Jobs */}

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          My Posted Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500">
            No jobs posted yet.
          </p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 mb-4"
            >
              <h3 className="text-xl font-bold">
                {job.title}
              </h3>

              <p>{job.type}</p>

              <p>{job.location}</p>

              <p>{job.salary}</p>

              <Link
                to={`/jobs/${job.id}`}
                className="text-indigo-600 hover:underline"
              >
                View Job
              </Link>
            </div>
          ))
        )}

      </div>

      {/* Applications */}

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Applications Received
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-500">
            No applications received yet.
          </p>
        ) : (
          applications.map((application) => (
            <div
              key={application.applicationid}
              className="border rounded-lg p-4 mb-4 bg-gray-50"
            >
              <h3 className="text-xl font-bold mb-2">
                {application.jobTitle}
              </h3>

              <p>
                <strong>Name:</strong> {application.name}
              </p>

              <p>
                <strong>Email:</strong> {application.email}
              </p>

              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={application.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline"
                >
                  View Resume
                </a>
              </p>
            </div>
          ))
        )}

      </div>
    </section>
  );
};

export default EmployerDashboard;
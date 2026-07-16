import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getJobById,
  addApplication,
} from "../Services/database";
import Spinner from "../components/Spinner";

const JobPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    const foundJob = getJobById(id);
    setJob(foundJob);
    setLoading(false);
  }, [id]);

  const handleApply = (e) => {
    e.preventDefault();

    addApplication({
      jobid: job.id,
      name,
      email,
      resumeLink,
    });

    alert("Application Submitted Successfully!");

    setName("");
    setEmail("");
    setResumeLink("");
    setShowForm(false);
  };

  if (loading) return <Spinner loading={loading} />;

  if (!job) return <h1>Job not found</h1>;

  return (
    <div className="max-w-4xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold">
          {job.title}
        </h1>

        <p className="text-indigo-600 mt-2">
          {job.type}
        </p>

        <p className="mt-4 text-gray-700">
          {job.description}
        </p>

        <p className="mt-4 font-semibold">
          📍 {job.location}
        </p>

        <p className="text-green-600 text-xl font-bold mt-2">
          {job.salary}
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Apply Now
        </button>

        {showForm && (
          <form
            onSubmit={handleApply}
            className="mt-8 border rounded-xl p-6 bg-gray-50"
          >

            <h2 className="text-2xl font-bold mb-5">
              Job Application
            </h2>

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block mb-2 font-semibold">
              Resume Link
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3 mb-6"
              placeholder="Paste your resume link"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Submit Application
            </button>

          </form>
        )}

      </div>

    </div>
  );
};

export default JobPage;
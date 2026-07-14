import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getJobById } from "../services/database";

const JobPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = getJobById(id);
      setJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <Spinner loading={loading} />;

  if (!job) return <h1>Job not found</h1>;

  return (
    <section className="container mx-auto py-10 px-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

        <p className="text-indigo-600 font-semibold mb-2">
          {job.type}
        </p>

        <p className="text-gray-600 mb-4">
          📍 {job.location}
        </p>

        <p className="text-xl font-bold text-green-600 mb-6">
          {job.salary}
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Job Description
        </h2>

        <p className="text-gray-700 mb-8">
          {job.description}
        </p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">
          Company Information
        </h2>

        <p className="font-bold">
          {job.company.name}
        </p>

        <p className="mt-2">
          {job.company.description}
        </p>

        <p className="mt-4">
          <strong>Email:</strong> {job.company.contactEmail}
        </p>

        <p>
          <strong>Phone:</strong> {job.company.contactPhone}
        </p>
      </div>
    </section>
  );
};

export default JobPage;
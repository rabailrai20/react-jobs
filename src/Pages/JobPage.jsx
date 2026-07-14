import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../Services/database";
import Spinner from "../components/Spinner";

const JobPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundJob = getJobById(id);
    setJob(foundJob);
    setLoading(false);
  }, [id]);

  if (loading) return <Spinner loading={loading} />;

  if (!job) return <h1>Job not found</h1>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <p className="text-gray-500 mt-2">{job.type}</p>

      <p className="mt-4">{job.description}</p>

      <p className="mt-4 font-semibold">{job.location}</p>

      <p className="text-indigo-600">{job.salary}</p>
    </div>
  );
};

export default JobPage;
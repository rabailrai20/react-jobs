import { addJob, getAllJobs} from "../Services/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  const employerid = Number(localStorage.getItem("employerid"));

  if (!employerid) {
    alert("Please login first.");
    navigate("/employer/login");
    return;
  }

  const job = {
    title,
    type,
    description,
    location,
    salary,
  };

  addJob(job, employerid);

  console.log(getAllJobs());

  alert("Job Added Successfully!");

  // Clear the form
  setTitle("");
  setType("");
  setLocation("");
  setSalary("");
  setDescription("");

  // Go to Browse Jobs
  navigate("/jobs", { replace: true });
};

  return (
    <section className="container m-auto py-10">
      <div className="bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold mb-6">
          Add New Job
        </h1>

        <form onSubmit={handleSubmit}>

          <label className="block mb-2 font-semibold">
            Job Title
          </label>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Job Type
          </label>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Location
          </label>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Salary
          </label>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            className="w-full border rounded-lg p-3 mb-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
            type="submit"
          >
            Add Job
          </button>

        </form>

      </div>
    </section>
  );
};

export default AddJobPage;
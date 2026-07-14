import JobList from "./JobList";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const JobListing = ({ ShowPartTime }) => {
  const [jobs, setjobs] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchjobs = async () => {
      try {
        const res = await fetch("/api/Jobs");
        const data = await res.json();

        console.log(data); // Debugging

        setjobs(data);
      } catch (error) {
        console.log("Error in fetching", error);
      } finally {
        setloading(false);
      }
    };

    fetchjobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) => !ShowPartTime || job.type === "Part-Time"
    
  );
  const displayedJobs = ShowPartTime
  ? filteredJobs
  : filteredJobs.slice(0, 3);

  console.log(filteredJobs); // Debugging

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>

        
          {loading ? (
          <Spinner loading = {loading}/> ):(
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedJobs.map((job) => (
            <JobList key={job.id} job={job} />
          ))}
          </div>
          )}
          {/* // {filteredJobs.map((job) => ( */}
          {/* //   <JobList key={job.id} job={job} />
          // ))} */}
      </div>
    </section>
  );
};

export default JobListing;
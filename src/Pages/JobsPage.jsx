import Filter from "../components/Filter";
import JobListing from "../components/JobListing";

const JobsPage = ({ ShowPartTime, setShowPartTime }) => {
  return (
    <>
      <Filter
        ShowPartTime={ShowPartTime}
        setShowPartTime={setShowPartTime}
      />

      <JobListing
        ShowPartTime={ShowPartTime}
      />
    </>
  );
};

export default JobsPage;
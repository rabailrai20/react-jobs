import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobListing from "../components/JobListing";
import Alljobs from "../components/Alljobs";
import Filter from "../components/Filter";

const HomePage = ({ShowPartTime,setShowPartTime}) => {
  return (
    <>
   <Hero
  title="REACT JOBS"
  subtitle="Find your desired job."
/> 
<HomeCards />
<Filter 
ShowPartTime = {ShowPartTime}
setShowPartTime={setShowPartTime}  
/>
<JobListing 
ShowPartTime = {ShowPartTime} />
      <Alljobs />
</>
 )
}

export default HomePage
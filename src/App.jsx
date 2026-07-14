// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Avatar from "./components/Avatar";
// import HomeCards from "./components/HomeCards";
// import JobListing from "./components/JobListing";
// import Alljobs from "./components/Alljobs";
// import Filter from "./components/Filter";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import { useState, useEffect } from "react";
import { initializeDatabase } from "./services/database";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider}
  from 'react-router-dom'
import JobPage from "./Pages/JobPage";
import NotFoundPage from "./Pages/NotFoundPage";

const App = () => {
  const [ShowPartTime,setShowPartTime]  = useState(false);
  
  const router = createBrowserRouter(
  createRoutesFromElements(<Route path = '/' element = {<MainLayout />}>
    <Route index
     element = {<HomePage
      ShowPartTime={ShowPartTime}
      setShowPartTime={setShowPartTime} />}/>
    <Route path = '/jobs/:id'
    element = {<JobPage/>}/>
    <Route path = '*'
    element = {<NotFoundPage />} />

    </Route>
  )
);
  useEffect (() =>
  {
      initializeDatabase();
  },[])  
  return <RouterProvider router = {router} />;
};


export default App;

//    <>
//     <Navbar />
//    <Hero
//   title="REACT JOBS"
//   subtitle="Find your desired job."
// />
// <Avatar />
// <HomeCards />
// <Filter 
// ShowPartTime = {ShowPartTime}
// setShowPartTime={setShowPartTime}  
// />
// <JobListing 
// ShowPartTime = {ShowPartTime} />
//       <Alljobs />
//           </>
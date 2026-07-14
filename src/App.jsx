import JobsPage from "./Pages/JobsPage";
import AddJobPage from "./Pages/AddJob";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import JobPage from "./Pages/JobPage";
import NotFoundPage from "./Pages/NotFoundPage";

import { useState, useEffect } from "react";
import { initializeDatabase } from "./Services/database";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const [ShowPartTime, setShowPartTime] = useState(false);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
      setDbReady(true);
    };

    init();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <HomePage
              ShowPartTime={ShowPartTime}
              setShowPartTime={setShowPartTime}
            />
          }
        />

        <Route
          path="/jobs"
          element={
            <JobsPage
              ShowPartTime={ShowPartTime}
              setShowPartTime={setShowPartTime}
            />
          }
        />

        <Route path="/add-job" element={<AddJobPage />} />

        <Route path="/jobs/:id" element={<JobPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  if (!dbReady) {
    return <h1>Loading database...</h1>;
  }

  return <RouterProvider router={router} />;
};

export default App;
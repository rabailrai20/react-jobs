import { getDatabase } from "../Services/database";
import {Link } from "react-router-dom"

const Alljobs = () => {
  return (
<Link
        to="/jobs"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl
         hover:bg-gray-700"
        >
          View All Jobs</Link>  )
}

export default Alljobs;
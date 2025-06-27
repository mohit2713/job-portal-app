import { useEffect, useState } from "react";
// const API = import.meta.env.VITE_API_URL;

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // 🔁 loader

  const API = process.env.PARCEL_API_URL;
  console.log("API from env:", API);
  // console.log(import.meta.env);

  async function fetchData() {
    try {
      const res = await fetch(
        "https://job-portal-app-xfux.onrender.com/api/jobs"
      );
      // fetch(API + "/api/jobs")
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false); // after data is loaded
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-xl font-semibold text-blue-700">
          Loading, Please Wait...
        </p>
      </div>
    );
  }
  return (
    <div className="p-6 max-w- mx-aut">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🔍 Browse Job Listings
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer hover:scale-[1.02]"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {job.title}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {job.type}
            </p>
            <p className="text-sm text-gray-500 line-clamp-3">
              {job.description}
            </p>

            <button className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200">
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jobs;

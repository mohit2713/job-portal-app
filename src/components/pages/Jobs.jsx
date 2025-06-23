import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to load jobs:", err));
  }, []);

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  });

  const [loading, setLoading] = useState(false); // 🔁 Loader state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show loader
    try {
      const res = await fetch(
        "https://job-portal-app-xfux.onrender.com/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to post job");

      const data = await res.json();
      alert("✅ Job posted!");
      console.log(data);

      setForm({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
      });

      navigate("/");
    } catch (err) {
      alert("❌ Failed to post job");
      console.error(err);
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          value={form.company}
          required
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={form.location}
          required
        />
        <input
          name="type"
          placeholder="Job Type"
          onChange={handleChange}
          value={form.type}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          value={form.description}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Posting...
            </div>
          ) : (
            "Post Job"
          )}
        </button>
      </form>
    </div>
  );
}

export default PostJob;

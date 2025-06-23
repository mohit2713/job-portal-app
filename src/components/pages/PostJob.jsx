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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5050/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to post job");

      const data = await res.json();
      alert("✅ Job posted!");
      console.log(data);

      // ✅ Clear the form
      setForm({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
      });

      // ✅ Redirect to home page
      navigate("/");
    } catch (err) {
      alert("❌ Failed to post job");
      console.error(err);
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
          required
        />
        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Job Type"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;

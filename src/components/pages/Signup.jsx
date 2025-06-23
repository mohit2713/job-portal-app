import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false); // 🔁 loader
  const navigate = useNavigate();
  const API = process.env.PARCEL_API_URL2;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show loader
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Signup successful!");
        navigate("/login");
        console.log(data);
      } else {
        alert("❌ Signup failed: " + data.msg);
      }
    } catch (err) {
      alert("Signup error");
      console.error(err);
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange}>
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          className="bg-blue-600 text-white p-2 rounded cursor-pointer disabled:opacity-60"
          type="submit"
          disabled={loading}
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
              Signing up...
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}

export default Signup;

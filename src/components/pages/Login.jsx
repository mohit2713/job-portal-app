import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // 🔁 loader state

  const API = process.env.PARCEL_API_URL2;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔁 Start loading
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate(data.user.role === "recruiter" ? "/post-job" : "/");
      } else {
        alert("❌ Login failed: " + data.msg);
      }
    } catch (err) {
      alert("Login error");
      console.error(err);
    } finally {
      setLoading(false); // 🔁 Stop loading
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Log In</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
              Logging in...
            </div>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <button
          className="text-blue-600 cursor-pointer"
          onClick={handleSignupRedirect}
        >
          Sign up here
        </button>
      </p>
    </div>
  );
}

export default Login;

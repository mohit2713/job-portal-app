import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  // 🔑 Use env variable for API
  const API = process.env.PARCEL_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // ✅ redirect to signup page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Login successful!");
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        if (data.user.role === "recruiter") {
          navigate("/post-job");
        } else {
          navigate("/");
        }
      } else {
        alert("❌ Login failed: " + data.msg);
      }
    } catch (err) {
      alert("Login error");
      console.error(err);
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
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">
          Log In
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

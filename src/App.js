import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostJob from "./components/pages/PostJob";
import Jobs from "./components/pages/Jobs";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  if (loading) return <div className="p-4">Loading...</div>; // spinner

  return (
    <>
      <nav className="p-4 bg-gray-200 flex gap-4 justify-end">
        <a href="/" className="text-blue-600">
          Home
        </a>
        <a href="/post-job" className="text-blue-600">
          Post Job
        </a>

        <a href="/about" className="text-blue-600">
          About
        </a>

        <a href="/contact" className="text-blue-600">
          Contact
        </a>

        {!user && (
          <>
            <a href="/login" className="text-blue-600">
              Login
            </a>
            {/* <a href="/signup" className="text-blue-600">
              Signup
            </a> */}
          </>
        )}
        {user && (
          <>
            <span className="text-gray-600">
              Hi, {user.name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 ml-2 cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route
            path="*"
            element={<h1 className="p-4">404 - Page not found</h1>}
          />
          <Route
            path="/post-job"
            element={
              user?.role === "recruiter" ? (
                <PostJob />
              ) : (
                <h1 className="p-4 text-red-600">
                  ❌ Access denied: Recruiter login required
                </h1>
              )
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

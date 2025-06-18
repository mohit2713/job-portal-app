import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostJob from "./components/pages/PostJob";
import Jobs from "./components/pages/Jobs";
// import Jobs from "./pages/Jobs"; // Assuming this lists jobs

function App() {
  return (
    <>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <a href="/" className="text-blue-600">
          Home
        </a>
        <a href="/post-job" className="text-blue-600">
          Post Job
        </a>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route
            path="*"
            element={<h1 className="p-4">404 - Page not found</h1>}
          />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

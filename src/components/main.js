import { useEffect, useState } from "react";

const Main = () => {
  const fetchApi = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/jobs");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <h1>Body</h1>
    </div>
  );
};

export default Main;

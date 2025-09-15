import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";   // ✅ no BrowserRouter here
import Welcome from "./Welcome";
import FormPage from "./FormPage";
import Affirmation from "./Affirmation";
import "./index.css";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <button className="dark-toggle" onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/affirmation" element={<Affirmation />} />
      </Routes>
    </>
  );
}

export default App;

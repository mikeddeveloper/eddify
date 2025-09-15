import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

function FormPage() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [selectedMoods, setSelectedMoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleNameSubmit = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(`Good morning, ${name}!`);
    else if (hour < 18) setGreeting(`Good afternoon, ${name}!`);
    else setGreeting(`Good evening, ${name}!`);
  };

  const handleMoodChange = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to affirmation page and pass name + moods
    navigate("/affirmation", {
      state: { name, moods: selectedMoods },
    });
  };

  const moods = ["Joyful", "Grateful", "Tired", "Anxious", "Hopeful", "Calm"];

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit} data-aos="fade-up">
        <FaSmile className="form-icon" />
        <h2>Let's Get Started</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameSubmit}
          required
        />

        {greeting && <h3>{greeting}</h3>}

        <div className="mood-section">
          <h3>Select your current mood</h3>
          <div className="mood-pills">
            {moods.map((mood) => (
              <label
                key={mood}
                className={`pill ${selectedMoods.includes(mood) ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  value={mood}
                  checked={selectedMoods.includes(mood)}
                  onChange={() => handleMoodChange(mood)}
                />
                {mood}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default FormPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Affirmation.css";
import { FaWhatsapp } from "react-icons/fa";
import affirm from "../data/affirm.json"; // import JSON

const Affirmation = () => {
  const location = useLocation();
  const { name, moods = [] } = location.state || {};
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const getRandomAffirmation = () => {
    setLoading(true);

    // Case-insensitive match for selected moods
    let filtered = affirm.filter(a =>
      moods.some(m => m.trim().toLowerCase() === a.mood.trim().toLowerCase())
    );

    // Fallback if no mood matches
    if (filtered.length === 0) filtered = affirm;

    // Pick a random mood from the filtered list
    const randomMood = filtered[Math.floor(Math.random() * filtered.length)];

    // Safe check for affirm array
    const affirmList = randomMood?.affirm;
    if (!affirmList || affirmList.length === 0) {
      setAffirmation("No affirmations available.");
      setLoading(false);
      return;
    }

    // Pick a random affirmation from the selected mood
    let randomAffirmation = affirmList[Math.floor(Math.random() * affirmList.length)];

    // Add the person's name at the start of the affirmation
    if (name) {
      randomAffirmation = `${name}, ${randomAffirmation}`;
    }

    setAffirmation(randomAffirmation);
    setLoading(false);
  };

  const shareOnWhatsApp = () => {
    if (!affirmation) return;
    const text = encodeURIComponent(affirmation);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="affirmation-container" data-aos="fade-up">
      <h1>Hello {name} 🌞</h1>
      {moods.length > 0 && (
        <p className="mood-text">
          We see you’re feeling <strong>{moods.join(", ")}</strong>
        </p>
      )}

      <button
        className="generate-btn"
        onClick={getRandomAffirmation}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Your Affirmation"}
      </button>

      {affirmation && (
        <div className="affirmation-box" data-aos="zoom-in">
          <p>{affirmation}</p> {/* Display the personalized affirmation */}
          <button className="share-btn" onClick={shareOnWhatsApp}>
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default Affirmation;

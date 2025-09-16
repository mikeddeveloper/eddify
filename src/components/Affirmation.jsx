import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import OpenAI from "openai";
import "./Affirmation.css";
import { FaWhatsapp } from "react-icons/fa";

const Affirmation = () => {
  const location = useLocation();
  const { name, moods = [] } = location.state || {};
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // allow frontend calls
  });

  const generateAffirmation = async () => {
    setLoading(true);
    try {
      const moodText = moods.length ? moods.join(", ") : "mixed emotions";

      const prompt = `Create a short, uplifting Christian affirmation for someone named ${name}, who is feeling ${moodText}. 
      Include 1-2 Bible verse references (just the references, like John 3:16) and end with “— eddiffy”.`;

      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const text = res.choices[0].message.content;
      setAffirmation(text);
    } catch (err) {
      console.error(err);
      setAffirmation("Oops, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
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
        onClick={generateAffirmation}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Your Affirmation"}
      </button>

      {affirmation && (
        <div className="affirmation-box" data-aos="zoom-in">
          <p>{affirmation}</p>
          <button className="share-btn" onClick={shareOnWhatsApp}>
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default Affirmation;
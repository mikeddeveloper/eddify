import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="welcome-page">
      <div className="welcome-card" data-aos="zoom-in">
        <div className="icon-wrapper" data-aos="fade-down">
          <Sparkles size={48} className="sparkle-icon" />
        </div>

        <h1 className="welcome-text" data-aos="fade-up">
          Welcome to <span className="ediffy">Ediffy</span>
        </h1>

        <p className="tagline" data-aos="fade-up" data-aos-delay="300">
          <BookOpen size={18} /> Daily scripture-based affirmations for your soul
        </p>

        <button
          className="start-btn"
          data-aos="fade-up"
          data-aos-delay="600"
          onClick={() => navigate("/form")}
        >
          Get Started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Welcome;

import { useEffect, useRef, useState } from "react";
import "./AppShowcase.css";

const SCREENSHOTS = {
  left: "https://cdn.prod.website-files.com/67472fb35e1a76e11cdbc7e0/677139e0501e8332b4df0738_lango-mockup-3.webp",
  center:
    "https://cdn.prod.website-files.com/67472fb35e1a76e11cdbc7e0/677139e13accc7fffbf89d73_lango-mockup-1.webp",
  right:
    "https://cdn.prod.website-files.com/67472fb35e1a76e11cdbc7e0/677139e0a8c08d2046ca164e_lango-mockup-2.webp",
};

export default function AppShowcase() {
  const stageRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRevealed(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="showcase-section">
      <div className="showcase-hero">
        <span className="showcase-eyebrow">Personal Finance, Reimagined</span>
        <h1 className="showcase-headline">
          Money moves
          <br />
          at your speed.
        </h1>
        <p className="showcase-body">
          Forma gives you total clarity over your finances — track spending,
          grow savings, and hit every goal with beautiful, intelligent insights
          built for the way you actually live.
        </p>
        <div className="store-badges">
          <img
            src="https://econceptual.com/wp-content/uploads/2025/07/AppStore-Icon-Black.png"
            alt="App Store"
          />
          <img
            src="https://econceptual.com/wp-content/uploads/2025/07/PlayStore-Icon-Black.png"
            alt="Play Store"
          />
        </div>
      </div>

      <div
        ref={stageRef}
        className={`app-stage${revealed ? " app-stage--revealed" : ""}`}
        aria-label="App screenshots"
      >
        <div className="app-glow" aria-hidden="true" />

        <div className="app-card app-card--left">
          <img src={SCREENSHOTS.left} alt="App screen left" draggable="false" />
        </div>
        <div className="app-card app-card--right">
          <img
            src={SCREENSHOTS.right}
            alt="App screen right"
            draggable="false"
          />
        </div>
        <div className="app-card app-card--center">
          <img
            src={SCREENSHOTS.center}
            alt="App screen center"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}

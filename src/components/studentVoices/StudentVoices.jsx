import { useState, useRef, useEffect } from "react";
import "./StudentVoices.css";

const students = [
  {
    id: 1,
    name: "Sahil Vijay",
    course: "Full Stack Dev",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    name: "Mouli Ritchie",
    course: "Data Science",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    name: "Harish",
    course: "Nation Skillup",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    name: "Ritika Goud",
    course: "UI/UX Design",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    name: "Harshita JC",
    course: "Cloud Computing",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    name: "Vikas 1",
    course: "Full Stack Dev",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 7,
    name: "Vikas 2",
    course: "Data Science",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 8,
    name: "Vikas 3",
    course: "Nation Skillup",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 9,
    name: "Vikas 4",
    course: "UI/UX Design",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 10,
    name: "Vikas 5",
    course: "Cloud Computing",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const total = students.length;
const mod = (n, m) => ((n % m) + m) % m;

// visibleSide: how many cards on each side of center (1 = 3 total, 2 = 5 total, 3 = 7 total)
function useVisibleSide() {
  const [side, setSide] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 600) setSide(1);
      else if (window.innerWidth < 1024) setSide(2);
      else setSide(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return side;
}

// Build slot indices: [center-side, ..., center, ..., center+side]
function getSlots(activeIndex, side) {
  const slots = [];
  for (let i = -side; i <= side; i++) {
    slots.push({ offset: i, studentIndex: mod(activeIndex + i, total) });
  }
  return slots;
}

export default function StudentVoices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);
  const visibleSide = useVisibleSide();

  const handlePrev = () => setActiveIndex((prev) => mod(prev - 1, total));
  const handleNext = () => setActiveIndex((prev) => mod(prev + 1, total));

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  const slots = getSlots(activeIndex, visibleSide);

  // Position class based on offset from center
  const posClass = (offset) => {
    if (offset === 0) return "center";
    const abs = Math.abs(offset);
    const side = offset < 0 ? "left" : "right";
    return `${side}-${abs}`;
  };

  return (
    <section className="sv-section">
      <div className="sv-header">
        <p className="sv-label">TESTIMONIALS</p>
        <h2 className="sv-title">
          Student <span className="sv-title-accent">Voices</span>
        </h2>
        <p className="sv-subtitle">
          Hear directly from our learners about their journey
        </p>
      </div>

      <div className="sv-stage">
        {/* Prev Arrow */}
        <button
          className="sv-arrow"
          onClick={handlePrev}
          aria-label="Previous student"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="sv-cards-wrapper">
          {slots.map(({ offset, studentIndex }) => {
            const student = students[studentIndex];
            const pc = posClass(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={`slot-${offset}`}
                className={`sv-card sv-card--${pc}`}
                onClick={() => {
                  if (!isCenter)
                    setActiveIndex(mod(activeIndex + offset, total));
                }}
              >
                {isCenter ? (
                  <>
                    <video
                      ref={videoRef}
                      className="sv-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
                      <source src={student.videoUrl} type="video/mp4" />
                    </video>
                    <div className="sv-card-badge">{student.course}</div>
                    <div className="sv-card-namebar">{student.name}</div>
                  </>
                ) : (
                  <div className="sv-card-idle">
                    <p className="sv-card-idle-name">{student.name}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          className="sv-arrow"
          onClick={handleNext}
          aria-label="Next student"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="sv-dots">
        {students.map((_, i) => (
          <button
            key={i}
            className={i === activeIndex ? "sv-dot sv-dot-active" : "sv-dot"}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to student ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

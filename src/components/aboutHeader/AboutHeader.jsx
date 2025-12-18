import React, { useState, useEffect } from "react";
import "./AboutHeader.css";

const AboutHeader = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80", // Team photo 1
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80", // Team photo 2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about-header">
      {/* Background Images */}
      <div className="about-header-background-images">
        {images.map((image, index) => (
          <div
            key={index}
            className={`about-header-background-image ${
              currentImage === index ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="about-header-overlay"></div>

      {/* Content */}
      <div className="about-header-content">
        <div className="about-header-text">
          <h2>about us.</h2>
          <h1>
            ELEVATING
            <br />
            BHARAT ONE CONTENT
            <br />
            AT A TIME.
          </h1>
        </div>

        <div className="about-header-description">
          <p>
            BeerBiceps Media World, founded by celebrated YouTuber Ranveer
            Allahbadia, is a dynamic digital platform revolutionizing India's
            content landscape. Known for his engaging videos on fitness, mental
            well-being, lifestyle, and entrepreneurship, BeerBiceps has
            cultivated a massive online following. Through his unique approach
            of blending personal growth with entertainment, BeerBiceps Media
            World has become a go-to destination for millennials and Gen Z
            seeking motivation, self-improvement, and practical advice. The
            brand encompasses a diverse range of content, from insightful
            podcasts to fitness tutorials, empowering audiences to lead
            healthier, more productive lives. With millions of subscribers,
            BeerBiceps continues to inspire and impact lives across the nation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;

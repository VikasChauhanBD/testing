import React from "react";
import "./WhatWeOffer.css";
import Image1 from "../../assets/images/offer-1.png";
import Image2 from "../../assets/images/offer-2.png";
import Image3 from "../../assets/images/offer-3.png";

function WhatWeOffer() {
  const cardsData = [
    {
      image: Image1,
      title: "Structured learning for exams & beyond:",
      desc: "NEET PG and INICET coaching with clinical clarity and exam-readiness.",
    },
    {
      image: Image2,
      title: "Residency training:",
      desc: "Live case studies, procedural workshops, and real-world exposure to build clinical & surgical maturity.",
    },
    {
      image: Image3,
      title: "Supportive infrastructure & positive learning culture:",
      desc: "Inspired by values of care and community—expect ethical mentoring, clarity, and personal growth at every step.",
    },
  ];

  return (
    <div id="what-we-offer" className="offer-main-container">
      <h1>What We Offer</h1>

      <div className="offer-content-div">
        <div className="offer-content-cards">
          {cardsData.map((data, index) => (
            <div key={index} className="offer-content-card">
              <img src={data.image} alt="" />
              <h4>{data.title}</h4>
              <p>{data.desc}</p>
            </div>
          ))}
        </div>

        <div className="offer-content-text">
          <h2>
            At Vidya Jeevan, the goal isn’t just academic success—it’s building
            confidence, character, and community in future doctors. For many, it
            becomes not just a phase of preparation, but a defining chapter in
            their journey.
          </h2>
        </div>
      </div>

      <div className="offer-content-div-2">
        <div className="offer-content-cards-2">
          {cardsData.map((data, index) => (
            <div key={index} className="offer-content-card-2">
              <img src={data.image} alt="" />
              <h4>{data.title}</h4>
              <p>{data.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <h2>
        At Vidya Jeevan, the goal isn’t just academic success—it’s building
        confidence, character, and community in future doctors. For many, it
        becomes not just a phase of preparation, but a defining chapter in their
        journey.
      </h2>
    </div>
  );
}

export default WhatWeOffer;

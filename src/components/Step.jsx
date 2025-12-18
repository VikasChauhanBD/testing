import { useState } from "react";
import "./Step.css";

export default function Step() {
  const [selectedStep, setSelectedStep] = useState(1);

  const handleStepChange = (id) => {
    setSelectedStep(id);
  };

  const steps = [
    {
      id: 1,
      title: "01",
      content:
        "Spark Your Little One's Curiosity: Fun and personalized activities just for them!",
      image:
        "https://www.uptodd.com/images/newWebsite/process/mobile-step-1.webp",
    },
    {
      id: 2,
      title: "02",
      content:
        "Learning at Their Own Pace: Engaging activities that match their interests.",
      image:
        "https://www.uptodd.com/images/newWebsite/process/mobile-step-2.webp",
    },
    {
      id: 3,
      title: "03",
      content:
        "Supportive Guidance: Caring mentors to help your little one explore and grow.",
      image:
        "https://www.uptodd.com/images/newWebsite/process/mobile-step-3.webp",
    },
    {
      id: 4,
      title: "04",
      content:
        "Celebrating Progress: Easy ways to see how your toddler is learning every day.",
      image:
        "https://www.uptodd.com/images/newWebsite/process/mobile-step-4.webp",
    },
    {
      id: 5,
      title: "05",
      content:
        "Stay Connected: Simple tools to be part of your child’s learning adventure.",
      image:
        "https://www.uptodd.com/images/newWebsite/process/mobile-step-5.webp",
    },
  ];

  return (
    <div className="step-main-container">
      <h1>How our Program Works !!</h1>

      <div className="step-inner-container">
        <div className="step-list-container">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-item ${
                selectedStep === step.id
                  ? "active-step-item"
                  : "border-gray-300"
              } ${selectedStep === step.id ? "flex" : "hidden"}`}
              onClick={() => handleStepChange(step.id)}
            >
              <div className="step-header">
                <h4
                  className={`step-title ${
                    selectedStep === step.id ? "text-red" : "text-black"
                  }`}
                >
                  STEP
                </h4>

                <h3 className="step-number">{step.title}</h3>
              </div>
              <svg
                className="step-divider"
                xmlns="http://www.w3.org/2000/svg"
                width="1"
                height="60"
                viewBox="0 0 1 60"
                fill="none"
              >
                <path d="M0.5 0V60" stroke="#002863" strokeDasharray="2 2" />
              </svg>
              <div
                className={`step-content ${
                  selectedStep === step.id
                    ? "active-step-content"
                    : "step-content"
                }`}
              >
                <p>{step.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="step-image-container col">
          <div className="step-image-wrapper">
            <div className="step-image-inner">
              {steps.map((step) => (
                <img
                  key={step.id}
                  src={step.image}
                  alt={`Step ${step.id}`}
                  className={`step-image ${
                    selectedStep === step.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="step-indicators">
              {steps.map((step) => (
                <span
                  key={step.id}
                  className={`step-indicator ${
                    selectedStep === step.id ? "bg-blue-500" : "bg-white-700"
                  }`}
                  onClick={() => handleStepChange(step.id)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

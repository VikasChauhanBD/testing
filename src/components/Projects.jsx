import React, { useEffect } from "react";
import "./Projects.css";
import CDNLogo from "../assets/demo-logo.webp";
import CDN from "../assets/demo.webp";

export const Projects = () => {
  return (
    <div className="container">
      <p className="heading">Projects</p>
      <p className="desc">
        Here are some of the projects I've developed and worked on, showcasing
        my skills and creativity.
      </p>

      <div className="timeline">
        {/* Project 1 */}
        <div className="box left_box">
          <img
            className="icons"
            src={CDNLogo}
            alt="CDN Logo"
            data-aos="zoom-in"
          />
          <div className="text_box" data-aos="fade-up">
            <div className="details-box">
              <div className="details-box-image">
                <img src={CDN} alt="CDN Project Image" />
              </div>
              <div className="details-box-text">
                <p className="title">Cerebellum Academy</p>
                <p>More data will we add</p>
              </div>
            </div>

            <p className="description">
              Cerebellum Academy is the visionary creation of five of India’s
              most renowned medical educators — celebrated not just for their
              academic excellence, but also as prolific authors and powerful
              motivators who have inspired millions of medical aspirants.
            </p>
            <div className="button_box">
              <a
                href="https://www.cerebellumacademy.com/"
                target="_blank"
                rel="noreferrer"
              >
                See More
              </a>
            </div>
            <span className="left_box_arrow"></span>
          </div>
        </div>

        {/* Project 2 */}
        <div className="box right_box">
          <img
            className="icons"
            src={CDNLogo}
            alt="TEN-HR-Consulting Logo"
            data-aos="zoom-in"
          />
          <div className="text_box" data-aos="fade-up">
            <div className="details-box">
              <div className="details-box-image">
                <img src={CDN} alt="CDN Project Image" />
              </div>
              <div className="details-box-text">
                <p className="title">eConceptual</p>
                <p>More data will we add</p>
              </div>
            </div>

            <p>
              eConceptual is a next-generation medical learning platform
              designed to empower postgraduate medical students with advanced
              clinical and surgical education. Built with a vision to bridge the
              gap between knowledge and real-world practice, eConceptual offers
              a dynamic and accessible learning environment guided by some of
              India’s most respected medical educators.
            </p>
            <div className="button_box">
              <a
                href="https://www.econceptual.com/"
                target="_blank"
                rel="noreferrer"
              >
                See More
              </a>
            </div>
            <span className="right_box_arrow"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

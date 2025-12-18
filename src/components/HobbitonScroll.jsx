import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HobbitonScroll.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HobbitonScroll = () => {
  const heroContainerRef = useRef(null);
  const opacityRevealRef = useRef(null);

  useEffect(() => {
    // Make sure ScrollTrigger is properly initialized
    ScrollTrigger.refresh();

    // Hero animation timeline
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    heroTimeline
      .to(".hero__cover-img", {
        scale: 2,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut",
      })
      .to(
        ".hero__cover",
        {
          "--overlay-opacity": 0,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".hero__bg",
        {
          scale: 1.1,
          filter: "blur(0px) brightness(1)",
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".hero__title",
        {
          scale: 1,
          xPercent: -50,
          yPercent: -50,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power1.inOut",
        },
        "<"
      );

    // Text reveal animation (without SplitText plugin)
    const textElement = opacityRevealRef.current;
    if (textElement) {
      const text = textElement.textContent;
      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0.2";
        span.style.display = "inline-block";
        return span;
      });

      textElement.textContent = "";
      chars.forEach((span) => textElement.appendChild(span));

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".section-stick",
            pin: true,
            start: "center center",
            end: "+=1500",
            scrub: 1,
          },
        })
        .to(chars, {
          opacity: 1,
          duration: 1,
          ease: "none",
          stagger: 1,
        })
        .to({}, { duration: 10 })
        .to(".opacity-reveal", {
          opacity: 0,
          scale: 1.2,
          duration: 50,
        });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <div className="hero-container" ref={heroContainerRef}>
            <section className="hero">
              <div className="hero__content">
                <div className="hero__bg"></div>
                <h1 className="hero__title font-bold">Hobbiton</h1>
              </div>
              <div className="hero__cover">
                <img
                  className="hero__cover-img"
                  src="https://assets.codepen.io/204808/hobbit-hole.png"
                  alt="Hobbit hole entrance"
                />
              </div>
            </section>
          </div>

          <section className="section-stick">
            <p className="opacity-reveal" ref={opacityRevealRef}>
              If ever you are passing my way, don't wait to knock! Tea is at
              four; but any of you are welcome at any time.
            </p>
          </section>

          <section className="hobbiton">
            <img
              className="hobbiton-img"
              src="https://assets.codepen.io/204808/hobitton.jpg"
              alt="Hobbiton landscape"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default HobbitonScroll;

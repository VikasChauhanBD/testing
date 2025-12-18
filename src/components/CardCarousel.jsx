import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/draggable";
import "./CardCarousel.css";

gsap.registerPlugin(Draggable);

const CardCarousel = () => {
  const cardsRef = useRef(null);
  const dragProxyRef = useRef(null);
  const seamlessLoopRef = useRef(null);
  const scrubRef = useRef(null);
  const spacingRef = useRef(0.1);

  const cards = [
    "https://assets.codepen.io/16327/portrait-number-01.png",
    "https://assets.codepen.io/16327/portrait-number-02.png",
    "https://assets.codepen.io/16327/portrait-number-03.png",
    "https://assets.codepen.io/16327/portrait-number-04.png",
    "https://assets.codepen.io/16327/portrait-number-05.png",
    "https://assets.codepen.io/16327/portrait-number-06.png",
    "https://assets.codepen.io/16327/portrait-number-07.png",
    "https://assets.codepen.io/16327/portrait-number-01.png",
    "https://assets.codepen.io/16327/portrait-number-02.png",
    "https://assets.codepen.io/16327/portrait-number-03.png",
    "https://assets.codepen.io/16327/portrait-number-04.png",
    "https://assets.codepen.io/16327/portrait-number-05.png",
    "https://assets.codepen.io/16327/portrait-number-06.png",
    "https://assets.codepen.io/16327/portrait-number-07.png",
  ];

  useEffect(() => {
    const spacing = spacingRef.current;
    const cardElements = gsap.utils.toArray(".cards li");

    // Set initial state
    gsap.set(cardElements, { xPercent: 400, opacity: 0, scale: 0 });

    // Animation function for each card
    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false,
        }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    };

    // Build seamless loop
    const buildSeamlessLoop = (items, spacing, animateFunc) => {
      let overlap = Math.ceil(1 / spacing);
      let startTime = items.length * spacing + 0.5;
      let loopTime = (items.length + overlap) * spacing + 1;
      let rawSequence = gsap.timeline({ paused: true });
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
      });
      let l = items.length + overlap * 2;
      let time, i, index;

      for (i = 0; i < l; i++) {
        index = i % items.length;
        time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        i <= items.length && seamlessLoop.add("label" + i, time);
      }

      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none",
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none",
          }
        );
      return seamlessLoop;
    };

    seamlessLoopRef.current = buildSeamlessLoop(
      cardElements,
      spacing,
      animateFunc
    );

    // Auto-play the carousel with pauses
    const autoPlayCarousel = () => {
      const duration = spacing; // Time to move to next card
      const pauseDuration = 3; // Pause for 3 seconds at each card

      const moveToNext = () => {
        const currentTime = seamlessLoopRef.current.time();
        gsap.to(seamlessLoopRef.current, {
          time: currentTime + spacing,
          duration: 1, // 1 second transition between cards
          ease: "power2.inOut",
          onComplete: () => {
            // Pause for 3 seconds before moving to next card
            gsap.delayedCall(pauseDuration, moveToNext);
          },
        });
      };

      // Start the auto-play after initial pause
      gsap.delayedCall(pauseDuration, moveToNext);
    };

    autoPlayCarousel();

    // Scrub control for manual interactions
    scrubRef.current = {
      time: 0,
      paused: false,
    };

    // Draggable
    let draggableInstance;
    if (dragProxyRef.current && cardsRef.current) {
      draggableInstance = Draggable.create(dragProxyRef.current, {
        type: "x",
        trigger: cardsRef.current,
        onPress() {
          this.startTime = seamlessLoopRef.current.time();
          seamlessLoopRef.current.pause();
        },
        onDrag() {
          const newTime = this.startTime - (this.x - this.startX) * 0.002;
          seamlessLoopRef.current.time(newTime);
        },
        onDragEnd() {
          seamlessLoopRef.current.play();
        },
      });
    }

    // Cleanup
    return () => {
      seamlessLoopRef.current?.kill();
      if (draggableInstance && draggableInstance[0]) {
        draggableInstance[0].kill();
      }
    };
  }, []);

  const handlePrev = () => {
    if (seamlessLoopRef.current) {
      // Kill any ongoing auto-play animations
      gsap.killTweensOf(seamlessLoopRef.current);

      const currentTime = seamlessLoopRef.current.time();
      const newTime = currentTime - spacingRef.current;

      gsap.to(seamlessLoopRef.current, {
        time: newTime,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleNext = () => {
    if (seamlessLoopRef.current) {
      // Kill any ongoing auto-play animations
      gsap.killTweensOf(seamlessLoopRef.current);

      const currentTime = seamlessLoopRef.current.time();
      const newTime = currentTime + spacingRef.current;

      gsap.to(seamlessLoopRef.current, {
        time: newTime,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="cards-body">
      <div className="gallery">
        <ul className="cards" ref={cardsRef}>
          {cards.map((card, index) => (
            <li key={index} style={{ backgroundImage: `url(${card})` }}></li>
          ))}
        </ul>
        <div className="actions">
          <button className="prev" onClick={handlePrev}>
            Prev
          </button>
          <button className="next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <div className="drag-proxy" ref={dragProxyRef}></div>
    </div>
  );
};

export default CardCarousel;

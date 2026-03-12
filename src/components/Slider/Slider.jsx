import { useEffect, useRef, useCallback } from "react";
import "./Slider.css";

const throttle = (callback, limit) => {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const SLIDES = [
  {
    name: "Fjord",
    color: "#6B5B50",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
  },
  {
    name: "Aether",
    color: "#B8B5A4",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    name: "Onyx",
    color: "#8BA8A8",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&q=80",
  },
  {
    name: "Birch",
    color: "#B5A882",
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80",
  },
];

const AUTOPLAY_DELAY = 4000;

export default function Slider() {
  const sliderRef = useRef(null);
  const titleRef = useRef(null);
  const imagesRef = useRef(null);
  const cursorRef = useRef(null);

  // Mutable state stored in refs to avoid re-renders
  const stateRef = useRef({
    current: 0,
    animating: false,
    total: SLIDES.length,
    slideEls: [],
    currentLine: null,
    cursorVisible: false,
    autoPlayId: null,
    reducedMotion: false,
    gsap: null,
    cursorMoveX: null,
    cursorMoveY: null,
  });

  const mod = useCallback((n) => {
    const total = stateRef.current.total;
    return ((n % total) + total) % total;
  }, []);

  const getSlideProps = useCallback((step) => {
    const h = imagesRef.current?.offsetHeight || 0;
    const absStep = Math.abs(step);
    const positions = [
      { x: -0.35, y: -0.95, rot: -30, s: 1.35, b: 16, o: 0 },
      { x: -0.18, y: -0.5, rot: -15, s: 1.15, b: 8, o: 0.55 },
      { x: 0, y: 0, rot: 0, s: 1, b: 0, o: 1 },
      { x: -0.06, y: 0.5, rot: 15, s: 0.75, b: 6, o: 0.55 },
      { x: -0.12, y: 0.95, rot: 30, s: 0.55, b: 14, o: 0 },
    ];
    const idx = Math.max(0, Math.min(4, step + 2));
    const p = positions[idx];
    return {
      x: p.x * h,
      y: p.y * h,
      rotation: p.rot,
      scale: p.s,
      blur: p.b,
      opacity: p.o,
      zIndex: absStep === 0 ? 3 : absStep === 1 ? 2 : 1,
    };
  }, []);

  const positionSlide = useCallback(
    (slide, step) => {
      const { gsap } = stateRef.current;
      if (!gsap) return;
      const props = getSlideProps(step);
      gsap.set(slide, {
        xPercent: -50,
        yPercent: -50,
        x: props.x,
        y: props.y,
        rotation: props.rotation,
        scale: props.scale,
        opacity: props.opacity,
        filter: `blur(${props.blur}px)`,
        zIndex: props.zIndex,
      });
    },
    [getSlideProps]
  );

  const makeSlide = useCallback((idx) => {
    const div = document.createElement("div");
    div.className = "slider__slide";
    const img = document.createElement("img");
    img.src = SLIDES[idx].image;
    img.alt = SLIDES[idx].name;
    img.width = 600;
    img.height = 420;
    div.appendChild(img);
    return div;
  }, []);

  const setTitle = useCallback((text) => {
    const titleEl = titleRef.current;
    if (!titleEl) return;
    titleEl.innerHTML = "";
    const line = document.createElement("div");
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      line.appendChild(span);
    });
    titleEl.appendChild(line);
    stateRef.current.currentLine = line;
  }, []);

  const animateTitle = useCallback((newText, direction) => {
    const { gsap, reducedMotion, currentLine } = stateRef.current;
    const titleEl = titleRef.current;
    if (!gsap || !titleEl || !currentLine) return gsap?.timeline();

    const h = titleEl.offsetHeight;
    const dir = direction === "next" ? 1 : -1;
    const oldLine = currentLine;
    const oldChars = [...oldLine.querySelectorAll("span")];

    titleEl.style.height = h + "px";
    oldLine.style.cssText = "position:absolute;top:0;left:0;width:100%";

    const newLine = document.createElement("div");
    newLine.style.cssText = "position:absolute;top:0;left:0;width:100%";
    [...newText].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      newLine.appendChild(span);
    });
    titleEl.appendChild(newLine);

    const newChars = [...newLine.querySelectorAll("span")];
    gsap.set(newChars, { y: h * dir });

    const duration = reducedMotion ? 0.01 : 1;
    const stagger = reducedMotion ? 0 : 0.04;

    const tl = gsap.timeline({
      onComplete: () => {
        oldLine.remove();
        newLine.style.cssText = "";
        gsap.set(newChars, { clearProps: "all" });
        titleEl.style.height = "";
        stateRef.current.currentLine = newLine;
      },
    });

    tl.to(oldChars, { y: -h * dir, stagger, duration, ease: "expo.inOut" }, 0);
    tl.to(newChars, { y: 0, stagger, duration, ease: "expo.inOut" }, 0);
    return tl;
  }, []);

  const animateCarousel = useCallback(
    (direction) => {
      const { gsap, reducedMotion, slideEls, current } = stateRef.current;
      if (!gsap || !imagesRef.current || imagesRef.current.offsetHeight === 0)
        return gsap?.timeline();

      const shift = direction === "next" ? -1 : 1;
      const enterStep = direction === "next" ? 2 : -2;
      const newIdx =
        direction === "next" ? mod(current + 2) : mod(current - 2);

      const newSlide = makeSlide(newIdx);
      imagesRef.current.appendChild(newSlide);
      positionSlide(newSlide, enterStep);
      slideEls.push({ el: newSlide, step: enterStep });

      slideEls.forEach((s) => {
        s.step += shift;
      });

      const duration = reducedMotion ? 0.01 : 1.2;

      const tl = gsap.timeline({
        onComplete: () => {
          stateRef.current.slideEls = slideEls.filter((s) => {
            if (Math.abs(s.step) >= 2) {
              s.el.remove();
              return false;
            }
            return true;
          });
        },
      });

      slideEls.forEach((s) => {
        const props = getSlideProps(s.step);
        s.el.style.zIndex = props.zIndex;
        tl.to(
          s.el,
          {
            x: props.x,
            y: props.y,
            rotation: props.rotation,
            scale: props.scale,
            opacity: props.opacity,
            filter: `blur(${props.blur}px)`,
            duration,
            ease: "power3.inOut",
          },
          0
        );
      });

      return tl;
    },
    [mod, makeSlide, positionSlide, getSlideProps]
  );

  const stopAutoPlay = useCallback(() => {
    if (stateRef.current.autoPlayId) {
      clearInterval(stateRef.current.autoPlayId);
      stateRef.current.autoPlayId = null;
    }
  }, []);

  const go = useCallback(
    (direction) => {
      const state = stateRef.current;
      if (state.animating || !state.gsap) return;
      state.animating = true;

      // restart autoplay
      stopAutoPlay();
      state.autoPlayId = setInterval(() => {
        if (!stateRef.current.animating) go("next");
      }, AUTOPLAY_DELAY);

      const nextIdx =
        direction === "next" ? mod(state.current + 1) : mod(state.current - 1);

      const master = state.gsap.timeline({
        onComplete: () => {
          state.current = nextIdx;
          state.animating = false;
        },
      });

      master.to(
        sliderRef.current,
        {
          backgroundColor: SLIDES[nextIdx].color,
          duration: state.reducedMotion ? 0.01 : 1.2,
          ease: "power2.inOut",
        },
        0
      );

      master.add(animateTitle(SLIDES[nextIdx].name, direction), 0);
      master.add(animateCarousel(direction), 0);
    },
    [mod, stopAutoPlay, animateTitle, animateCarousel]
  );

  const buildCarousel = useCallback(() => {
    const { gsap, current } = stateRef.current;
    if (!gsap || !imagesRef.current || imagesRef.current.offsetHeight === 0)
      return;
    imagesRef.current.innerHTML = "";
    stateRef.current.slideEls = [];

    for (let step = -1; step <= 1; step++) {
      const idx = mod(current + step);
      const slide = makeSlide(idx);
      imagesRef.current.appendChild(slide);
      positionSlide(slide, step);
      stateRef.current.slideEls.push({ el: slide, step });
    }
  }, [mod, makeSlide, positionSlide]);

  useEffect(() => {
    // Load GSAP dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.co/gsap@3/dist/gsap.min.js";
    script.onload = () => {
      const gsap = window.gsap;
      const state = stateRef.current;
      state.gsap = gsap;
      state.reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Preload images
      SLIDES.forEach((s) => {
        new Image().src = s.image;
      });

      setTitle(SLIDES[0].name);
      gsap.set(sliderRef.current, { backgroundColor: SLIDES[0].color });

      // Setup cursor
      const cursorEl = cursorRef.current;
      gsap.set(cursorEl, { xPercent: -50, yPercent: -50, opacity: 0 });
      state.cursorMoveX = gsap.quickTo(cursorEl, "x", {
        duration: 0.5,
        ease: "power3",
      });
      state.cursorMoveY = gsap.quickTo(cursorEl, "y", {
        duration: 0.5,
        ease: "power3",
      });

      buildCarousel();

      // Start autoplay
      state.autoPlayId = setInterval(() => {
        if (!stateRef.current.animating) go("next");
      }, AUTOPLAY_DELAY);
    };
    document.head.appendChild(script);

    return () => {
      stopAutoPlay();
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bind events
  useEffect(() => {
    const onWheel = throttle((e) => {
      if (stateRef.current.animating) return;
      go(e.deltaY > 0 ? "next" : "prev");
    }, 1800);

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = throttle((e) => {
      if (stateRef.current.animating) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      go(diff > 0 ? "next" : "prev");
    }, 1800);

    const onKeyDown = (e) => {
      if (stateRef.current.animating) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go("next");
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go("prev");
    };

    const onMouseMove = (e) => {
      const state = stateRef.current;
      if (!state.gsap) return;
      if (!state.cursorVisible) {
        state.gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
        state.cursorVisible = true;
      }
      state.cursorMoveX?.(e.clientX);
      state.cursorMoveY?.(e.clientY);
    };

    const onMouseLeave = () => {
      const state = stateRef.current;
      if (!state.gsap) return;
      state.gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      state.cursorVisible = false;
    };

    const onResize = debounce(() => {
      const state = stateRef.current;
      if (!state.animating && imagesRef.current?.offsetHeight > 0) {
        state.slideEls.forEach((s) => positionSlide(s.el, s.step));
      }
    }, 300);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stateRef.current.animating = false;
        stopAutoPlay();
      } else {
        stateRef.current.autoPlayId = setInterval(() => {
          if (!stateRef.current.animating) go("next");
        }, AUTOPLAY_DELAY);
      }
    };

    const sliderEl = sliderRef.current;
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    sliderEl?.addEventListener("mousemove", onMouseMove, { passive: true });
    sliderEl?.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      sliderEl?.removeEventListener("mousemove", onMouseMove);
      sliderEl?.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [go, positionSlide, stopAutoPlay]);

  return (
    <section className="slider" ref={sliderRef}>
      <div className="slider__header">
        <button className="slider__menu" aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="slider__label">CODEPEN &apos;26 — NR.2</span>
      </div>

      <div className="slider__body">
        <div className="slider__left">
          <h2 className="slider__title" aria-live="polite" ref={titleRef}></h2>
          <div className="slider__footer">
            <div className="slider__info">
              <p className="slider__description">
                A CODEPEN EXPERIMENT
                <br />
                BY NIDAL — FRONTEND
                <br />
                DEVELOPER
              </p>
              <p className="slider__location">
                CRAFTED WITH GSAP
                <br />
                AND CURIOSITY.
              </p>
            </div>
          </div>
        </div>

        <div className="slider__right">
          <div className="slider__images" ref={imagesRef}></div>
        </div>
      </div>

      <div className="slider__cursor" aria-hidden="true" ref={cursorRef}>
        +
      </div>
    </section>
  );
}
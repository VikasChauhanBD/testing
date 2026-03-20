// import { useEffect, useRef } from "react";
// import { animate, scroll, cubicBezier } from "motion";
// import "./ScrollSection.css";

// const images = {
//   layer1: [
//     "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60",
//   ],
//   layer2: [
//     "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60",
//     "https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60",
//   ],
//   layer3: [
//     "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
//   ],
//   scaler:
//     "https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100",
// };

// export default function ScrollSection() {
//   const scalerImgRef = useRef(null);
//   const firstSectionRef = useRef(null);
//   const layerRefs = useRef([]);

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReducedMotion) return;

//     // Delay ensures DOM is painted and offsetWidth/Height are accurate
//     const timer = setTimeout(() => {
//       const image = scalerImgRef.current;
//       const firstSection = firstSectionRef.current;
//       const layers = layerRefs.current.filter(Boolean);

//       if (!image || !firstSection || layers.length === 0) return;

//       const naturalWidth = image.offsetWidth;
//       const naturalHeight = image.offsetHeight;
//       const viewportWidth = window.innerWidth;
//       const viewportHeight = window.innerHeight;

//       // Scaler image shrinks from fullscreen → natural grid cell size
//       scroll(
//         animate(
//           image,
//           {
//             width: [viewportWidth, naturalWidth],
//             height: [viewportHeight, naturalHeight],
//           },
//           {
//             width: { easing: cubicBezier(0.65, 0, 0.35, 1) },
//             height: { easing: cubicBezier(0.42, 0, 0.58, 1) },
//           }
//         ),
//         {
//           target: firstSection,
//           offset: ["start start", "80% end"],
//         }
//       );

//       const scaleEasings = [
//         cubicBezier(0.42, 0, 0.58, 1),
//         cubicBezier(0.76, 0, 0.24, 1),
//         cubicBezier(0.87, 0, 0.13, 1),
//       ];

//       layers.forEach((layer, index) => {
//         const endProgress = 1 - index * 0.05;

//         // Fade in each layer
//         scroll(
//           animate(
//             layer,
//             { opacity: [0, 0, 1] },
//             {
//               offset: [0, 0.55, 1],
//               easing: cubicBezier(0.61, 1, 0.88, 1),
//             }
//           ),
//           {
//             target: firstSection,
//             offset: ["start start", `${endProgress} end`],
//           }
//         );

//         // Scale in each layer
//         scroll(
//           animate(
//             layer,
//             { scale: [0, 0, 1] },
//             {
//               offset: [0, 0.3, 1],
//               easing: scaleEasings[index],
//             }
//           ),
//           {
//             target: firstSection,
//             offset: ["start start", `${endProgress} end`],
//           }
//         );
//       });
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="scroll-content-wrap">
//       <header className="scroll-header">
//         <h1 className="scroll-fluid">
//           let&apos;s
//           <br />
//           scroll.
//         </h1>
//         <h2 className="scroll-fluid scroll-h2">
//           Originally from{" "}
//           <a
//             href="https://codepen.io/jh3y/pen/VYZwOwd"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Jhey →
//           </a>
//           , converted to Motion
//         </h2>
//       </header>

//       <main className="scroll-main">
//         <section ref={firstSectionRef} className="scroll-first-section">
//           <div className="scroll-content">
//             <div className="scroll-grid">
//               {/* Layer 1: Outer edges */}
//               <div
//                 className="scroll-layer"
//                 ref={(el) => (layerRefs.current[0] = el)}
//               >
//                 {images.layer1.map((src, i) => (
//                   <div key={i}>
//                     <img src={src} alt="" />
//                   </div>
//                 ))}
//               </div>

//               {/* Layer 2: Inner columns */}
//               <div
//                 className="scroll-layer"
//                 ref={(el) => (layerRefs.current[1] = el)}
//               >
//                 {images.layer2.map((src, i) => (
//                   <div key={i}>
//                     <img src={src} alt="" />
//                   </div>
//                 ))}
//               </div>

//               {/* Layer 3: Center top and bottom */}
//               <div
//                 className="scroll-layer"
//                 ref={(el) => (layerRefs.current[2] = el)}
//               >
//                 {images.layer3.map((src, i) => (
//                   <div key={i}>
//                     <img src={src} alt="" />
//                   </div>
//                 ))}
//               </div>

//               {/* Center scaler image */}
//               <div className="scroll-scaler">
//                 <img ref={scalerImgRef} src={images.scaler} alt="" />
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="scroll-last-section">
//           <h2 className="scroll-fluid">fin.</h2>
//         </section>
//       </main>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import "./ScrollSection.css";

const images = {
  layer1: [
    "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60",
  ],
  layer2: [
    "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60",
  ],
  layer3: [
    "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
  ],
  scaler:
    "https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100",
};

// Easing functions
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
function quartInOut(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
}

// Map a value from [inMin, inMax] to [outMin, outMax], clamped
function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

// Apply keyframe offset logic: hold at start until holdPoint, then animate to 1
function applyOffset(progress, holdPoint) {
  if (progress <= holdPoint) return 0;
  return (progress - holdPoint) / (1 - holdPoint);
}

export default function ScrollSection() {
  const scalerImgRef = useRef(null);
  const firstSectionRef = useRef(null);
  const layerRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const image = scalerImgRef.current;
    const section = firstSectionRef.current;
    const layers = layerRefs.current.filter(Boolean);

    if (!image || !section || layers.length === 0) return;

    // Set initial states
    image.style.position = "absolute";
    layers.forEach((layer) => {
      layer.style.opacity = "0";
      layer.style.scale = "0";
    });

    let naturalWidth = 0;
    let naturalHeight = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const measure = () => {
      // Temporarily reset to measure natural size
      image.style.width = "";
      image.style.height = "";
      naturalWidth = image.offsetWidth;
      naturalHeight = image.offsetHeight;
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      // Restore full size immediately if at scroll top
      const scrollY = window.scrollY;
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      if (scrollY <= sectionTop) {
        image.style.width = viewportWidth + "px";
        image.style.height = viewportHeight + "px";
      }
    };

    // Wait for images to load so dimensions are correct
    const allImgs = section.querySelectorAll("img");
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded >= allImgs.length) measure();
    };
    allImgs.forEach((img) => {
      if (img.complete) loaded++;
      else img.addEventListener("load", onLoad);
    });
    if (loaded >= allImgs.length) measure();
    else setTimeout(measure, 200);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionHeight = section.offsetHeight;

      // Progress: 0 when section top hits viewport top, 1 when section bottom leaves
      const rawProgress = (scrollY - sectionTop) / (sectionHeight - viewportHeight);
      const progress = Math.min(1, Math.max(0, rawProgress));

      // --- Scaler image: shrink from fullscreen to natural size (0% → 80% progress) ---
      const imgProgress = mapRange(progress, 0, 0.8, 0, 1);
      const easedW = easeInOut(imgProgress);
      const easedH = easeInOut(imgProgress);
      const currentW = viewportWidth + (naturalWidth - viewportWidth) * easedW;
      const currentH = viewportHeight + (naturalHeight - viewportHeight) * easedH;
      image.style.width = currentW + "px";
      image.style.height = currentH + "px";

      // --- Layers: fade + scale in with staggered end offsets ---
      const scaleEaseFns = [easeInOut, cubicInOut, quartInOut];

      layers.forEach((layer, index) => {
        const endProgress = 1 - index * 0.05; // 1.0, 0.95, 0.90
        const layerProgress = mapRange(progress, 0, endProgress, 0, 1);

        // Opacity: hold at 0 until 55%, then ease to 1
        const opacityRaw = applyOffset(layerProgress, 0.55);
        const opacity = Math.sin((opacityRaw * Math.PI) / 2); // sine ease out
        layer.style.opacity = String(opacity);

        // Scale: hold at 0 until 30%, then ease to 1
        const scaleRaw = applyOffset(layerProgress, 0.3);
        const scale = scaleEaseFns[index](scaleRaw);
        layer.style.scale = String(scale);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });

    // Run once on mount to set correct initial state
    setTimeout(onScroll, 150);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="scroll-content-wrap">
      <header className="scroll-header">
        <h1 className="scroll-fluid">
          let&apos;s
          <br />
          scroll.
        </h1>
        <h2 className="scroll-fluid scroll-h2">
          Originally from{" "}
          <a
            href="https://codepen.io/jh3y/pen/VYZwOwd"
            target="_blank"
            rel="noreferrer"
          >
            Jhey →
          </a>
          , converted to Motion
        </h2>
      </header>

      <main className="scroll-main">
        <section ref={firstSectionRef} className="scroll-first-section">
          <div className="scroll-content">
            <div className="scroll-grid">
              {/* Layer 1: Outer edges */}
              <div
                className="scroll-layer"
                ref={(el) => (layerRefs.current[0] = el)}
              >
                {images.layer1.map((src, i) => (
                  <div key={i}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              {/* Layer 2: Inner columns */}
              <div
                className="scroll-layer"
                ref={(el) => (layerRefs.current[1] = el)}
              >
                {images.layer2.map((src, i) => (
                  <div key={i}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              {/* Layer 3: Center top and bottom */}
              <div
                className="scroll-layer"
                ref={(el) => (layerRefs.current[2] = el)}
              >
                {images.layer3.map((src, i) => (
                  <div key={i}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              {/* Center scaler image */}
              <div className="scroll-scaler">
                <img ref={scalerImgRef} src={images.scaler} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-last-section">
          <h2 className="scroll-fluid">fin.</h2>
        </section>
      </main>
    </div>
  );
}
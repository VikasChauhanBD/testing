// import React, { useEffect, useRef, useState } from 'react';

// const CONFIG = {
//   itemCount: 20,
//   starCount: 150,
//   zGap: 800,
//   loopSize: 0,
//   camSpeed: 2.5,
//   colors: ['#ff003c', '#00f3ff', '#ccff00', '#ffffff']
// };
// CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

// const TEXTS = ["IMPACT", "VELOCITY", "BRUTAL", "SYSTEM", "FUTURE", "DESIGN", "PIXEL", "HYPER", "NEON", "VOID"];

// export default function ConvertedComponent() {
//   const worldRef = useRef(null);
//   const viewportRef = useRef(null);
//   const scrollProxyRef = useRef(null);
//   const itemsRef = useRef([]);
//   const stateRef = useRef({
//     scroll: 0,
//     velocity: 0,
//     targetSpeed: 0,
//     mouseX: 0,
//     mouseY: 0,
//     lastScrollY: 0,
//   });
//   const rafRef = useRef(null);
//   const lastTimeRef = useRef(0);

//   const fpsRef = useRef(null);
//   const velRef = useRef(null);
//   const coordRef = useRef(null);

//   const [, forceUpdate] = useState(0);

//   useEffect(() => {
//     const world = worldRef.current;
//     const viewport = viewportRef.current;
//     if (!world || !viewport) return;

//     itemsRef.current = [];

//     // Create Items
//     for (let i = 0; i < CONFIG.itemCount; i++) {
//       const el = document.createElement('div');
//       el.className = 'hyper-item';
//       el.style.cssText = `
//         position: absolute;
//         left: 0;
//         top: 0;
//         backface-visibility: hidden;
//         transform-origin: center center;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       `;

//       const isHeading = i % 4 === 0;

//       if (isHeading) {
//         const txt = document.createElement('div');
//         txt.style.cssText = `
//           font-size: 15vw;
//           font-weight: 800;
//           color: transparent;
//           -webkit-text-stroke: 2px rgba(255,255,255,0.15);
//           text-transform: uppercase;
//           white-space: nowrap;
//           transform: translate(-50%, -50%);
//           pointer-events: none;
//           letter-spacing: -0.5rem;
//           mix-blend-mode: overlay;
//           font-family: 'Syncopate', sans-serif;
//         `;
//         txt.innerText = TEXTS[i % TEXTS.length];
//         el.appendChild(txt);
//         itemsRef.current.push({
//           el, type: 'text',
//           x: 0, y: 0, rot: 0,
//           baseZ: -i * CONFIG.zGap
//         });
//       } else {
//         const card = document.createElement('div');
//         const randId = Math.floor(Math.random() * 9999);
//         const gridX = Math.floor(Math.random() * 10);
//         const gridY = Math.floor(Math.random() * 10);
//         const dataSize = (Math.random() * 100).toFixed(1);
//         card.style.cssText = `
//           width: 320px;
//           height: 460px;
//           background: rgba(10,10,10,0.4);
//           border: 1px solid rgba(255,255,255,0.1);
//           position: relative;
//           padding: 2rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           backdrop-filter: blur(8px);
//           -webkit-backdrop-filter: blur(8px);
//           box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.5);
//           transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
//           transform: translate(-50%,-50%);
//           cursor: crosshair;
//           box-sizing: border-box;
//         `;
//         card.innerHTML = `
//           <div style="border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:1rem;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
//             <span style="font-family:'JetBrains Mono',monospace;color:#ff003c;font-size:0.8rem;">ID-${randId}</span>
//             <div style="width:10px;height:10px;background:#ff003c;"></div>
//           </div>
//           <h2 style="font-size:2.5rem;line-height:0.9;margin:0;text-transform:uppercase;font-weight:700;color:#fff;mix-blend-mode:hard-light;font-family:'Syncopate',sans-serif;">${TEXTS[i % TEXTS.length]}</h2>
//           <div style="margin-top:auto;font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:rgba(255,255,255,0.4);display:flex;justify-content:space-between;">
//             <span>GRID: ${gridX}x${gridY}</span>
//             <span>DATA_SIZE: ${dataSize}MB</span>
//           </div>
//           <div style="position:absolute;bottom:2rem;right:2rem;font-size:4rem;opacity:0.1;font-weight:900;">0${i}</div>
//         `;

//         // Hover
//         card.addEventListener('mouseenter', () => {
//           card.style.borderColor = '#ff003c';
//           card.style.boxShadow = '0 0 30px rgba(255,0,60,0.2)';
//           card.style.background = 'rgba(20,20,20,0.8)';
//         });
//         card.addEventListener('mouseleave', () => {
//           card.style.borderColor = 'rgba(255,255,255,0.1)';
//           card.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.5)';
//           card.style.background = 'rgba(10,10,10,0.4)';
//         });

//         el.appendChild(card);

//         const angle = (i / CONFIG.itemCount) * Math.PI * 6;
//         const x = Math.cos(angle) * (window.innerWidth * 0.3);
//         const y = Math.sin(angle) * (window.innerHeight * 0.3);
//         const rot = (Math.random() - 0.5) * 30;

//         itemsRef.current.push({
//           el, type: 'card',
//           x, y, rot,
//           baseZ: -i * CONFIG.zGap
//         });
//       }
//       world.appendChild(el);
//     }

//     // Create Stars
//     for (let i = 0; i < CONFIG.starCount; i++) {
//       const el = document.createElement('div');
//       el.style.cssText = `
//         position: absolute;
//         width: 2px;
//         height: 2px;
//         background: white;
//         transform: translate(-50%,-50%);
//       `;
//       world.appendChild(el);
//       itemsRef.current.push({
//         el, type: 'star',
//         x: (Math.random() - 0.5) * 3000,
//         y: (Math.random() - 0.5) * 3000,
//         baseZ: -Math.random() * CONFIG.loopSize
//       });
//     }

//     // Mouse move
//     const handleMouseMove = (e) => {
//       stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
//       stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     // Scroll handler
//     const handleScroll = () => {
//       const newScroll = window.scrollY;
//       const delta = newScroll - stateRef.current.lastScrollY;
//       stateRef.current.lastScrollY = newScroll;
//       stateRef.current.scroll = newScroll;
//       stateRef.current.targetSpeed = delta;
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });

//     // RAF loop
//     function raf(time) {
//       const delta = time - lastTimeRef.current;
//       lastTimeRef.current = time;

//       if (time % 10 < 1 && fpsRef.current) {
//         fpsRef.current.innerText = Math.round(1000 / delta);
//       }

//       const s = stateRef.current;
//       s.velocity += (s.targetSpeed - s.velocity) * 0.1;
//       // Decay targetSpeed
//       s.targetSpeed *= 0.9;

//       if (velRef.current) velRef.current.innerText = Math.abs(s.velocity).toFixed(2);
//       if (coordRef.current) coordRef.current.innerText = `${s.scroll.toFixed(0)}`;

//       const tiltX = s.mouseY * 5 - s.velocity * 0.5;
//       const tiltY = s.mouseX * 5;

//       world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

//       const baseFov = 1000;
//       const fov = baseFov - Math.min(Math.abs(s.velocity) * 10, 600);
//       viewport.style.perspective = `${fov}px`;

//       const cameraZ = s.scroll * CONFIG.camSpeed;

//       itemsRef.current.forEach(item => {
//         let relZ = item.baseZ + cameraZ;
//         const modC = CONFIG.loopSize;
//         let vizZ = ((relZ % modC) + modC) % modC;
//         if (vizZ > 500) vizZ -= modC;

//         let alpha = 1;
//         if (vizZ < -3000) alpha = 0;
//         else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;

//         if (vizZ > 100 && item.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);
//         if (alpha < 0) alpha = 0;

//         item.el.style.opacity = alpha;

//         if (alpha > 0) {
//           let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

//           if (item.type === 'star') {
//             const stretch = Math.max(1, Math.min(1 + Math.abs(s.velocity) * 0.1, 10));
//             trans += ` scale3d(1, 1, ${stretch})`;
//           } else if (item.type === 'text') {
//             trans += ` rotateZ(${item.rot}deg)`;
//             if (Math.abs(s.velocity) > 1) {
//               const offset = s.velocity * 2;
//               item.el.style.textShadow = `${offset}px 0 red, ${-offset}px 0 cyan`;
//             } else {
//               item.el.style.textShadow = 'none';
//             }
//           } else {
//             const t = time * 0.001;
//             const float = Math.sin(t + item.x) * 10;
//             trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
//           }

//           item.el.style.transform = trans;
//         }
//       });

//       rafRef.current = requestAnimationFrame(raf);
//     }
//     rafRef.current = requestAnimationFrame(raf);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       // Clean up world children
//       while (world.firstChild) world.removeChild(world.firstChild);
//       itemsRef.current = [];
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&family=Syncopate:wght@400;700&display=swap');
//         .hyper-root {
//           margin: 0;
//           padding: 0;
//           background: #030303;
//           color: #e0e0e0;
//           font-family: 'Syncopate', sans-serif;
//           width: 100vw;
//           min-height: 100vh;
//           position: relative;        
//           cursor: crosshair;
//           position: relative;
//         }
//         .hud-line-el::after {
//           content: '';
//           position: absolute;
//           right: 0;
//           top: -2px;
//           width: 5px;
//           height: 5px;
//           background: #ff003c;
//         }
//       `}</style>
//       <>
//       <div
//           ref={scrollProxyRef}
//           style={{
//             height: '10000vh',
//             position: 'absolute',
//             width: '100%',
//             zIndex: -1,
//             top: 0,
//             left: 0,
//           }}
//         />

//       <div className="hyper-root">
//         {/* Scroll proxy - needs to be outside fixed/overflow:hidden context */}
//         {/* <div
//           ref={scrollProxyRef}
//           style={{
//             height: '10000vh',
//             position: 'absolute',
//             width: '100%',
//             zIndex: -1,
//             top: 0,
//             left: 0,
//           }}
//         /> */}

//         {/* Scanlines */}
//         <div
//           style={{
//             position: 'fixed',
//             inset: 0,
//             background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
//             backgroundSize: '100% 4px',
//             pointerEvents: 'none',
//             zIndex: 10,
//           }}
//         />

//         {/* Vignette */}
//         <div
//           style={{
//             position: 'fixed',
//             inset: 0,
//             background: 'radial-gradient(circle, transparent 40%, #000 120%)',
//             zIndex: 11,
//             pointerEvents: 'none',
//           }}
//         />

//         {/* Noise */}
//         <div
//           style={{
//             position: 'fixed',
//             inset: 0,
//             zIndex: 12,
//             opacity: 0.07,
//             pointerEvents: 'none',
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//           }}
//         />

//         {/* HUD */}
//         <div
//           style={{
//             position: 'fixed',
//             inset: '2rem',
//             zIndex: 20,
//             pointerEvents: 'none',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: '10px',
//             color: 'rgba(255,255,255,0.5)',
//             textTransform: 'uppercase',
//           }}
//         >
//           {/* HUD Top */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span>SYS.READY</span>
//             <div
//               className="hud-line-el"
//               style={{
//                 flex: 1,
//                 height: '1px',
//                 background: 'rgba(255,255,255,0.2)',
//                 margin: '0 1rem',
//                 position: 'relative',
//               }}
//             />
//             <span>FPS: <strong ref={fpsRef} style={{ color: '#00f3ff' }}>60</strong></span>
//           </div>

//           {/* Center Nav */}
//           <div
//             style={{
//               alignSelf: 'flex-start',
//               marginTop: 'auto',
//               marginBottom: 'auto',
//               writingMode: 'vertical-rl',
//               transform: 'rotate(180deg)',
//             }}
//           >
//             SCROLL VELOCITY // <strong ref={velRef} style={{ color: '#00f3ff' }}>0.00</strong>
//           </div>

//           {/* HUD Bottom */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span>COORD: <strong ref={coordRef} style={{ color: '#00f3ff' }}>000.000</strong></span>
//             <div
//               className="hud-line-el"
//               style={{
//                 flex: 1,
//                 height: '1px',
//                 background: 'rgba(255,255,255,0.2)',
//                 margin: '0 1rem',
//                 position: 'relative',
//               }}
//             />
//             <span>VER 2.0.4 [BETA]</span>
//           </div>
//         </div>

//         {/* Viewport / 3D World */}
//         <div
//           ref={viewportRef}
//           style={{
//             position: 'fixed',
//             inset: 0,
//             perspective: '1000px',
//             overflow: 'hidden',
//             zIndex: 1,
//           }}
//         >
//           <div
//             ref={worldRef}
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transformStyle: 'preserve-3d',
//               willChange: 'transform',
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1758314896569-b3639ee707c4?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1671649240322-2124cd07eaae?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1673029925648-af80569efc46?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1666533099824-abd0ed813f2a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1671105035554-7f8c2a587201?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1686750875748-d00684d36b1e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1686844462591-393ceae12be0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1686839181367-febb561faa53?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1671199850329-91cae34a6b6d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1685655611311-9f801b43b9fa?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://plus.unsplash.com/premium_photo-1675598468920-878ae1e46f14?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1718036094878-ecdce2b1be95?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0',
];

const TOTAL = 12;
const TIME = 60;
const ITEM_WIDTH = 300;

const CarouselItem = ({ src, index }) => {
  const [hovered, setHovered] = useState(false);
  const delay = -(TIME - (TIME / TOTAL) * index);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        left: '100%',
        display: 'flex',
        justifyContent: 'center',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        animation: `scrollLeft ${TIME}s linear infinite`,
        animationDelay: `${delay}s`,
        willChange: 'left',
        transition: '0.5s ease-in-out',
        cursor: 'pointer',
      }}
    >
      <img
        src={src}
        alt="image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: 'white',
          transform: hovered ? 'rotateY(0deg) translateY(-10px)' : 'rotateY(-45deg)',
          transition: '0.5s ease-in-out',
          WebkitMaskImage: 'linear-gradient(black 70%, transparent 100%)',
          maskImage: 'linear-gradient(black 70%, transparent 100%)',
        }}
      />
    </div>
  );
};

const Section2 = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [90, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'black',
        overflow: 'hidden',
        height: 'min-content',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          objectPosition: 'center',
          rotateX,
          transformOrigin: '50% 0',
        }}
      >
        <picture style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src="https://i.postimg.cc/1ztkf4hX/moveimage.png"
            alt="image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: 'white',
            }}
          />
        </picture>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });
  const [hovered, setHovered] = useState(false);
  const [shimmerLeft, setShimmerLeft] = useState('-100%');

  useEffect(() => {
    if (hovered) {
      setShimmerLeft('100%');
    } else {
      setShimmerLeft('-100%');
    }
  }, [hovered]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(145deg, rgba(255,107,107,0.2) 0%, rgba(255,138,128,0.1) 100%)'
          : 'linear-gradient(145deg, rgba(255,107,107,0.1) 0%, rgba(255,138,128,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: hovered ? '1px solid rgba(255,107,107,0.6)' : '1px solid rgba(255,107,107,0.3)',
        borderRadius: '25px',
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-15px) scale(1.02)' : 'translateY(0px) scale(1)',
      }}
    >
      <div
        style={{
          content: '',
          position: 'absolute',
          top: 0,
          left: shimmerLeft,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,107,107,0.2), transparent)',
          transition: 'left 0.6s ease',
          pointerEvents: 'none',
        }}
      />
      <h3
        style={{
          fontSize: '1.8rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #ff6b6b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '1.1rem',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          color: '#aaa',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

const Section3 = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textContentRef = useRef(null);
  const featuresRef = useRef(null);

  const titleInView = useInView(titleRef, { once: false, margin: '-20% 0px -20% 0px' });
  const subtitleInView = useInView(subtitleRef, { once: false, margin: '-20% 0px -20% 0px' });
  const textContentInView = useInView(textContentRef, { once: false, margin: '-20% 0px -20% 0px' });

  const texts = [
    'Descubre la magia del movimiento continuo con nuestro carrusel de imágenes infinito. Cada elemento se desliza suavemente creando una experiencia visual hipnotizante que captura la atención del espectador.',
    'La animación 3D y los efectos de perspectiva añaden profundidad y dinamismo a cada imagen, mientras que el loop infinito garantiza una experiencia sin interrupciones.',
    'Perfecto para portfolios, galerías de productos o cualquier proyecto que requiera mostrar contenido visual de manera elegante y moderna.',
  ];

  const features = [
    { title: 'Diseño Moderno', description: 'Efectos 3D y animaciones suaves' },
    { title: 'Rendimiento Óptimo', description: 'Animaciones CSS puras sin JavaScript' },
    { title: 'Totalmente Responsive', description: 'Se adapta a cualquier dispositivo' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        padding: '6rem 2rem',
        minHeight: '100vh',
        background: '#000000',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: 'auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(3.5rem, 5vw, 5rem)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8a80 25%, #ffab40 50%, #ff7043 75%, #ff5722 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            position: 'relative',
          }}
        >
          Carrusel Infinito
          <span
            style={{
              content: '',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #ff6b6b, #ff8a80)',
              borderRadius: '2px',
              display: 'block',
            }}
          />
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: 'fit-content',
            marginInline: 'auto',
            fontSize: '1.6rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            color: '#ccc',
            marginBottom: '2rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '-30px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#ff6b6b',
              fontSize: '1.2rem',
            }}
          >
            ◆
          </span>
          Una experiencia visual única
          <span
            style={{
              position: 'absolute',
              right: '-30px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#ff6b6b',
              fontSize: '1.2rem',
            }}
          >
            ◆
          </span>
        </motion.p>

        <div
          ref={textContentRef}
          style={{ marginBottom: '6rem', position: 'relative' }}
        >
          {texts.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={textContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: 'easeOut' }}
              style={{
                fontSize: '1.3rem',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: '#ccc',
                lineHeight: 1.9,
                marginBottom: '2.5rem',
                maxWidth: '700px',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div
          ref={featuresRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginTop: '5rem',
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function ConvertedComponent() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { font-size: 62.5%; }
        body, html { background-color: black; }
        @keyframes scrollLeft {
          to { left: -300rem; }
        }
        .arrow-bounce {
          animation: arrowBounce 1.5s ease-in-out infinite;
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>

      {/* Section 1: Carousel */}
      <section
        style={{
          position: 'relative',
          height: '100svh',
          width: '100%',
          backgroundColor: 'white',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            minWidth: `calc(10rem * ${TOTAL})`,
            height: '300px',
            position: 'relative',
          }}
        >
          {images.map((src, i) => (
            <CarouselItem key={i} src={src} index={i} />
          ))}
        </div>

        <span
          style={{
            position: 'absolute',
            bottom: '5rem',
            left: 0,
            right: 0,
            fontFamily: "'Poppins', sans-serif",
            textAlign: 'center',
            fontSize: '1.6rem',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          Scroll down{' '}
          <span className="arrow-bounce" style={{ display: 'inline-block' }}>↓</span>
        </span>
      </section>

      {/* Section 2: Image Motion */}
      <Section2 />

      {/* Section 3: Content */}
      <Section3 />
    </>
  );
}
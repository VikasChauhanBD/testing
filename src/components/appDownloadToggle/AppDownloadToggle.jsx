import { useState, useEffect, useRef } from "react";
import "./AppDownloadToggle.css";

export default function AppDownloadToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="adt-wrapper" ref={panelRef}>
      {/* ── CLOSED STATE ── */}
      {!isOpen && (
        <button
          className="adt-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open app download"
        >
          {/* Line 1: Get The App */}
          <span className="adt-trigger__label">Get The App</span>

          {/* Line 2: Mobile icon + < arrow */}
          <span className="adt-trigger__bottom-row">
            <span className="adt-trigger__icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="20"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
                <line
                  x1="9"
                  y1="6"
                  x2="15"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="adt-trigger__arrow">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </button>
      )}

      {/* ── OPEN STATE: only > arrow ── */}
      {isOpen && (
        <button
          className="adt-trigger adt-trigger--slim"
          onClick={() => setIsOpen(false)}
          aria-label="Close app download"
        >
          <span className="adt-trigger__arrow">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      )}

      {/* ── QR Panel ── */}
      <div className={`adt-panel ${isOpen ? "adt-panel--open" : ""}`}>
        <div className="adt-panel__inner">
          <p className="adt-panel__headline">Scan to get the</p>
          <p className="adt-panel__subheadline">Edge App</p>

          <div className="adt-panel__qr">
            <svg
              className="adt-panel__qr-icon"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
            >
              <rect
                x="10"
                y="10"
                width="30"
                height="30"
                rx="4"
                fill="currentColor"
              />
              <rect x="16" y="16" width="18" height="18" rx="2" fill="white" />
              <rect x="20" y="20" width="10" height="10" fill="currentColor" />
              <rect
                x="60"
                y="10"
                width="30"
                height="30"
                rx="4"
                fill="currentColor"
              />
              <rect x="66" y="16" width="18" height="18" rx="2" fill="white" />
              <rect x="70" y="20" width="10" height="10" fill="currentColor" />
              <rect
                x="10"
                y="60"
                width="30"
                height="30"
                rx="4"
                fill="currentColor"
              />
              <rect x="16" y="66" width="18" height="18" rx="2" fill="white" />
              <rect x="20" y="70" width="10" height="10" fill="currentColor" />
              <rect x="50" y="50" width="6" height="6" fill="currentColor" />
              <rect x="60" y="50" width="6" height="6" fill="currentColor" />
              <rect x="70" y="50" width="6" height="6" fill="currentColor" />
              <rect x="80" y="50" width="6" height="6" fill="currentColor" />
              <rect x="50" y="60" width="6" height="6" fill="currentColor" />
              <rect x="70" y="60" width="6" height="6" fill="currentColor" />
              <rect x="60" y="70" width="6" height="6" fill="currentColor" />
              <rect x="80" y="70" width="6" height="6" fill="currentColor" />
              <rect x="50" y="80" width="6" height="6" fill="currentColor" />
              <rect x="60" y="80" width="6" height="6" fill="currentColor" />
              <rect x="80" y="80" width="6" height="6" fill="currentColor" />
              <circle cx="50" cy="50" r="6" fill="white" />
              <circle cx="50" cy="50" r="4" fill="#0078d4" />
            </svg>
          </div>

          <p className="adt-panel__hint">Point your camera at the QR code</p>

          <div className="adt-panel__divider">
            <span className="adt-panel__divider-line" />
            <span className="adt-panel__divider-text">OR</span>
            <span className="adt-panel__divider-line" />
          </div>

          <div className="adt-panel__stores">
            <a href="#" className="adt-panel__store-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a href="#" className="adt-panel__store-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.18 23.76c.3.17.64.22.99.14l12.45-7.19-2.78-2.79-10.66 9.84zM.79 1.07C.3 1.6 0 2.37 0 3.37v17.26c0 1 .3 1.77.8 2.3l.12.11 9.68-9.68v-.23L.91.96.79 1.07zm19.53 10.16L17.6 9.5l-2.79 2.79 2.93 2.93 1.58-.91c.9-.52.9-1.57 0-2.09v.01zM3.18.25l12.45 7.19-2.78 2.78L2.19.38c.3-.17.68-.18.99-.13z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

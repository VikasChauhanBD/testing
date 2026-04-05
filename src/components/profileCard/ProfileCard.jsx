import "./ProfileCard.css";

export default function ProfileCard() {
  return (
    <div className="card">
      {/* Mail Button */}
      <button className="mail">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-mail"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </button>

      {/* Profile Picture */}
      <div className="profile-pic">
        <svg
          version="1.1"
          id="svg2"
          width="666.66669"
          height="666.66669"
          viewBox="0 0 666.66669 666.66669"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs6">
            <clipPath clipPathUnits="userSpaceOnUse" id="clipPath408">
              <path
                d="m 699.926,0 h 3600.16 V 4818.31 H 699.926 Z"
                id="path406"
              />
            </clipPath>
          </defs>
          <g id="g8" transform="matrix(1.3333333,0,0,-1.3333333,0,666.66667)">
            <g id="g10" transform="scale(0.1)">
              <path
                d="M 0,0 H 5000 V 5000 H 0 Z"
                style={{
                  fill: "#fff8f6",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="path12"
              />
              <path
                d="M 0,1126.2 H 4487.25 V 5000 H 0 Z"
                style={{
                  fill: "#fef0ef",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="path14"
              />
              <path
                d="M 5000,561.691 4487.25,1126.2 V 5000 H 5000 V 561.691"
                style={{
                  fill: "#fde4e1",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="path16"
              />
              <path
                d="M 4487.25,1146.2 5000,590.422 V 530.859 L 4487.25,1106.22 0,1106.2 v 40 h 4487.25"
                style={{
                  fill: "#fcd0ce",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="path18"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Panel */}
      <div className="bottom">
        <div className="content">
          <span className="name">My Name</span>
          <span className="about-me">
            Lorem ipsum dolor sit amet consectetur adipisicinFcls
          </span>
        </div>
        <div className="bottom-bottom">
          <div className="social-links-container">
            {/* Instagram */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="social-icon"
            />
            {/* X (Twitter) */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
              alt="X Twitter"
              className="social-icon"
            />
            {/* GitHub */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="GitHub"
              className="social-icon"
            />
          </div>

          <button className="button">Contact Me</button>
        </div>
      </div>
    </div>
  );
}

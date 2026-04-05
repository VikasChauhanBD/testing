import "./Loader.css";

export default function Loader() {
  return (
    <div className="main">
      <div className="up">
        <div className="loaders">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="loader" key={i}></div>
          ))}
        </div>
        <div className="loadersB">
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="loaderA" key={i}>
              <div className={`ball${i}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

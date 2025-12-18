import React from "react";
import "./App.css";
import Projects from "./components/Projects";
import Step from "./components/Step";
import Test from "./components/Test";
import Demo from "./components/demo/Demo";
import HobbitonScroll from "./components/HobbitonScroll";
import CardCarousel from "./components/CardCarousel";

function App() {
  return (
    <>
      <div className="folder-icon">
        {/* <Projects /> */}
        {/* <Step /> */}
        {/* <Test /> */}
        {/* <Demo /> */}
        {/* <HobbitonScroll /> */}
        <CardCarousel />
      </div>
    </>
  );
}

export default App;

import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

export default function Cards() {
  return (
    <div className="cards">
      <div className="card--glass">
        <div className="card__content">
          <h1 className="card__title">Home</h1>
          <h1 className="card__title">Blogs</h1>
          {/* <nav className="blog-breadcrumb"> */}
          <span className="card_span">›</span>
          <a className="card_a">Home</a>
          <span className="card_span">›</span>
          <a className="card_a">Blogs</a>
          <span className="card_span">›</span>
          {/* <span className="blog-breadcrumb-current">
              {blog.metaTitle.substring(0, 50)}...
            </span> */}
          {/* </nav> */}
        </div>
      </div>
    </div>
  );
}

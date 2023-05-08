import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-about-logo">
        <i className="fa-solid fa-wave-square fa-2xl"></i>
        <p>whateverBnb</p>
      </div>
      <a
        href="https://github.com/xuelanwu"
        className="about-contact splash-contact"
        target="_blank"
      >
        <i className="fa-brands fa-github fa-2xl"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/xuelan-wu-ba354a1b0/"
        className="about-contact splash-contact"
        target="_blank"
      >
        <i className="fa-brands fa-linkedin fa-2xl"></i>
      </a>
    </div>
  );
};

export default Footer;

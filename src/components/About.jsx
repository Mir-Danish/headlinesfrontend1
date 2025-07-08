import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          We are a leading news organization dedicated to providing accurate, 
          timely, and comprehensive coverage of events that matter to our readers.
        </p>
        <p>
          Our mission is to deliver high-quality journalism that informs, 
          educates, and empowers our audience with the information they need 
          to make informed decisions.
        </p>
        <div className="values">
          <h2>Our Values</h2>
          <ul>
            <li>Accuracy and Truth</li>
            <li>Unbiased Reporting</li>
            <li>Timely Coverage</li>
            <li>Community Engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 
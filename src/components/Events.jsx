import React from 'react';

const Events = () => {
  return (
    <div className="events">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        <div className="event-card">
          <h3>Press Conference</h3>
          <p className="event-date">December 15, 2024</p>
          <p>Join us for our monthly press conference covering the latest developments.</p>
        </div>
        <div className="event-card">
          <h3>Community Forum</h3>
          <p className="event-date">December 20, 2024</p>
          <p>Open discussion forum on local community issues and developments.</p>
        </div>
        <div className="event-card">
          <h3>Media Workshop</h3>
          <p className="event-date">January 5, 2025</p>
          <p>Educational workshop on media literacy and fact-checking.</p>
        </div>
      </div>
    </div>
  );
};

export default Events; 
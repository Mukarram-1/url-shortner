import React from "react";
import "../../../src/analyticscard.css";

function AnalyticsCard({ icon, heading, number }) {
  return (
    <div className="analytics-card">
      <div className="analytics-card-icon">{icon}</div>
      <div className="analytics-card-content">
        <h3 className="analytics-card-heading">{heading}</h3>
        <p className="analytics-card-number">{number}</p>
      </div>
    </div>
  );
}

export default AnalyticsCard;

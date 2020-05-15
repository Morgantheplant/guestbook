import React from "react";
import Typography from "@material-ui/core/Typography";

export const CardPreview = (props) => (
  <div
    className="polaroid-container"
    style={{ display: "flex", flexDirection: "column" }}
  >
      <img
        src="./polaroidback.png"
        alt="back of polaroid"
        className="polaroid-back"
      />
      <div className="polaroid-text">
        <Typography style={{ fontFamily: "'Permanent Marker', cursive", 'margin-bottom': '20px' }}>
          {props.message ? props.message : '- your message will go here! -'}
        </Typography>
        <Typography style={{ fontFamily: "'Permanent Marker', cursive" }}>
          {props.name ? `- ${props.name}` : ''}
        </Typography>
      </div>
  </div>
);

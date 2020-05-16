import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";

const getPolaroidUrl = (imageData) =>
  imageData && imageData.path
    ? imageData.path
    : `./placeholders/${Math.round(Math.random() * 21)}.png`;

export const CardPreview = (props) => {
  const polaroidImageSrc = getPolaroidUrl(props.imageData) || "";
  const hasPicture = !!(props.imageData && props.imageData.path);
  return (
    <Tooltip
    title={
      hasPicture
        ? ""
        : "This pitcure will be random if don't add your own!"
    }
  >
    <div
      className="polaroid-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="polaroid-container-inner">
        <div className="polaroid-back-container">
          <img
            src="./polaroidback.png"
            alt="back of polaroid"
            className="polaroid-back-image"
          />
          <div className="polaroid-text">
            <Typography
              style={{
                fontFamily: "'Permanent Marker', cursive",
                "margin-bottom": "20px",
              }}
            >
              {props.message ? props.message : "( your message will go here )"}
            </Typography>
            <Typography style={{ fontFamily: "'Permanent Marker', cursive" }}>
              {props.name ? `- ${props.name}` : ""}
            </Typography>
          </div>
        </div>
        <div className="polaroid-front-container">
          <img src="./polaroid1.png" className="polaroid-front-image" alt="" />

          <img
            src={polaroidImageSrc}
            className="preload-polaroid-image"
            alt=""
          />

            <div
              className="polaroid-image"
              style={{ backgroundImage: `url(${polaroidImageSrc})` }}
            />
          
          <div
            className={classNames("picture-text", {
              "has-picture": hasPicture,
            })}
          >
            {props.name}
          </div>
        </div>
      </div>
      <section></section>
    </div>
    </Tooltip>
  );
};

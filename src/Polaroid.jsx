import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import {IMAGE_BASE_URL} from './constants';

const getPolaroidUrl = (photo) =>
  photo && photo.path
    ? photo.path
    : `${IMAGE_BASE_URL}/placeholders/${Math.ceil(Math.random() * 21)}.png`;

export const Polaroid = (props) => {
  const polaroidImageSrc = getPolaroidUrl(props.photo) || "";
  const hasPicture = !!(props.photo && props.photo.path);
  const [position, setPosition] = React.useState(props.backForward);
  const handleClick = ()=> {
    setPosition(prevState => !prevState);
  }
  return (
    <div
      className="polaroid-container"
      style={{ display: "flex", flexDirection: "column" }}
      onClick={handleClick}
    >
      <div className="polaroid-container-inner">
        <div className={classNames("polaroid-back-container", {
          reversed: !position
        })}>
          <img
            src={`${IMAGE_BASE_URL}/polaroidback.png`}
            alt="back of polaroid"
            className="polaroid-back-image"
          />
          <div className="polaroid-text">
            <Typography
              style={{
                fontFamily: "'Permanent Marker', cursive",
              }}
            >
              {props.message ? props.message : "( your message will go here )"}
            </Typography>
            <Typography style={{ fontFamily: "'Permanent Marker', cursive" }}>
              {props.name ? `- ${props.name}` : ""}
            </Typography>
          </div>
        </div>
        <div className={classNames("polaroid-front-container", {
          reversed: position
        })}>
          <img src={`${IMAGE_BASE_URL}/polaroid1.png`} className="polaroid-front-image" alt="" />

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
  );
};

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Camera from "react-html5-camera-photo";
import Alert from "@material-ui/lab/Alert";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import "react-html5-camera-photo/build/css/index.css";
import classNames from "classnames";
import { uploadPicture } from "./upload";
import BackupIcon from '@material-ui/icons/Backup';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

export const TakePictureModal = (props) => {
  const [imageUrl, setImageUrl] = React.useState();
  const [isUploading, setIsUploading] = React.useState();
  const [error, setError] = React.useState("");
  const handleTakePhoto = (data) => {
    console.log();
    setImageUrl(data);
  };
  const handleSave = () => {
    if (!isUploading && imageUrl) {
      setIsUploading(true);
      setError("");
      uploadPicture(imageUrl)
        .then(function (response) {
          setIsUploading(false);
          props.onSave(response.data);
        })
        .catch(function (error) {
          setIsUploading(false);
          setError(
            "There was an error uploading your picture. Please try a different image or retry in a little bit."
          );
        });
    }
  };
  return (
    <Dialog
      open={props.isModalOpen}
      transitionDuration={500}
      onClose={props.onClose}
      classes={{
          paper: 'selfie-popup'
      }}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="picture-modal"
    >
    
      {!imageUrl ? (
        <Camera
          className="selfie-cam"
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      ) : (
        <img id="selfie" src={imageUrl} title="Your photo" alt="selfie" />
      )}
      {error && <Alert className="selfie-alert" severity="error">{error}</Alert>}
      <DialogActions className="selfie-buttons">
        <Button className="selfie-btn"  disabled={isUploading} onClick={props.onClose}>
          Cancel
        </Button>
        {imageUrl && <Button startIcon={<CameraAltIcon/>} disabled={isUploading} className="selfie-btn white-outline" variant="outlined" onClick={() => setImageUrl(null)}>Retake</Button>}
        {imageUrl && <Button startIcon={<BackupIcon/>} disabled={isUploading} className="selfie-btn white-outline" variant="outlined" onClick={handleSave}>Save</Button>}
      </DialogActions>
      <LinearProgress
        className={classNames('selfie-loader',{
          hide: !isUploading,
        })}
      />
    </Dialog>
  );
};

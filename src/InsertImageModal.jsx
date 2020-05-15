import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { uploadImageFile } from "./upload";

export const InsertImageModal = (props) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState("");
  const onDrop = (acceptedFiles) => {
    if (!isUploading) {
      setIsUploading(true);
      setError("");
      uploadImageFile(acceptedFiles)
        .then(function (response) {
          console.log("uploaded: ", response);
          setIsUploading(false);
          props.onSave(response.data);
        })
        .catch(function (error) {
          setIsUploading(false);
          setError(
            "There was an error uploading your image. Please try a different image or retry in a little bit."
          );
        });
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });
  return (
    <Dialog
      open={props.isModalOpen}
      transitionDuration={500}
      onClose={props.onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Upload Image</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <section
          {...getRootProps({
            className: classNames("dropzone", "image-drop-zone-container", {
              disabled: isUploading,
            }),
          })}
        >
          <input {...getInputProps()} />
          <PhotoLibrary />
          <p>
            Drag 'n' drop an Image, or click <br />
            to select one from your computer
          </p>
        </section>
      </DialogContent>
      <DialogActions>
        <Button disabled={isUploading} onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
        <LinearProgress
            className={classNames({
              hide: !isUploading,
            })}
          />
    </Dialog>
  );
};

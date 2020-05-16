import React from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import InsertPhoto from "@material-ui/icons/InsertPhoto";
import { InsertImageModal } from "./InsertImageModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import classNames from "classnames";
import { TakePictureModal } from "./TakePictureModal";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {CardPreview} from './CardPreview';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid"

const fields = [
  {
    id: "message",
    label: "Message",
    type: TextField,
    required: true,
    props: {
      multiline: true,
      rowsMax: Infinity,
      variant: "outlined",
      rows: 5,
    },
  },
  {
    id: "name",
    label: "Name",
    type: TextField,
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: TextField,
    required: false,
    helperText: '(optional)'
  },
];

const getInitialTouchedState = () =>
  fields.reduce((acc, field) => {
    acc[field.id] = !field.required;
    return acc;
  }, {});

const getInitialValues = () =>
  fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

const removeImageIfExists = (imageData) => {
  if (imageData && imageData.cid) {
    axios.delete(`http://localhost:3000/image/${imageData.cid}`);
  }
};

const TOAST_TYPE = {
  validation: "validation",
  success: "success",
  error: "error",
};

const TOAST_VALUES = {
  validation: {
    severity: "info",
    message: "Please fill out required fields",
    duration: 1500,
  },
  success: {
    severity: "success",
    message: "Yay! Thanks for submitting! We 💖 you!",
    duration: 3000,
  },
  error: {
    severity: "error",
    message: "oh no! something went wrong! Please try again",
    duration: 3000,
  },
};

const allFieldsTouched = () =>
  fields.reduce((acc, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {});

const SUBMIT_STATES = {
  submitted: "submitted",
  submitting: "submitting",
  idle: "idle",
};

export const GuestBook = (props) => {
  const [touched, setTouched] = React.useState(getInitialTouchedState());
  const [values, setValues] = React.useState(getInitialValues());
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = React.useState(false);
  const [submitState, setSubmitState] = React.useState(SUBMIT_STATES.idle);
  const [toastType, setToastType] = React.useState(null);
  const [imageData, setImageData] = React.useState(null);
  const handleUploadModalOpen = () => {
    removeImageIfExists(imageData);
    setIsUploadModalOpen(true);
  };
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastType(null);
  };
  const handleCameraModalOpen = () => {
    removeImageIfExists(imageData);
    setIsCameraModalOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const allValid = props.fields.every(
      (field) => !field.required || !!values[field.id].trim()
    );
    if (!allValid) {
      setTouched(allFieldsTouched());
      setToastType(TOAST_TYPE.validation);
      return;
    }
    setSubmitState(SUBMIT_STATES.submitting);
    axios
      .post("http://localhost:3000/message", {
        ...values,
        image_id: imageData ? imageData.cid : "",
      })
      .then(function (response) {
        setToastType(TOAST_TYPE.success);
      })
      .catch(function (error) {
        setToastType(TOAST_TYPE.error);
        TOAST_VALUES.error.message =
          "Well this is embarassing. " +
          "Morgan built this is his spare time. This might be broken, but don't let it distract from the stream!";
        TOAST_VALUES.error.duration = 4000;
      });
  };
  const toast = TOAST_VALUES[toastType];
  return (
    <Container>
      <InsertImageModal
        isModalOpen={isUploadModalOpen}
        imageData={imageData}
        onClose={() => {
          setIsUploadModalOpen(false);
        }}
        onSave={(image) => {
          setImageData(image);
          setIsUploadModalOpen(false);
        }}
      />
      <TakePictureModal
        isModalOpen={isCameraModalOpen}
        onClose={() => {
          setIsCameraModalOpen(false);
        }}
        onSave={(image) => {
          setImageData(image);
          setIsCameraModalOpen(false);
        }}
      />
      <Card
        variant="outlined"
        style={{ display: "flex", flexDirection: "column", margin: "20px" }}
      >
        <CardHeader title="Sign our public guestbook" />
        <Collapse in={!!imageData} timeout="auto" unmountOnExit>
          <div className="image-wrapper">
            <CardMedia
              className="guest-message-media"
              image={imageData ? imageData.path : ""}
              title="Your photo (see preview below)"
            />
          </div>
        </Collapse>
        <CardContent className="guest-message-form">
          <div className="image-buttons">
            {imageData && (
              <div className="image-button">
                <Tooltip title="Remove image">
                  <Fab
                    size="small"
                    onClick={() => {
                      removeImageIfExists(imageData);
                      setImageData(null);
                    }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </div>
            )}
            <div className="image-button">
              <Tooltip title="Take photo">
                <Fab size="small" onClick={handleCameraModalOpen}>
                  <PhotoCameraIcon />
                </Fab>
              </Tooltip>
            </div>
            <div className="image-button">
              <Tooltip title="Upload image">
                <Fab size="small" onClick={handleUploadModalOpen}>
                  <InsertPhoto />
                </Fab>
              </Tooltip>
            </div>
          </div>

          <form>
            {props.fields.map((field) => {
              const Component = field.type;
              const value = values[field.id];
              const hasError =
                touched[field.id] && field.required && !value.trim();
              return (
                <div
                  key={field.id}
                  className={classNames("guestbook-input", field.id)}
                >
                  <Component
                    {...field.props}
                    fullWidth
                    value={value}
                    label={field.label}
                    error={hasError}
                    helperText={hasError ? "Required" : (field.helperText)}
                    onChange={({ target }) => {
                      const { value } = target;
                      setValues((prevState) => ({
                        ...prevState,
                        [field.id]: value,
                      }));
                    }}
                    onBlur={() => {
                      setTouched((prevState) => ({
                        ...prevState,
                        [field.id]: true,
                      }));
                    }}
                  />
                </div>
              );
            })}
          </form>
        </CardContent>
        <CardActions className="submit-button">
        <Tooltip title="This is public! See preview below before posting.">
          <Button
            disabled={submitState === SUBMIT_STATES.submitting}
            onClick={
              submitState === SUBMIT_STATES.idle ? handleSubmit : undefined
            }
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
          </Tooltip>
        </CardActions>
      </Card>
      <Snackbar
        open={toastType}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={toast ? toast.duration : 1500}
        onClose={handleCloseToast}
      >
        {toast && (
          <Alert elevation={6} variant="filled" severity={toast.severity}>
            {toast.message}
          </Alert>
        )}
      </Snackbar>
      <Typography>Preview:</Typography>
      <CardPreview {...values} imageData={imageData} />
    </Container>
  );
};

GuestBook.defaultProps = {
  fields,
};

import React from "react";
import "./App.css";
import axios from "axios";
import { GuestBookForm } from "./GuestBookForm";
import { Polaroid } from "./Polaroid";
import Grid from "@material-ui/core/Grid";
import { API_BASE_URL, LOVE_MESSAGE } from "./constants";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {
  const [messages, setMessage] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/messages`)
      .then((response) => setMessage(response.data))
      .catch((e) => console.log(e));
    console.log(LOVE_MESSAGE);
  }, []);

  return (
    <div className="App">
      <div className="livestream-wrapper">
        <iframe
          title="livestream"
          id="livestream"
          src="https://www.youtube.com/embed/XYla-_onab8"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <Grid
          container
          justify="center"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom style={{fontFamily: "'Restless Youth Small Caps', cursive", fontSize: '32px'}}>
              Welcome to our wedding!{" "}
            </Typography>

            <Typography variant="body1" gutterBottom style={{marginTop: '30px', paddingLeft: '10px'}}>
              Thank you for joining us on our special day! While this isn't
              quite what we had in mind, we are overjoyed to have found a way to
              be married on the day we intended with the (virtual) presence of
              our loved ones. It means so much to have your support and we truly
              can not wait to celebrate with each and every one of you in
              person. In the meantime, be sure to snap a polaroid and sign our
              guestbook! We love you!{" "}
            </Typography>
          </Grid>
        </Grid>

        <div className="guest-book-wrapper" style={{ marginTop: "40px" }}>
          <GuestBookForm onSubmitMessage={(message)=>{
            setMessage(prevState=> [message, ...prevState]);
          }}/>
        </div>

        <Container maxWidth="l">
          <div className="guestbook-heading-container">
            <Typography variant="h1" className="title" gutterBottom>
              Guestbook:
            </Typography>
          </div>
          <Grid container spacing={3} justify="center">
            {messages && messages.length ? messages.map((msg) => {
              return (
                <Grid item spacing={6}>
                  <div style={{ maxWidth: "300px" }}>
                    <Polaroid {...msg} />
                  </div>
                </Grid>
              );
            }) : <Typography>No notes added! Create one above!</Typography>}
            {!messages && <CircularProgress color="secondary" />}
          </Grid>
        </Container>

          <footer>
        <Typography  variant="overline"> - Jaclyn + Morgan ❤️ You -</Typography>
        </footer>
      </div>
    </div>
  );
};

export default App;

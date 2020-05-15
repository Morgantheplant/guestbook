import React from "react";
import "./App.css";

import { GuestBook } from "./GuestBook";
function App() {
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
      </div>
      
      <div className="guest-book-wrapper">
        <GuestBook />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import logo from "./logo.svg";
import { WebMidi } from "webmidi";
// import './App.css';
function App() {
  WebMidi.enable()
    .then(() => {
      if (WebMidi.inputs < 1 && WebMidi.outputs < 1) {
        console.log("no devices detected!");
      } else {
        console.log('inputs: ', WebMidi.inputs, ' outputs: ', WebMidi.outputs);
        // Inputs
      }
    }).catch((err) => console.log(err));
  
    let output = WebMidi.outputs[0];
    let channel = output?.channels[1];
    
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Typography variant="h2">webmidi thing</Typography>
          <Typography variant="h3">inputs:</Typography>
          <TextField
            id="standard-basic"
            color="secondary"
            type="number"
            label="Pitch"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            color="secondary"
            type="number"
            label="velocity"
            variant="outlined"
          />
          <Button
            onClick={() => channel?.playNote("C3", { duration: 1000 })}
            variant="contained"
          >
            note
          </Button>
          <Button variant="contained" onClick={() => channel.sendControlChange(3, 60)}>cc</Button>
        </header>
      </div>
    </>
  );
}

export default App;

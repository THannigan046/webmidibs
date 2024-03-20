import {React, useState} from "react";
import {
  Stack,
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  Input, 
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
        console.log("inputs: ", WebMidi.inputs, " outputs: ", WebMidi.outputs);
        // Inputs
      }
    })
    .catch((err) => console.log(err));

  let output = WebMidi.outputs[0];
  let channel = output?.channels[1];
  const [ccArray, setCcArray] = useState([{cc: 1, value: 60}]);
  console.log("🚀 ~ App ~ ccArray:", ccArray)

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Typography variant="h2">webmidi thing</Typography>
          <Typography variant="h3">inputs:</Typography>
          {WebMidi.inputs.map((input) => (
            <Typography variant="h5" key={input.id}>
              {input.name}{" "}
            </Typography>
          ))}
          <Typography variant="h3">outputs:</Typography>
          {WebMidi.outputs.map((output) => (
            <Typography variant="h5" key={output.id}>
              {output.name}{" "}
            </Typography>
          ))}
          {/* <TextField
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
          /> */}
          <Button
            onClick={() => channel?.playNote("C3", { duration: 1000 })}
            variant="contained"
          >
            note
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              channel.sendControlChange(3, 63).sendControlChange(13, 85)
            }
          >
            cc
          </Button>
        </header>
          <Button onClick={() => setCcArray([...ccArray, {cc: 1, value: 60}])} variant="contained">New Row</Button>
        <Stack direction="row" spacing={2}>
          {ccArray.map((cc, index) => (
            <Stack border={'1px solid black'} key={index}>
              <Input onChange={(e) => setCcArray([...ccArray.slice(0, index), {cc: +e.target.value, value: cc.value}, ...ccArray.slice(index + 1)])} placeholder="cc" value={cc.cc} />
              <Input onChange={(e) => setCcArray([...ccArray.slice(0, index), {cc: cc.cc, value: +e.target.value}, ...ccArray.slice(index + 1)])} placeholder="value" value={cc.value} />
            </Stack>
          ))}
        </Stack>
        <Button onClick={() => {
          ccArray.forEach(cc => {
            console.log(cc.value)
            channel?.sendControlChange(cc.cc, cc.value)
          })
        }} variant="contained">send</Button>
      </div>
    </>
  );
}

export default App;

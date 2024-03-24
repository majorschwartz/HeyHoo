import { useState } from 'react';
import VideoStream from './components/VideoStream';
import AudioRecorder from './components/AudioRecorder';
import Bubble from './components/Bubble';

import './App.css';

function App() {
  const [bubbleState, setBubbleState] = useState("waiting");

  return (
    <div className="App">
      <VideoStream />
      <AudioRecorder />
      <Bubble bubbleState={bubbleState} setBubbleState={setBubbleState} />
    </div>
  );
}

export default App;

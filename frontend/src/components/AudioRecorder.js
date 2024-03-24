import React, { useState, useRef, useEffect } from 'react';

const AudioRecorder = () => {
  const [microphoneStatus, setMicrophoneStatus] = useState('');
  const [response, setResponse] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startChat = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(stream => {
        setMicrophoneStatus('Microphone status: Active');
        activateVoice();
      })
      .catch(err => {
        console.log('An error occurred: ' + err);
        setMicrophoneStatus('Error accessing microphone: ' + err.message);
      });
  };

  const activateVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;

      recognition.onstart = () => {
        setMicrophoneStatus('Listening...');
      };

      recognition.onresult = event => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i][0].transcript.toLowerCase();
          console.log('Recognition result:', result);
          setMicrophoneStatus('Detected speech: ' + result);

          if (result.includes('hey paris')) {
            console.log('Keyword detected. Prompting user.');
            recognition.stop();
            promptUser();
            break;
          } else if (result.includes('bye paris')) {
            recognition.stop();
            break;
          }
        }
      };

      recognition.onerror = event => {
        console.error('Recognition error:', event.error);
        setMicrophoneStatus('Recognition error: ' + event.error);
      };

      recognition.onend = () => {
        setMicrophoneStatus('Speech recognition stopped.');
      };

      recognition.start();
    } else {
      setMicrophoneStatus('Speech recognition not supported in your browser.');
    }
  };

  const promptUser = () => {
    const userPrompt = window.prompt('Please enter your prompt:');
    if (userPrompt !== null && userPrompt.trim() !== '') {
      // sendRequest(userPrompt);
    }
  };

  // const sendRequest = prompt => {
  //   const imageBase64 = captureImage();
  //   axios.post('/process_request', { prompt, image: imageBase64 })
  //     .then(res => {
  //       setResponse(res.data);
  //     })
  //     .catch(err => {
  //       console.error('Error:', err);
  //     });
  // };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div>
      <h1>AI Chat</h1>
      <button onClick={startChat}>Start Chat</button>
      <div>{response}</div>
    </div>
  );
}

export default AudioRecorder;

// import { useEffect, useRef, useState } from 'react';

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const socketRef = useRef(null);

//   const startRecording = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         mediaRecorderRef.current = new MediaRecorder(stream);
//         recognition.continuous = true

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           if (socketRef.current.readyState === WebSocket.OPEN) {
//             socketRef.current.send(event.data);
//           }
//         };

//         mediaRecorderRef.current.start();
//         setIsRecording(true);
//       })
//       .catch((error) => {
//         console.error('Error accessing microphone:', error);
//       });
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   useEffect(() => {
//     // Connect to the WebSocket server
//     socketRef.current = new WebSocket('ws://localhost:8000/ws');

//     // Handle WebSocket connection open
//     socketRef.current.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     socketRef.current.onmessage = (event) => {
//       console.log('This message is coming from the backend');

//       if ('speechSynthesis' in window) {
//         const utterance = new SpeechSynthesisUtterance(event.data);
//         window.speechSynthesis.speak(utterance);
//       } else {
//         console.log('Text-to-speech is not supported in this browser.');
//       }
//     };

//     // Handle WebSocket connection close
//     socketRef.current.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     // Handle WebSocket errors
//     socketRef.current.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     setTimeout(() => {
//       startRecording();
//     }, 1000);
    
//     // startRecording();

//     // Clean up the WebSocket connection on component unmount
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, []);

//   return;
// };

// export default AudioRecorder;
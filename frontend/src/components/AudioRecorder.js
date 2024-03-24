import { useEffect, useRef, useState } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(event.data);
          }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = new WebSocket('ws://localhost:8000/ws');

    // Handle WebSocket connection open
    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    socketRef.current.onmessage = (event) => {
      console.log('This message is coming from the backend');
    };

    // Handle WebSocket connection close
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Handle WebSocket errors
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setTimeout(() => {
      startRecording();
    }, 1000);
    
    // startRecording();

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return;
};

export default AudioRecorder;
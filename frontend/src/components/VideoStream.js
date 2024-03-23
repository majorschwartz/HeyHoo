import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    var currentFrame = videoRef.current;

    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          currentFrame.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing video stream:', error);
      }
    };

    getVideoStream();

    return () => {
      // Cleanup: stop video stream when component unmounts
      if (currentFrame && currentFrame.srcObject) {
        const stream = currentFrame.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Video Stream</h1>
      <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', transform: 'scaleX(-1)' }} />
    </div>
  );
};

export default VideoStream;

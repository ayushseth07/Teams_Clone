import React, { useEffect, useRef } from 'react';

const VideoCard = (props) => {
  const ref = useRef();
  const peer = props.peer;
  const width = props.width

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);

  return (
    <video
      playsInline
      autoPlay
      ref={ref}
      style={{backgroundSize: "cover", overflow: "hidden", width: width}}
    />
  );
};


export default VideoCard;

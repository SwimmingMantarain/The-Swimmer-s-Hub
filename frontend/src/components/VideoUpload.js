import React from 'react';

const VideoUpload = () => {
  return (
    <div className="video-upload">
      <input type="file" accept="video/*" />
      <button>Upload</button>
    </div>
  );
};

export default VideoUpload;

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Loader = ({ size, text }) => {
  return (
    <div className="loader-container">
      <LoadingSpinner size={size || 'md'} />
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
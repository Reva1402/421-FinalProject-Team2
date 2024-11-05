import React from 'react';
import './Styling.css';
import './Model.css';

const Model = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="model-overlay">
      <div className="model">
        <h4 className="close-btn" onClick={onClose}>X</h4>
        {children}
      </div>
    </div>
  );
}

export default Model;

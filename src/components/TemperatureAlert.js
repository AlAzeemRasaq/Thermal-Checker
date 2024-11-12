import React, { Component } from "react";
import "/css/Notification.css";

import React, { useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
  // Automatically close the notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  // Notification styles based on type
  const notificationStyles = {
    padding: '1em',
    marginBottom: '1em',
    borderRadius: '5px',
    color: '#fff',
    textAlign: 'center',
    width: '250px',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: type === 'error' ? '#f44336' : '#4caf50',
  };

  return (
    <div style={notificationStyles}>
      {message}
    </div>
  );
};

export default Notification;
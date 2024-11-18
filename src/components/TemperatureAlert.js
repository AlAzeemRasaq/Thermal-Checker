import React, { useEffect } from 'react';
import "/css/Notification.css";

const Notification = ({ message, type = 'info', onClose }) => {
  // Automatically close the notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div>
      {message}
    </div>
  );
};

export default Notification;
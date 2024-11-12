import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import React, { useState } from 'react';
import Notification from './components/TemperatureAlert';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

const App = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div style={{ padding: '2em' }}>
      <h1>Home Temperature Monitor</h1>
      <button onClick={handleShowNotification}>Show Notification</button>

      {showNotification && (
        <Notification 
          message="Temperature alert: Room temperature out of range!"
          type="error" // 'error' for red, 'info' for green
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default App;

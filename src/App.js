import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import RoomFunctionality from './components/RoomFunctionality';
import TemperatureAlert from './components/TemperatureAlert';
import Notification from './components/TemperatureAlert'; // Correct component import
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/RoomFunctionality" element={<RoomFunctionality />} />
          <Route path="/TemperatureAlert" element={<TemperatureAlert />} />
        </Routes>
      </BrowserRouter>
      
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
    </>
  );
}

export default App;

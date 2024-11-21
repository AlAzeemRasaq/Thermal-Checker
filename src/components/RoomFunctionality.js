import React, { Component } from "react";
import axios from "axios";

export default class RoomFunctionality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      isFormVisible: false,
      newRoom: { name: "", temperature: "", type: "" },
      formErrors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    this.updateTemperature = this.updateTemperature.bind(this);
  }

  // Toggle form visibility
  toggleFormVisibility() {
    this.setState({ isFormVisible: !this.state.isFormVisible, formErrors: {} });
  }

  // Handle input change
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      newRoom: { ...this.state.newRoom, [name]: value },
    });
  }

  // Form validation
  validateForm() {
    const errors = {};
    const { name, temperature, type } = this.state.newRoom;

    if (!name.trim()) errors.name = "Room name is required.";
    if (!type.trim()) errors.type = "Room type is required.";
    if (!temperature || isNaN(temperature) || Number(temperature) <= 0) {
      errors.temperature = "Temperature must be a positive number.";
    }

    this.setState({ formErrors: errors });
    return Object.keys(errors).length === 0; // No errors mean the form is valid
  }

  // Add a new room with validation
  addRoom() {
    if (!this.validateForm()) return;

    const newRoom = {
      id: Date.now(),
      ...this.state.newRoom,
    };

    this.setState((prevState) => ({
      rooms: [...prevState.rooms, newRoom],
      newRoom: { name: "", temperature: "", type: "" },
      isFormVisible: false,
      formErrors: {},
    }));

    // Example API call to save the room
    axios
      .post(`${SERVER_HOST}/rooms`, newRoom)
      .then(() => {
        console.log("Room added successfully.");
      })
      .catch((error) => {
        console.error("Error adding room:", error);
      });
  }

  // Update temperature
  updateTemperature(id, newTemperature) {
    this.setState((prevState) => ({
      rooms: prevState.rooms.map((room) =>
        room.id === id ? { ...room, temperature: newTemperature } : room
      ),
    }));

    // Example API call to update the temperature
    axios
      .put(`${SERVER_HOST}/rooms/${id}`, { temperature: newTemperature })
      .then(() => {
        console.log("Temperature updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating temperature:", error);
      });
  }

  render() {
    const { rooms, isFormVisible, formErrors, newRoom } = this.state;

    return (
      <div>
        {/* Render Room Cards */}
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>Type: {room.type}</p>
            <p>
              Temperature:{" "}
              <EditableTemperature
                id={room.id}
                temperature={room.temperature}
                onSave={this.updateTemperature}
              />
            </p>
          </div>
        ))}

        {/* Add Room Button */}
        <button onClick={this.toggleFormVisibility}>
          {isFormVisible ? "Cancel" : "Add New Room"}
        </button>

        {/* Add Room Form */}
        {isFormVisible && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              value={newRoom.name}
              onChange={this.handleInputChange}
            />
            {formErrors.name && <div className="error">{formErrors.name}</div>}

            <input
              type="number"
              name="temperature"
              placeholder="Temperature"
              value={newRoom.temperature}
              onChange={this.handleInputChange}
            />
            {formErrors.temperature && (
              <div className="error">{formErrors.temperature}</div>
            )}

            <select
              name="type"
              value={newRoom.type}
              onChange={this.handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Kitchen">Kitchen</option>
            </select>
            {formErrors.type && <div className="error">{formErrors.type}</div>}

            <button onClick={this.addRoom}>Add Room</button>
          </div>
        )}
      </div>
    );
  }
}

// EditableTemperature Component for inline editing
class EditableTemperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      temperature: this.props.temperature,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveTemperature = this.saveTemperature.bind(this);
  }

  handleInputChange(event) {
    this.setState({ temperature: event.target.value });
  }

  saveTemperature() {
    const newTemp = this.state.temperature;
    if (!newTemp || isNaN(newTemp) || Number(newTemp) <= 0) {
      alert("Temperature must be a positive number.");
      return;
    }

    this.props.onSave(this.props.id, newTemp);
    this.setState({ isEditing: false });
  }

  render() {
    return this.state.isEditing ? (
      <span>
        <input
          type="number"
          value={this.state.temperature}
          onChange={this.handleInputChange}
        />
        <button onClick={this.saveTemperature}>Save</button>
      </span>
    ) : (
      <span onClick={() => this.setState({ isEditing: true })}>
        {this.props.temperature}°C
      </span>
    );
  }
}

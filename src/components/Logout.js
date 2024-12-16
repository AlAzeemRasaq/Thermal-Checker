import React, { Component } from "react";
import { Navigate } from "react-router-dom"; // replaces Redirect
import axios from "axios";

import LinkInClass from "../components/LinkInClass";

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
    };
  }

  // Handles the logout process
  handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    axios // Sends a POST request to the logout endpoint
      .then((res) => { // If the request is successful, log the user out
        console.log("User logged out");
        localStorage.clear();
        this.setState({ isLoggedIn: false });
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Navigate to="/Home" />;
    }

    return (
      <div>
        <div className="logout-text">
          <i className="fa fa-sign-out" />
          <LinkInClass
            value="Log out"
            className="logout-button"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

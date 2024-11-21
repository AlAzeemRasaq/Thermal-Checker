import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "/css/Home.css";

export default class Home extends Component {
    render() {
        return (
            <>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root"></div>
                <div class="topnav">
                    <h1>Home</h1>
                    <a href="./Login" style="float:right">Account</a>
                </div>
                <div class="row">
                    <div class="card">
                        <p>Welcome to Thermal Checker!</p>
                    </div>
                </div>
                <div class="footer">
                    <h2>Footer goes here...</h2>
                </div>
            </>
        );
    }
}

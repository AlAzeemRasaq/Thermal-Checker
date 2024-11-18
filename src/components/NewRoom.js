import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";
import { SERVER_HOST } from "../config/global_constants";

export default class NewRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoomAdded: true
        };
    }
}

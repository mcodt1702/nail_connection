import React, { Component } from "react";
import Login from "../Login/LogIn";
import { Link } from "react-router-dom";

import "./LandingPage.css";
export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <h3>
          This app connects nail professional with their clients and allows them
          to work from home or go to the clients office, home or anywhere else
          they decide to meet.
        </h3>
        <div className="salutation">
          <h2>I have an account</h2>
          email: test@yahoo.com <br></br> password: P@assword!
          <Login></Login>
          <Link to="/signUp">
            <h2>SignUp</h2>
          </Link>
        </div>
      </div>
    );
  }
}

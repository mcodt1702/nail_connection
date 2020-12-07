import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Context from "../../../context";
import TokenService from "../../../Services/tokenService";

export default class Header extends Component {
  static contextType = Context;
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearUserID();
    this.props.history.push("/");
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <div className="restLogin">
          <Link to="/venues">Nail Technicians Click Here</Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <header className="headerstyling">
        <div className="hambu">
          <a id="nav-toggle" href="/main">
            &#9776;
          </a>
        </div>
        <Link className="logo" to="/main">
          <h1>Nail Connection</h1>
        </Link>
        <div className="nav">
          <div className="restlogin">
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </div>
        </div>
      </header>
    );
  }
}

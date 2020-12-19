import React, { Component } from "react";

import Context from "../../../context";
import { Button, Input, Required } from "../../../Utilities/utilities";
import ValidationError from "../../../Utilities/validationError";

export default class Users extends Component {
  static contextType = Context;

  constructor() {
    super();

    this.state = {
      name: { value: "", touched: false },

      email: { value: "", touched: false },

      password: { value: "", touched: false },
    };
  }
  nameUpdate(name) {
    this.setState({ name: { value: name, touched: true } });
  }
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 4) {
      return "You need at least 3 characters";
    }
  }

  emailUpdate(email) {
    this.setState({ email: { value: email, touched: true } });
  }
  validateEmail() {
    const email = this.state.email.value.trim();
    if (email.length === 0) {
      return "Email is required";
    } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return "You have entered an invalid email address!";
  }

  passwordUpdate(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return "Password is required";
    } else if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      return true;
    }
    return "Use a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter!";
  }

  render() {
    return (
      <div>
        <h1>Please register to find a nail Technician in your zip code</h1>
        <form
          className="LoginPage"
          onSubmit={(e) => this.context.createUser(e)}
          id="userform"
        >
          <div className="name">
            <label htmlFor="RegistrationForm_name">
              Your Name
              <Required />
            </label>
            <Input
              name="name"
              type="text"
              placeholder="Your Name"
              value={this.state.name.value}
              onChange={(e) => this.nameUpdate(e.target.value)}
              required
            ></Input>
            {this.state.name.touched && (
              <ValidationError message={this.validateName()} />
            )}
          </div>
          <div className="email">
            <label htmlFor="RegistrationForm__email">
              Email <Required />
            </label>
            <Input
              name="email"
              type="text"
              placeholder="email@email.com"
              value={this.state.email.value}
              onChange={(e) => this.emailUpdate(e.target.value)}
              required
            ></Input>
            {this.state.email.touched && (
              <ValidationError message={this.validateEmail()} />
            )}
          </div>

          <div className="password">
            <label htmlFor="RegistrationForm__password">
              Password <Required />
            </label>
            <Input
              name="password"
              type="password"
              placeholder="one numeric digit, uppercase and lowercase letters "
              value={this.state.password.value}
              onChange={(e) => this.passwordUpdate(e.target.value)}
              required
            ></Input>
            {this.state.password.touched && (
              <ValidationError message={this.validatePassword()} />
            )}
          </div>

          <Button type="submit" id="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

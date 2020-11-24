import React, { Component } from "react";
import "./Venues.css";
import Context from "../../context";
import AuthApiService from "../../Services/authApiService";
import TokenService from "../../Services/tokenService";
import { Button, Input, Required } from "../../Utilities/utilities";
import ValidationError from "../../Utilities/validationError";
import Login from "../Users/Login/LogIn";

export default class Venues extends Component {
  static contextType = Context;

  constructor() {
    super();

    this.state = {
      name: { value: "", touched: false },

      email: { value: "", touched: false },

      password: { value: "", touched: false },

      phone: { value: "", touched: false },

      zip: { value: "", touched: false },
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

  phoneUpdate(phone) {
    this.setState({ phone: { value: phone, touched: true } });
  }

  validatePhone() {
    const phone = this.state.phone.value.trim();
    if (phone.length === 0) {
      return "Phone number is required";
    } else if (
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)
    ) {
      return true;
    }
    return "Please use a 7 digit US phone format eg 555-543-1234  ";
  }

  zipUpdate(zip) {
    this.setState({ zip: { value: zip, touched: true } });
  }
  validateZip() {
    const zip = this.state.zip.value.trim();
    if (zip.length === 0) {
      return "Zip Code is required";
    } else if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) {
      return true;
    } else if (zip.length > 5) {
      return "Zip Code is too long";
    }
    return "Please usa a standard 5 digit Zip code";
  }

  render() {
    return (
      <div>
        <h1>Please register to have your business promoted in our app.</h1>
        <form
          onSubmit={(e) => this.context.createProvider(e, this.props.history)}
          id="userform"
        >
          <div className="name">
            <label htmlFor="RegistrationForm__full_name">
              Your name
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

          <div className="zip">
            <label htmlFor="RegistrationForm__zip">Zip</label>
            <Input
              name="zip"
              type="text"
              value={this.state.zip.value}
              onChange={(e) => this.zipUpdate(e.target.value)}
              required
              id="RegistrationForm__zip"
            ></Input>
            {this.state.zip.touched && (
              <ValidationError message={this.validateZip()} />
            )}
          </div>
          <div className="phone">
            <label htmlFor="RegistrationForm__phone">Phone</label>
            <Input
              name="phone"
              type="text"
              placeholder="555-543-1234"
              value={this.state.phone.value}
              onChange={(e) => this.phoneUpdate(e.target.value)}
              required
            ></Input>
            {this.state.phone.touched && (
              <ValidationError message={this.validatePhone()} />
            )}
          </div>
          <div className="description">
            <label htmlFor="RegistrationForm__description">Description</label>
            <Input
              name="description"
              type="text"
              placeholder="Please Give a Description of your Services"
            ></Input>
          </div>

          <Button type="submit" id="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

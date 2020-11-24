import React, { Component } from "react";
import "./Login.css";
import context from "../../../context";
import VenueAuthApiService from "../../../Services/venueAuthApiService";
import TokenService from "../../../Services/tokenService";
import { Button, Input } from "../../../Utilities/utilities";

export default class VenueLoginForm extends Component {
  state = { error: null };

  static contextType = context;
  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;

    VenueAuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserId(res.user_id);
        this.context.handleLoginSuccess(res.user_id);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    const { error } = this.state;
    return (
      <section className="LoginPage">
        <p>Please Login to continue or Signup to create an account</p>
        <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>

          <div className="email">
            <p>
              {" "}
              <label htmlFor="LoginForm__email">Email</label>
              <Input required name="email" id="LoginForm__email"></Input>
            </p>
          </div>
          <div className="password">
            <label htmlFor="LoginForm__password">Password</label>
            <Input
              required
              name="password"
              type="password"
              id="LoginForm__password"
            ></Input>
          </div>

          <Button>Login</Button>
        </form>
      </section>
    );
  }
}

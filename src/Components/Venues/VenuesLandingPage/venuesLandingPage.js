import React, { Component } from "react";
import VenueLogin from "../../Venues/venueLogin";
import { Link } from "react-router-dom";
import { Button } from "../../../Utilities/utilities";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="salutation2">
        <h2>Welcome back Nail Technicians.</h2>
        email: joe@test.com<br></br> password: Password11
        <h3>
          <p>If you have an account please login: </p>
        </h3>
        <VenueLogin></VenueLogin>
        <h3>
          <p>If you are new to our app please: </p>
        </h3>
        <Link to="/loginvenue">
          <Button>SignUp</Button>
        </Link>
      </div>
    );
  }
}

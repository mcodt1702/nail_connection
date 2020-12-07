import React, { Component } from "react";
import VenueLogin from "../../Venues/venueLogin";
import { Link } from "react-router-dom";
export default class LandingPage extends Component {
  render() {
    return (
      <div className="salutation2">
        <h2>Welcome back Nail Technicians. I have an account</h2>
        email: test@yahoo.com <br></br> password: P@assword!
        <VenueLogin></VenueLogin>
        <Link to="/loginvenue">
          <h2>SignUp</h2>
        </Link>
      </div>
    );
  }
}

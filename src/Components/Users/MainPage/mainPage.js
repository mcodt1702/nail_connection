import React, { Component } from "react";
import ZipLocation from "../ZipLocation/zipLocation";
import Context from "../../../context";
import "./mainPage.css";

export default class MainPage extends Component {
  static contextType = Context;
  static defaultProps = {
    match: { params: { id: 0 } },
  };
  //renders a list of available nail professionals in the chosen zip code.

  render() {
    return (
      <div className="username">
        <h2>Find Top Rated Certified Nail Specialists</h2>
        <div role="main" className="main">
          <ZipLocation />
        </div>
      </div>
    );
  }
}

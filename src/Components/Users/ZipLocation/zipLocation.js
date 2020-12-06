import React, { Component } from "react";
import "./zipLocation.css";
import { Button, Input } from "../../../Utilities/utilities";

export default class ZipLocation extends Component {
  findInZip = (e) => {
    e.preventDefault();
    const { zip } = e.target;

    console.log(zip.value);

    window.location.replace(`/main/loc/${zip.value}`);
  };

  render() {
    return (
      <form className="zipimput" onSubmit={this.findInZip}>
        <div className="zipLocation">
          <Input
            required
            role="getting zip code"
            name="zip"
            type="digits"
            id="zipLocation"
            placeholder="Enter zip code"
          ></Input>
        </div>

        <Button>Find Pros</Button>
      </form>
    );
  }
}

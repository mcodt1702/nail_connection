import React, { Component } from "react";
import Context from "../../../context";

import { Button } from "../../../Utilities/utilities";
export default class Providers extends Component {
  static contextType = Context;

  componentDidMount() {
    this.context.loadProviders();
  }

  render() {
    let { providers = [] } = this.context || [];
    let zip = parseInt(this.props.match.params.zip);

    console.log(zip);

    const providersList = providers
      .filter((provi) => parseInt(provi.zip) === zip)
      .map((item) => (
        <div key={item.id} className="providersList">
          <ul>
            <li>
              <h2>{item.name}</h2>
            </li>
            <li>{item.description}</li>
            <li>{item.phone}</li>
            <li>{item.zip}</li>
          </ul>
          <Button onClick={() => this.context.messageSent()}>
            Contact this Specialist
          </Button>
        </div>
      ));

    return (
      <section id="three">
        <h2> List Of Nail specialist in your zip code</h2>
        {providersList}
      </section>
    );
  }
}

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

          <Button
            onClick={(e) => window.location.replace(`/messages/${item.id}`)}
          >
            Contact this Specialist
          </Button>
          <Button onClick={() => window.location.replace("/main")}>
            Search on a different Zip code.
          </Button>
        </div>
      ));

    const notInArea =
      providersList.length === 0 ? (
        <h2> We are sorry. There are no technitians in that zip code</h2>
      ) : (
        ""
      );

    return (
      <section id="three">
        <h2> List Of Nail specialist in your zip code</h2>
        {providersList}
        {notInArea}
        <button onClick={() => window.location.replace("/main")}>
          Get back messages
        </button>
      </section>
    );
  }
}

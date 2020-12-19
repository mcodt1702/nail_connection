import React, { Component } from "react";
import Context from "../../../context";
import TokenService from "../../../Services/tokenService";

import { Link } from "react-router-dom";

export default class WelcomeProviders extends Component {
  static contextType = Context;

  componentDidMount() {
    this.context.startConversationVenues();
  }

  render() {
    let { messages = [] } = this.context || [];
    let usersList = [];
    let id = parseInt(TokenService.getUserId());

    let messageList = messages
      .filter((outcome) => parseInt(outcome.providers_id) === id)
      .forEach((mess) => {
        if (!usersList.includes(mess.users_id)) {
          usersList.push(mess.users_id);
        }
      });

    let messageListMap = usersList.map((conver) => (
      <div>
        <span>You have a Conversation from {conver}</span>
        <Link to={`/messageResVen/${conver}`}>
          <button>Respond to this User</button>
        </Link>
      </div>
    ));

    const noMessages =
      usersList.length === 0 ? <p>You have no messages at this time</p> : "";
    return (
      <div>
        <h2>Welcome Nail Technicians, you have the followin messages:</h2>
        {noMessages}
        {messageListMap}
      </div>
    );
  }
}

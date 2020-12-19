import React, { Component } from "react";
import Context from "../../../context";
import TokenService from "../../../Services/tokenService";
import { Input, ValidationError, Button } from "../../../Utilities/utilities";
import Config from "../../../config";
import { Link } from "react-router-dom";

const { API_ENDPOINT } = Config;

export default class MessageRes extends Component {
  static contextType = Context;
  constructor() {
    super();

    this.state = {
      messageReply: {
        value: " ",
        touched: false,
      },
    };
  }

  update() {
    this.setState({ messageReply: { value: "", touched: false } });
    this.context.startConversationVenues();
    console.log("im updating venue messages");
  }

  sendReplyVenues(e, id) {
    console.log("Iam alive and sending");
    e.preventDefault();

    let newMessage = {
      users_id: id,
      message: e.target.messageReply.value,
      sender: "venue",
    };
    console.log(newMessage);
    fetch(`${API_ENDPOINT}/messages/messagesVen`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newMessage),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res;
      })
      .then((res) => res.json())

      .catch((err) => {
        alert("There was a problem connectig sendReply venues", err);
      });
    this.update();
    console.log(newMessage);
  }

  messageUpdate(messageReply) {
    this.setState({ messageReply: { value: messageReply, touched: true } });
  }

  validateMessage() {
    const name = this.state.messageReply.value.trim();
    if (name.length === 0) {
      return "Message content is required";
    } else if (name.length < 2) {
      return "You need at least 2 characters in your message";
    }
  }

  componentDidMount() {
    this.context.startConversationVenues();
  }

  render() {
    let { messages = [] } = this.context || [];
    let usersList = [];
    let id = parseInt(TokenService.getUserId());
    console.log(id);
    let usersId = parseInt(this.props.match.params.id);
    console.log(usersId);

    let conversation = messages
      .filter(
        (users) =>
          parseInt(users.providers_id) === id && users.users_id === usersId
      )
      .map((item) => (
        <div key={item.id} className={`mes-${item.sender}`}>
          <ul>
            <li>
              <h2>{item.message}</h2>
              {new Date(item.message_date).toLocaleString("en-US")}
            </li>
          </ul>
        </div>
      ));
    const noMessages =
      conversation.length === 0 ? <p>You have no messages at this time</p> : "";
    return (
      <div>
        <h2>Welcome Nail Technicians, you have the followin messages:</h2>

        {noMessages}
        {conversation}
        <form
          id="messageReply"
          className="messageReply"
          onSubmit={(e) => this.sendReplyVenues(e, usersId)}
        >
          <label htmlFor="LoginForm__password">Reply</label>
          <Input
            required
            name="messageReply"
            type="text"
            id="forMessageReply"
            value={this.state.messageReply.value}
            onChange={(e) => this.messageUpdate(e.target.value)}
          />{" "}
          {this.state.messageReply.touched && (
            <ValidationError message={this.validateMessage()} />
          )}
          <button>Send</button>
        </form>

        <button onClick={() => window.location.replace("/messageRes/:id")}>
          Get back messages
        </button>
      </div>
    );
  }
}

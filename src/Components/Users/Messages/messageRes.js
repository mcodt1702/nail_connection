import React, { Component } from "react";
import Context from "../../../context";
import { Input, ValidationError } from "../../../Utilities/utilities";
import Config from "../../../config";

import TokenService from "../../../Services/tokenService";
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
    this.context.startConversationUsers();
    this.setState({ messageReply: { value: "", touched: false } });
    this.context.startConversationUsers();
    console.log("im updating");
  }
  sendReplyUsers(e, id) {
    console.log("Iam alive and sending");
    e.preventDefault();

    let newMessage = {
      providers_id: id,
      message: e.target.messageReply.value,
      sender: "user",
    };
    console.log(newMessage);
    fetch(`${API_ENDPOINT}/messages`, {
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
        alert("There was a problem connectig sendReply", err);
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
    this.context.startConversationUsers();
  }

  render() {
    let { messages = [] } = this.context || [];
    let id = parseInt(this.props.match.params.id);

    const conversation = messages
      .filter((provi) => parseInt(provi.providers_id) === id)
      .map((item) => (
        <div className={`mes-${item.sender}`} key={item.id}>
          <ul>
            <li>
              <h2>{item.message}</h2>
              <p>{item.sender} I have undefined</p>
              {new Date(item.message_date).toLocaleString("en-US")}
            </li>
          </ul>
        </div>
      ));

    return (
      <div>
        <h2>Please send your message to this Nail Technician</h2>
        {conversation}

        <form
          id="myForm"
          className="messageReply"
          onSubmit={(e) => this.sendReplyUsers(e, id)}
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
        <button onClick={() => window.location.replace("/main")}>
          Get back search by zip code
        </button>
      </div>
    );
  }
}

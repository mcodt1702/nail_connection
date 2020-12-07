import React, { Component } from "react";
import Context from "../../../context";
import TokenService from "../../../Services/tokenService";
import { Input } from "../../../Utilities/utilities";
export default class MessageRes extends Component {
  static contextType = Context;
  componentDidMount() {
    this.context.startConversationVenues();
  }

  render() {
    let { messages = [] } = this.context || [];

    let id = parseInt(TokenService.getUserId());
    console.log(id);

    let conversation = messages
      .filter((users) => parseInt(users.providers_id) === id)
      .map((item) => (
        <div key={item.id} className={`mes-${item.sender}`}>
          <ul>
            <li>
              <h2>{item.message}</h2>
              <p>user id = {item.users_id}</p>
              {new Date(item.message_date).toLocaleString("en-US")}
            </li>
          </ul>
          <form
            className="messageReply"
            onSubmit={(e) => this.context.sendReplyVenues(e, item.users_id)}
          >
            <label htmlFor="LoginForm__password">Reply</label>
            <Input
              required
              name="messageReply"
              type="text"
              id="forMessageReply"
            ></Input>
            <button>Send</button>
          </form>
        </div>
      ));

    return (
      <div>
        <h2>Please send your message</h2>
        {conversation}

        <button onClick={() => window.location.replace("/main")}>
          Get back messages
        </button>
      </div>
    );
  }
}

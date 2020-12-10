import React, { Component } from "react";
import Context from "../../../context";
import TokenService from "../../../Services/tokenService";
import { Input } from "../../../Utilities/utilities";
export default class MessageRes extends Component {
  static contextType = Context;
  componentDidMount() {
    this.context.startConversationVenues();

    document.getElementById("messageReply").reset();
  }

  render() {
    let { messages = [] } = this.context || [];

    let id = parseInt(TokenService.getUserId());
    console.log(id);
    let usersId = messages.filter((users) => users.users_id);

    console.log(usersId);
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
        </div>
      ));
    const noMessages =
      conversation.length === 0 ? <p>You have no messages at this time</p> : "";
    return (
      <div>
        <h2>Welcome Nail Technicians, you have the followin messages:</h2>
        {conversation}
        {noMessages}
        <form
          id="messageReply"
          className="messageReply"
          onSubmit={(e) => this.context.sendReplyVenues(e, usersId[0].users_id)}
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

        <button onClick={() => window.location.replace("/messageResVen/:id")}>
          Get back messages
        </button>
      </div>
    );
  }
}

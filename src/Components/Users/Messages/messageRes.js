import React, { Component } from "react";
import Context from "../../../context";
import { Input } from "../../../Utilities/utilities";
export default class MessageRes extends Component {
  static contextType = Context;
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
    const notInArea =
      conversation.length === 0 ? (
        <h2>There are no technitians in that zip code</h2>
      ) : (
        ""
      );

    return (
      <div>
        <h2>Please send your message</h2>
        {conversation}
        {notInArea}
        <form
          className="messageReply"
          onSubmit={(e) => this.context.sendReplyUsers(e, id)}
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
        <button onClick={() => window.location.replace("/main")}>
          Get back messages
        </button>
      </div>
    );
  }
}

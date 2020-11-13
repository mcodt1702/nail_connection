import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Config from "./config";
import PrivateRoute from "./Utilities/privateRoute";
import Context from "./context";
import Header from "./Components/Header/header";
import TokenService from "./Services/tokenService";
import MainPage from "./Components/MainPage/mainPage";
import Providers from "./Components/Providers/providers";
import MessageRes from "./Components/Messages/messageRes";

class App extends Component {
  state = {
    user: [],
    providers: [],
    handleLoginSuccess: (user_id) => {
      window.location.replace("./main");
    },
    messageSent: () => {
      window.location.replace("../../messageRes");
    },

    loadProviders: () => {
      fetch(`${Config.API_ENDPOINT}/providers`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          return res;
        })
        .then((res) => res.json())
        .then((providers) => this.setState({ providers }))
        .catch((err) => {
          alert(
            "There was a problem connectig to the server getting providers.",
            err
          );
        });
    },
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <Route path={"/"} component={Header}></Route>
          <Route exact path={"/"} component={LandingPage}></Route>
          <Route exact path={"/main"} component={MainPage}></Route>
          <PrivateRoute
            exact
            path={"/main/loc/:zip"}
            component={Providers}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path={"/messageRes"}
            component={MessageRes}
          ></PrivateRoute>
        </main>
      </Context.Provider>
    );
  }
}

export default App;

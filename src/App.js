import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Config from "./config";
import PrivateRoute from "./Utilities/privateRoute";
import Context from "./context";
import Header from "./Components/Header/header";

class App extends Component {
  state = {
    handleLoginSuccess: (user_id) => {
      window.location.replace("./main");
    },
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <Route path={"/"} component={Header}></Route>
          <Route exact path={"/"} component={LandingPage}></Route>
        </main>
      </Context.Provider>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/Users/LandingPage/LandingPage";
import Config from "./config";
import PrivateRoute from "./Utilities/privateRoute";
import Context from "./context";
import Header from "./Components/Users/Header/header";
import TokenService from "./Services/tokenService";
import MainPage from "./Components/Users/MainPage/mainPage";
import Providers from "./Components/Users/Providers/providers";
import MessageResUser from "./Components/Users/Messages/messageRes";
import MessageResVen from "./Components/Venues/VenuesSigned/venuesMessages";
import RegisterVenues from "./Components/Venues/registerVenues";
import Login from "./Components/Users/Login/LogIn";
import Users from "./Components/Users/SignUp/registerUser";
import VenuesLandingPage from "./Components/Venues/VenuesLandingPage/venuesLandingPage";
import WelcomeProviders from "./Components/Venues/WelcomeProviders/welcomeProviders";
const { API_ENDPOINT } = Config;

class App extends Component {
  state = {
    user: [],
    providers: [],
    messages: [],
    messageReply: [],

    startConversationUsers: () => {
      fetch(`${API_ENDPOINT}/messages/conversation`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
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
        .then((messages) => this.setState({ messages }))
        .catch((err) => {
          alert("There was a problem getting your conversations.", err);
        });
    },

    startConversationVenues: () => {
      fetch(`${API_ENDPOINT}/messages/vconver`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
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
        .then((messages) => this.setState({ messages }))
        .catch((err) => {
          alert("There was a problem getting your conversations.", err);
        });
    },

    handleLoginSuccess: (user_id) => {
      window.location.replace("./main");
    },

    handleLoginSuccessVenues: (providers_id) => {
      window.location.replace(`./messageRes/:${providers_id}`);
    },

    createProvider: (e) => {
      e.preventDefault();

      let newProvider = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone: e.target.phone.value,
        zip: e.target.zip.value,
        description: e.target.description.value,
      };

      fetch(
        `${API_ENDPOINT}/providers`,

        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProvider),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              "There was a problem coneectig to the server. We can't create a new Order"
            ); // throw an error
          }

          return res.json();
        })
        .then((newProvider) => {
          window.location.replace("/venues");
        });
    },

    loadProviders: () => {
      fetch(`${API_ENDPOINT}/providers`, {
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

    createUser: (e) => {
      e.preventDefault();

      let newUser = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      fetch(
        `${API_ENDPOINT}/users`,

        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              "There was a problem coneectig to the server. We can't create a new Order"
            ); // throw an error
          }

          return res.json();
        })
        .then((newUser) => {
          window.location.replace("/main");
        });
    },
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <Route path={"/"} component={Header}></Route>

          <Route exact path={"/"} component={LandingPage}></Route>
          <PrivateRoute
            exact
            path={"/main"}
            component={MainPage}
          ></PrivateRoute>
          <Route exact path={"/loginvenue"} component={RegisterVenues}></Route>
          <Route exact path={"/login"} component={Login}></Route>
          <Route exact path={"/venues"} component={VenuesLandingPage}></Route>
          <Route exact path={"/users"} component={Users}></Route>
          <PrivateRoute
            exact
            path={"/main/loc/:zip"}
            component={Providers}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path={"/messageRes/:id"}
            component={WelcomeProviders}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path={"/messages/:id"}
            component={MessageResUser}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path={"/messageResVen/:id"}
            component={MessageResVen}
          ></PrivateRoute>
        </main>
      </Context.Provider>
    );
  }
}

export default App;

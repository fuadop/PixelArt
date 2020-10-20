import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import Home from "./components/Home/Home";
import Practice from "./components/Practice/Practice";
import Room from "./components/Room/Room";
import Game from "./components/Game/Game";
import Unsupported from "./components/Unsupported";

const client = new ApolloClient({
  uri: "http://localhost:8080"
});

const App = () => {
  if(window.innerWidth < 700) {
    return (
      <Unsupported/>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/rooms/:id"  component= {Game}/>
          <Route path="/practice" exact>
            <Practice />
          </Route>
          <Route path="/rooms" exact>
            <Room />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;

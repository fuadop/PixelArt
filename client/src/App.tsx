import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Practice from "./components/Practice/Practice";
import Room from "./components/Room/Room";
import Unsupported from "./components/Unsupported";

const App: FC = () => {
  if(window.innerWidth < 700) {
    return (
      <Unsupported/>
    );
  }
  return (
    <Router>
      <Switch>
        <Route path={"/practice"} exact>
          <Practice />
        </Route>
        <Route path={"/rooms"} exact>
          <Room />
        </Route>
        <Route path={"/"} exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

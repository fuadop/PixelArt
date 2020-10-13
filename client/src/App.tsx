import React, { FC } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Practice from "./components/Practice/Practice";

const App: FC = () => (
  <Router>
      <Switch>
        <Route path={"/practice"} exact>
          <Practice/>
        </Route>
        <Route path={"/rooms"} exact>
          <Home/>
        </Route>
        <Route path={"/"} exact>
          <Home/>
        </Route>
      </Switch>
  </Router>
);

export default App;

import React, { FC } from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Practice from "./components/Practice/Practice";

const App: FC = () => (
  <HashRouter>
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
  </HashRouter>
);

export default App;

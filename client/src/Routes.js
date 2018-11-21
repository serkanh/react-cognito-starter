import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import AppliedRoute from "./components/AppliedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
		<UnauthenticatedRoute
      path="/login/reset"
      exact
      component={ResetPassword}
      props={childProps}
    />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
		<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;;
import React, { useState, useEffect, Component } from "react";
import { observer } from "mobx-react";
import FullWeb from "./AppWebsite";
import UserStore from "./components/Stores/UserStore";
import "./responsive.css";
import "./App.css";
import CloseIcon from "@material-ui/icons/Close";
import Registration from "./components/Registration/Registration";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import RegisteredHome from "./components/registeredAccount/RegisteredHome";
import AddProduct from "./components/addContent/AddContent";
import AgentComponent from "./components/agentComponent/agentComponent";
import InfoHome from "./components/infoHome/infoHome";
import LoginForm from "./components/Login/LoginForm";
import SubmitButton from "./components/Login/SubmitButton";
import Icon from "./icon.png";
import Footer from "./components/Footer/Footer";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Tooltip, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Banner from "./components/banner/Banner";
import FullCard from "./components/Cards/FullCard";
import Developers from "./components/Developers/Developers";
import PopularStreet from "./components/Popular/PopularStreet";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import SecondSubmitButton from "./components/Login/styledSubmitButton";
import AppInfo from "./components/appInformation/appInfo";

class App extends Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="contentLoadPage">
          <i class="fas fa-spinner"></i>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <>
            <BrowserRouter>
            <Switch>
              <Route path="/" exact component={AppInfo} />
              <Route path="/add" component={AddProduct} />
              <Route path="/agent" component={AgentComponent} />
              <Route path="/home/1" component={InfoHome} />
            </Switch>
          </BrowserRouter>
          </>
        );
      }
      return (
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={FullWeb} />
              <Route path="/login" component={LoginForm} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/add" component={AddProduct} />
              <Route path="/agent" component={AgentComponent} />
              <Route path="/home/1" component={InfoHome} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default observer(App);
/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import 'antd/dist/antd.css';
// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import UserInfo from "./components/Api/userInfo";
import ProductPage from "./views/examples/ProductPage";
import IndexUser from "./views/IndexUser";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route
            path="/index"
            render={props =>{
                if(UserInfo.isCheckLogin()){
                    if (!UserInfo.isAdmin()) {
                        return <IndexUser {...props} />;
                    }
                    else{
                        return <Index {...props} />;
                    }
                }else{
                    return <Redirect to={{pathname: '/Login', state: {from: props.location}}}/>;
                }
            }}
        />
        <Route
            path="/products"
            render={props =>{
              if (!UserInfo.isAdmin()) {
                return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
              }
              else{
                return <ProfilePage {...props} />;
              }
            }}
        />
        <Route
        path="/register"
        render={props => <RegisterPage {...props} />}
        />
        <Route
            path="/login"
            render={props =>{
                if(!UserInfo.isCheckLogin()){
                    return <RegisterPage {...props} />;
                }else{
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
            }}
        />
        <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

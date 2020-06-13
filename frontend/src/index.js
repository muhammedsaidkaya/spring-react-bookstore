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
import UserPage from "views/examples/UserPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import RegisteringPage from "views/examples/RegisteringPage.js";
import CategoriesPage from "views/examples/CategoriesPage.js";
import BucketPage from "views/examples/BucketPage.js";
import LogsPage from "views/examples/LogsPage.js";
import UserProfilePage from "views/examples/UserProfilePage.js";
import OrdersPage from "views/examples/OrdersPage.js";
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
            path="/bucket"
            render={props =>{
                if (UserInfo.getBucketCount()<1) {
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
                else{
                    return <BucketPage {...props} />;
                }
            }}
        />
        <Route
            path="/orders"
            render={props =>{
                if (!UserInfo.isAdmin()) {
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
                else{
                    return <OrdersPage {...props} />;
                }
            }}
        />
        <Route
            path="/categories"
            render={props =>{
                if (!UserInfo.isAdmin()) {
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
                else{
                    return <CategoriesPage {...props} />;
                }
            }}
        />
        <Route
            path="/statistic"
            render={props =>{
                if (!UserInfo.isAdmin()) {
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
                else{
                    return <LogsPage {...props} />;
                }
            }}
        />
        <Route
            path="/users"
            render={props =>{
                if (!UserInfo.isAdmin()) {
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
                else{
                    return <UserPage {...props} />;
                }
            }}
        />
        <Route
        path="/register"
        render={props => {
            if (!UserInfo.isCheckLogin()) {
                return <RegisteringPage {...props} />;
            }
            else{
                return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
            }
        }} />
        <Route
            path="/profile"
            render={props => {
                if (UserInfo.isCheckLogin()) {
                    return <UserProfilePage {...props} />;
                }
                else{
                    return <Redirect to={{pathname: '/index', state: {from: props.location}}}/>;
                }
            }} />
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

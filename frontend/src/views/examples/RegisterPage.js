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
import React, {Component} from 'react';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Api from "../../components/Api/api";
import UserInfo from "../../components/Api/userInfo";
import {reactLocalStorage} from 'reactjs-localstorage';
import {message} from "antd";
let self = null;

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    self = this;
    self.state = {
      email: "",
      password: "",
      login: true
    };
  }
  handleSubmitLogin (e) {
    e.preventDefault();
    if((this.state.email == "") || (this.state.password == ""))
    {
      message.error("Email and Password cannot be empty");
    }else{
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(self.state.email)) {
        Api.login(self.state.email, self.state.password).then(function (response) {
          if (response.data != "") {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            Api.sendLog(self.state.email).then(function (response) {
              if (response.data != null) {
                self.setState({login: true});
                if (UserInfo.isAdmin())
                  UserInfo.pageChange(self, 'index');
                else
                  UserInfo.pageChange(self, 'landing-page')
              } else {
                message.error("There is no user with those info");
              }
            }).catch(error => {
              console.log(error);
            });
          } else {
            message.error("There is no user with those info");
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        message.error("You have entered an invalid email address");
      }
    }
  };
  changeEmail(e){
    self.setState({email: e});
  };
  changePassword(e){
    self.setState({password: e});
  };
  setPassword(e){
    e.preventDefault();
    if((this.state.email != null) && (this.state.email != ""))
    {
      let data = {
        "email": self.state.email
      };
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        Api.setPasswordToDefault(data).then(function (response) {
          message.success("Password is set on to \"devamke\"");
        }).catch(error => {
          console.log(error);
        });
      }
    }else{
      message.error("You have to enter your email address.");
    }
  }
  render() {
    return (
        <>
          <ExamplesNavbar />
          <div
              className="page-header"
              style={{
                backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
              }}
          >
            <div className="filter" />
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" lg="4">
                  <Card className="card-register ml-auto mr-auto">
                    <h3 className="title mx-auto">Welcome</h3>
                    <Form className="register-form" onSubmit={(e) => self.handleSubmitLogin(e)}>
                      <label>Email</label>
                      <Input placeholder="Email" type="text" onChange={e => self.changeEmail(e.target.value)} />
                      <label>Password</label>
                      <Input placeholder="Password" type="password" onChange={e => self.changePassword(e.target.value)} />
                      <Button block className="btn-round" color="danger">
                        Login
                      </Button>
                    </Form>
                    <div className="forgot">
                      <Button
                          className="btn-link"
                          color="danger"
                          onClick={(e)=>self.setPassword(e)}
                      >
                        Forgot password?
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
            <div className="footer register-footer text-center">
              <h6>
                © {new Date().getFullYear()}, made with{" "}
                <i className="fa fa-heart heart" /> by Dewamke
              </h6>
            </div>
          </div>
        </>
    );
  }
}

export default RegisterPage;

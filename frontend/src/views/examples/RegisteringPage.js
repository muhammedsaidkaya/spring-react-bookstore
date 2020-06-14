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

class RegisteringPage extends Component {

  constructor(props) {
    super(props);
    self = this;
    self.state = {
      email: "",
      password: "",
      passwordrep: "",
      registered: false
    };
  }
  handleSubmitRegister (e) {
    e.preventDefault();
    if((this.state.email == "") || (this.state.password == ""))
    {
      message.error("Email and Password cannot be empty");
    }else{
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(self.state.email)) {
        if(this.state.password == this.state.passwordrep){
          Api.postRegister(self.state.email, self.state.password).then(function (response) {
            self.setState({registered: true});
          }).catch(error => {
            console.log(error);
          });
        }else{
          message.error("You have entered passwords different");
        }
      } else {
        message.error("You have entered an invalid email address");
      }
    }
  }
  ;
  changeEmail(e){
    self.setState({email: e});
  };
  changePassword(e){
    self.setState({password: e});
  };
  changePasswordRep(e){
    self.setState({passwordrep: e});
  };
  redirect(){
    UserInfo.pageChange(self, 'login');
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
            {
              this.state.registered == true ? (
                  <Row>
                    <Col className="ml-auto mr-auto" lg="4">
                      <Card className="card-register ml-auto mr-auto text-center">
                        <h3 className="title mx-auto">You have been registered in the system.</h3>
                        <Button block className="btn-round" color="danger" onClick={(e) => self.redirect()}>
                          Turn to login
                        </Button>
                      </Card>
                    </Col>
                  </Row>
              ) : (
                  <Row>
                    <Col className="ml-auto mr-auto" lg="4">
                      <Card className="card-register ml-auto mr-auto">
                        <h3 className="title mx-auto">Welcome</h3>
                        <Form className="register-form" onSubmit={(e) => self.handleSubmitRegister(e)}>
                          <label>Email</label>
                          <Input placeholder="Email" type="text" onChange={e => self.changeEmail(e.target.value)} />
                          <label>Password</label>
                          <Input placeholder="Password" type="password" onChange={e => self.changePassword(e.target.value)} />
                          <label>Reenter Password</label>
                          <Input placeholder="Password" type="password" onChange={e => self.changePasswordRep(e.target.value)} />
                          <Button block className="btn-round" color="danger">
                            Register
                          </Button>
                        </Form>
                        <div className="forgot">
                          <Button
                              className="btn-link"
                              color="danger"
                              type={"submit"}
                          >
                            Forgot password?
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  </Row>
              )
            }
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

export default RegisteringPage;

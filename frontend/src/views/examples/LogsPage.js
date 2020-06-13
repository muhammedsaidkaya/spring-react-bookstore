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
import {
  Button,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col, Table, Nav, NavItem, NavLink, TabContent, TabPane, ListGroupItem, ListGroup
} from "reactstrap";
import { message } from 'antd';
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import Api from "../../components/Api/api";
import UserInfo from "../../components/Api/userInfo";
import Form from "reactstrap/es/Form";
import Popconfirm from "antd/es/popconfirm";
import Media from "reactstrap/es/Media";
import * as moment from "moment";
let self = null;
class LogsPage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      logs: null,
      activeTab: "1",
      statistics: null,
    }
  }
  componentDidMount() {
    self.getLogs();
    self.getStatistic();
    self.render();
  }
  getLogs(){
    Api.getLogs().then(function (response) {
      self.setState({
        logs: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  getStatistic(){
    Api.getStatistic().then(function (response) {
      self.setState({
        statistics: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  getFormat(date){
    let datetime = date.split('T');
    let datepart = datetime[0].split('-');
    let timepart = datetime[1].split(':');
    let secondpart = timepart[2].split('.');
    let finalData = datepart[2] + "/" + datepart[1] + "/" + datepart[0] + " " + timepart[0] + ":" + timepart[1] + ":" + secondpart[0];
    return finalData;
  }
  toggle(type){
    self.setState({
      activeTab: type
    });
  }
  render(){
    return (
        <>
          <IndexNavbar />
          <ProfilePageHeader />
          <br/>
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav id="tabs" role="tablist" tabs>
                <NavItem>
                  <NavLink
                      className={this.state.activeTab === "1" ? "active" : ""}
                      onClick={() => {
                        this.toggle("1");
                      }}
                  >
                    User Logs Page
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      className={this.state.activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        this.toggle("2");
                      }}
                  >
                    General Statistics
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="section profile-content">
                <Container>
                  <br/>
                  <Container>
                    <br/>
                    <Table striped>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>User e-mail</th>
                        <th>User Name</th>
                        <th>Login Dates</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        self.state.logs != null && (
                            this.state.logs.map(function (v, i) {
                              return (
                                  <tr>
                                    <th scope="row">{i}</th>
                                    <td>{v.logIdentifier.user_email}</td>
                                    <td>{v.name}</td>
                                    <td>{self.getFormat(v.logIdentifier.date)}</td>
                                  </tr>
                              );
                            })
                        )
                      }
                      </tbody>
                    </Table>
                  </Container>
                </Container>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="text-center">
                {
                  this.state.statistics != null && (
                    <>
                      <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                          <p>
                            All time log count:{this.state.statistics.allLogCount.body}<br/>
                            Today's log count:{this.state.statistics.todayLogCount.body}<br/>
                            Today Payment Count: {this.state.statistics.todayPaymentCount.body}<br/>
                            All Payment Count: {this.state.statistics.allPaymentCount.body}<br/>
                          </p>
                        </Col>
                      </Row>
                    </>
                  )
                }

              </div>
            </TabPane>
          </TabContent>

          <DemoFooter />
        </>
    );
  };
}

export default LogsPage;

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
  Col, Table, Nav, NavItem, NavLink, TabContent, TabPane
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
class UserProfilePage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      activeTab: "1",
      activeAddress: "-1",
      activeOrders: "-1",
      address: null,
      orders: null,
      comment: null,
      rate: 0,
    };
  }
  componentDidMount() {
    self.getUser();
    self.getOrders();
    self.render();
  }
  getAddress(){
    Api.getAddreses().then(function (response) {
      self.setState({
        address:response.data
      });
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  };
  getOrders(){
    Api.getUserOrders().then(function (response) {
      self.setState({
        orders:response.data
      });
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  };
  getUser(){
    Api.getUser().then(function (response) {
      self.getAddress();
      self.setState({
        name:response.data.name,
        email:response.data.email,
        gender:response.data.gender,
        dob:response.data.dob,
        phone_first3:response.data.phone_first3.toString(),
        phone_rest:response.data.phone_rest.toString(),
        pic:response.data.profil_pic,
        admin:response.data.admin,
      });
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  }
  change(type,value){
    if(type === "name"){
      self.setState({
        name: value,
      });
    }else if(type === "email"){
      self.setState({
        email: value,
      });
    }else if(type === "gender"){
      self.setState({
        gender: value,
      });
    }else if(type === "brithday"){
      self.setState({
        dob: value,
      });
    }else if(type === "region"){
      self.setState({
        phone_first3: value,
      });
    }else if(type === "rest"){
      self.setState({
        phone_rest: value,
      });
    }else if(type === "pic"){
      self.setState({
        pic: value,
      });
    }else if(type === "address"){
      self.setState({
        anAddress: value,
      });
    }else if(type === "comment"){
      self.setState({
        comment: value,
      });
    }else if(type === "rate"){
      self.setState({
        rate: value,
      });
    }
    else if(type === "password"){
      self.setState({
        password: value,
      });
    }
  };
  handleSubmitUpdate(e){
    e.preventDefault();
    console.log(this.state);
    if(
        (this.state.name == "") ||
        (this.state.email == "") ||
        (this.state.dob == "") ||
        (this.state.phone_first3 == "") ||
        (this.state.phone_rest == "") ||
        (this.state.pic == "")
    )
    {
      message.error("There is at least one requiered field is empty" + this.state.gender);
    }
    else{
      if((this.state.phone_first3.length == 3) && (this.state.phone_first3 > 0))
      {
        if((this.state.phone_rest.length == 7) && (this.state.phone_rest > 0))
        {
          Api.updateUser(this.state).then(function (response) {
            message.success("Update is success");
            self.getUser();
          }).catch(error => {
            UserInfo.generalAlert(error);
          });
        }
        else
        {
          message.error("Phone number without region code must be 7 digit and only numbers");
        }
      }
      else
      {
        message.error("Phone numbers region code must be 3 digit and only numbers");
      }
    }
  }
  toggle(type){
    if(type === "1"){
      self.setState({
        activeTab: type,
      });
    }
    if(type === "2"){
      self.setState({
        activeTab: type,
      });
    }
    if(type === "3"){
      self.setState({
        activeTab: type,
      });
    }
  }
  toggleAddress(type){
    self.setState({
      activeAddress: type,
    }, () => {
      self.getAnAddress(type);
      self.render();
    });
  }
  toggleOrders(type){
    self.setState({
      activeOrders: type,
    });
    self.getAnOrder(type);
  }
  getAnAddress(i){
    let temp = self.state.address[i].address;
    let temp2 = self.state.address[i].addressIdentifier.id;
    self.setState({
      anAddress: temp,
      anAddressId: temp2
    });
  };
  getAnOrder(i){
    let temp = self.state.orders[i];
    self.setState({
      anOrder: temp,
    });
  };
  deleteAddress(i){
    let temp = UserInfo.getEmail();
    let data= {
      user_email: temp,
      id: i,
    };
    Api.deleteAddress(data).then(function (response) {
      self.getAddress();
      self.setState({
        anAddress: null,
        anAddressId: null
      });
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  }
  handleSubmitAddressUpdate(e){
    e.preventDefault();
    let temp = UserInfo.getEmail();
    let id = self.state.anAddressId;
    let address = self.state.anAddress;
    let data= {
      addressIdentifier :{
        user_email: temp,
        id: id
      },
      address: address,
    };
    Api.updateAddress(data).then(function (response) {
      self.getAddress();
      self.setState({
        anAddress: null,
        anAddressId: null
      });
      message.success("Address has been updated.");
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  }
  cancelOrder(e){
    e.preventDefault();
    let order = self.state.anOrder.payment.paymentIden;
    let data= {
      paymentIden: order,
      new_stat: "Canceled"
    };
    Api.updateOrder(data).then(function (response) {
      self.getOrders();
      self.setState({
        anOrder: null,
      });
      message.success("Order has been canceled.");
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  }
  makeComment(i){
    if((this.state.comment!= null) && (this.state.comment!= ""))
    {
      if(this.state.rate > 0)
      {
        let data = {
          "itemIdentifier": this.state.anOrder.itemList[i].itemIdentifier,
          "explanation": this.state.comment,
          "rate": Number(this.state.rate)
        };
        Api.rate(data).then(function (response) {
          self.getOrders();
          self.setState({
            anOrder: null,
          });
          message.success("You have been write a comment on order.");
        }).catch(error => {
          UserInfo.generalAlert(error);
        });
      }else{
       message.error("You have to chosee rate.");
      }
    }else{
      message.error("Comment can not be empty.");
    }
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
                    Personal Infos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      className={this.state.activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        this.toggle("2");
                      }}
                  >
                    Address
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      className={this.state.activeTab === "3" ? "active" : ""}
                      onClick={() => {
                        this.toggle("3");
                      }}
                  >
                    Orders
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="section profile-content">
                <Container>
                  <br />
                  <Container>
                    <br/>
                    <>
                      <Form onSubmit={(e) => self.handleSubmitUpdate(e)}>
                        <Row form>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="userName">User Name</Label>
                              <Input type="text" name="name" id="userName" placeholder="User Name" onChange={e => self.change('name',e.target.value)} defaultValue={this.state.name}/>
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="userEmail">User e-mail</Label>
                              <Input disabled type="text" name="email" id="userEmail" placeholder="User e-mail" onChange={e => self.change('email',e.target.value)} defaultValue={this.state.email}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="userGender">User Gender</Label>
                              <Input type="select" name="gender" id="userGender" placeholder="User Gender" onChange={e => self.change('gender',e.target.value)} value={this.state.gender}>
                                <option value={false}>Female</option>
                                <option value={true}>Male</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="userBirtday">User Birthday</Label>
                              <Input
                                  type="date"
                                  name="brithday"
                                  id="userBirtday"
                                  placeholder="User Birthday"
                                  onChange={e => self.change('brithday',e.target.value)}
                                  defaultValue={this.state.dob}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={2}>
                            <FormGroup>
                              <Label for="userPhoneRegion">Phone Region Phone</Label>
                              <Input type="text" name="region" id="userPhoneRegion" placeholder="Phone Region Phone" onChange={e => self.change('region',e.target.value)} defaultValue={this.state.phone_first3}/>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="userPhoneRest">Phone Rest</Label>
                              <Input type="text" name="rest" id="userPhoneRest" placeholder="Phone Rest" onChange={e => self.change('rest',e.target.value)} defaultValue={this.state.phone_rest}/>
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="profilePic">Profile Pic</Label>
                              <Input type="text" name="pic" id="profilePic" placeholder="Profile Pic" onChange={e => self.change('pic',e.target.value)} defaultValue={this.state.pic}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={3}/>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="userPhoneRest">New Password (If you dont want to update leave blank)</Label>
                              <Input type="password" name="rest" id="userPhoneRest" placeholder="Password" onChange={e => self.change('password',e.target.value)}/>
                            </FormGroup>
                          </Col>
                          <Col md={3}/>
                        </Row>
                        <Row form>
                          <Col md={4}>
                            <FormGroup>
                              <Button style={{marginTop: "30px"}}>Update Account</Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                      <br/>
                      <h3 style={{textAlign:'center'}}>User Preview</h3>
                      <br/>
                      <Media>
                        <Media left>
                          <Media style={{maxHeight:'250px'}} object src={this.state.pic}/>
                        </Media>
                        <Media body style={{marginLeft:'20px'}}>
                          <Media heading>

                          </Media>
                          <h5>Name: {this.state.name}</h5>
                          <h5>e-mail: {this.state.email}</h5>
                          <h5>Gender: {
                            this.state.gender == true ?
                                "Male"
                                :
                                "Female"
                          }</h5>
                          <h5>Birthday: {this.state.dob}</h5>
                          <h5>Phone Region: {this.state.phone_first3}</h5>
                          <h5>Phone Rest: {this.state.phone_rest}</h5>
                          <h5>Admin: {
                            this.state.admin == true ?
                                "Yes"
                                :
                                "No"
                          }</h5>
                        </Media>
                      </Media>
                    </>
                  </Container>
                </Container>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col md="1"/>
                <Col md="2">
                  <h3>Address</h3>
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper" style={{fontSize: '12px'}}>
                      <Nav id="tabs" role="tablist" tabs>
                        {
                          self.state.address != null && (
                              self.state.address.map(function (v, i) {
                                return (
                                    <NavItem>
                                      <NavLink
                                          className={self.state.activeCategories === v.id ? "active" : ""}
                                          onClick={() => {
                                            self.toggleAddress(i);
                                          }}
                                      >
                                        <h6>{i+1}.Address</h6>
                                      </NavLink>
                                    </NavItem>
                                );
                              })
                          )
                        }
                      </Nav>
                    </div>
                  </div>
                </Col>
                <Col md="8">
                  {
                    (this.state.anAddress != null) ? (
                        <Form onSubmit={(e) => self.handleSubmitAddressUpdate(e)}>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="userAddress">Address</Label>
                                <Input type="text" name="name" id="userAddress" placeholder="Address" onChange={e => self.change('address',e.target.value)} value={this.state.anAddress}/>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Button style={{marginTop: "30px"}}>Update Address</Button>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Form>
                    ) : (
                        <div className={'text-center'}>
                          <h3>Firstly Choose Address That You Want To Update.</h3>
                        </div>
                    )
                  }
                </Col>
                <Col md="1"/>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col md="1"/>
                <Col md="2">
                  <h3>Orders</h3>
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper" style={{fontSize: '12px'}}>
                      <Nav id="tabs" role="tablist" tabs>
                        {
                          self.state.orders != null && (
                              this.state.orders.map(function (v, i) {
                                return (
                                    <NavItem>
                                      <NavLink
                                          className={self.state.activeCategories === v.id ? "active" : ""}
                                          onClick={() => {
                                            self.toggleOrders(i);
                                          }}
                                      >
                                        <h6>{v.payment.payment_date}</h6>
                                      </NavLink>
                                    </NavItem>
                                );
                              })
                          )
                        }
                      </Nav>
                    </div>
                  </div>
                </Col>
                <Col md="8">
                  {
                    (this.state.anOrder != null) ? (
                        <>
                          <Row>
                            <Col md={6}>
                              <h3>Your orders status is {this.state.anOrder.payment.stat}</h3>
                            </Col>
                            <Col md={6} style={{textAlign: "end"}}>
                              {
                                ((this.state.anOrder.payment.stat === "Preparing")) && (
                                    <Row form>
                                      <Col md={4}/>
                                      <Col md={8}>
                                        <Button onClick={(e) => self.cancelOrder(e)}>Cancel Order</Button>
                                      </Col>
                                    </Row>
                                )
                              }
                            </Col>
                          </Row>
                          <Form>
                            <div className="list-group">
                              {
                                this.state.anOrder.itemList != null && (
                                    this.state.anOrder.itemList.map(function (v, i) {
                                      return (
                                          <a className="list-group-item list-group-item-action flex-column align-items-start">
                                            <div className="d-flex w-100 justify-content-between">
                                              <h5 className="mb-1">{v.itemIdentifier.product_name}</h5>
                                              <small>Number of product in order: #{v.amount}</small>
                                            </div>
                                            <Row>
                                              <Col md={3}>
                                              </Col>
                                              <Col md={6} style={{textAlign: "center"}}>
                                                <img
                                                    alt="..."
                                                    className="img-rounded img-no-padding img-responsive"
                                                    src={v.product_pic}
                                                />
                                              </Col>
                                              <Col md={3}>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md={3}/>
                                              <Col md={6} style={{textAlign: "center"}}>
                                                <p className="mb-1">{v.itemIdentifier.product_author} | {v.itemIdentifier.product_printer}</p>
                                                <FormGroup style={{marginTop: '15px'}}>
                                                  <Label for="totalAmount" style={{paddingRight: '10px'}}>Total price: {v.amount * v.unit_price}$</Label>
                                                </FormGroup>
                                              </Col>
                                              <Col md={3}/>
                                            </Row>
                                            {
                                              ((self.state.anOrder.payment.stat === "Arrive")) && (
                                                  <Row>
                                                    <Col md={3}/>
                                                    <Col md={6}>
                                                      <Form>
                                                        <FormGroup>
                                                          <Label for="productPrinter">Comment</Label>
                                                          <Input type="text" name="printer" id="productPrinter" placeholder="Comment" onChange={e => self.change('comment',e.target.value)}/>
                                                        </FormGroup>
                                                        <FormGroup>
                                                          <div className="mb-3">
                                                            <label htmlFor="existAddress">Chosse Rate</label>
                                                            <Input type="select" name="existAddress" id="userAddress" placeholder="Choose Rate" onChange={e => self.change('rate',e.target.value)}>
                                                              <option value={0}>Choose Rate</option>
                                                              <option value={1}>Bad</option>
                                                              <option value={2}>Not Bad</option>
                                                              <option value={3}>Normal</option>
                                                              <option value={4}>Good</option>
                                                              <option value={5}>Very Good</option>
                                                            </Input>
                                                          </div>
                                                        </FormGroup>
                                                        <FormGroup>
                                                          <Button onClick={()=>self.makeComment(i)}>Make Comment</Button>
                                                        </FormGroup>
                                                      </Form>
                                                    </Col>
                                                    <Col md={3}/>
                                                  </Row>
                                              )
                                            }
                                          </a>
                                      );
                                    })
                                )
                              }
                            </div>
                          </Form>
                        </>
                    ) : (
                        <div className={'text-center'}>
                          <h3>Firstly Choose Order That You Want To Update.</h3>
                        </div>
                    )
                  }
                </Col>
                <Col md="1"/>
              </Row>
            </TabPane>
          </TabContent>

          <DemoFooter />
        </>
    );
  };
}

export default UserProfilePage;

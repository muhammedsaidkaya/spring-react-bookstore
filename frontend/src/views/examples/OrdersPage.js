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
  Col,
  Table,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  ListGroup, ListGroupItem
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
let self = null;
class ProfilePage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      orders: null,
      order: null,
      page: 0,
      form: {
        productIDentifier: {
          name: "",
          printer: "",
          writter: "",
          volume: ""
        },
        stock: 0,
        price: 0,
        category_id: 0,
        brief: "",
        product_pic: "",
      },
    };
  }
  componentDidMount() {
    self.getOrders();
    self.render();
  }
  sendEditPage(e,i){
    e.preventDefault();
    self.setState({
      order: self.state.orders[i],
      form: self.state.orders[i],
      page: 1,
      newStatus: "Chosse",
    });
  }
  sendDelete(e,i){
    e.preventDefault();
    let order = self.state.orders[i].payment.paymentIden;
    let data= {
      paymentIden: order,
      new_stat: "Canceled"
    };
    Api.updateOrder(data).then(function (response) {
      self.getOrders();
      message.success("Order has been canceled.");
    }).catch(error => {
      UserInfo.generalAlert(error);
    });
  }
  updateOrder(e,i){
    e.preventDefault();
    if(this.state.newStatus != "Chosse")
    {
      console.log(i);
      let order = self.state.order.payment.paymentIden;
      let data= {
        paymentIden: order,
        new_stat: this.state.newStatus
      };
      Api.updateOrder(data).then(function (response) {
        self.getOrders();
        self.setState({
          page: 0
        });
        message.success("Order has been canceled.");
      }).catch(error => {
        UserInfo.generalAlert(error);
      });
    }else{
      message.error("You have to chosse new status");
    }
  }
  getOrders(){
    Api.getOrders().then(function (response) {
      self.setState({
        orders: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  toList(){
    self.setState({
      order: null,
      page: 0
    });
  }
  handleSubmitUpdate(e){
    e.preventDefault();
    self.setState({
      page: 0,
      form: {
        productIDentifier: {
          name: "",
          printer: "",
          writter: "",
          volume: ""
        },
        stock: 0,
        price: 0,
        category_id: 0,
        brief: "",
        product_pic: "",
      },
      order: null,
    });
    self.getOrders();
  }
  change(type,value){
    if(type === "status"){
      self.setState({
        newStatus: value,
      });
    }
  };
  render(){
    return (
        <>
          <IndexNavbar />
          <ProfilePageHeader />
          <div className="section profile-content">
            <Container>
              <Container>
                <br/>
                <br/>
                {
                  self.state.page == 0 ? (
                      <>
                        <Row>
                          <Col className="ml-auto mr-auto text-center" md="6">
                            <p>
                              Order Manipulate Page
                            </p>
                            <br />
                            {
                              this.state.page != 0 && (
                                  <Button className="btn-round" color="default" onClick={() => self.toList()} outline>
                                    <i className="fa fa-plus-square-o" /> List Products
                                  </Button>
                              )
                            }

                          </Col>
                        </Row>
                        <Table striped>
                          <thead>
                          <tr>
                            <th>#</th>
                            <th>Edit</th>
                            <th>Cancel</th>
                            <th>User e-mail</th>
                            <th>Total Price</th>
                            <th>Payment Date-Time</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            self.state.orders != null && (
                                this.state.orders.map(function (v, i) {
                                  return (
                                      <tr>
                                        <th scope="row">{i}</th>
                                        <th scope="row"><a href={''} onClick={(e) => self.sendEditPage(e,i)}><i className={'fa fa-pencil-square-o'}/></a></th>
                                        <th scope="row">
                                          <Popconfirm
                                              title="Are you sure cancel this order?"
                                              onConfirm={(e) =>self.sendDelete(e,i)}
                                              okText="Yes"
                                              cancelText="No"
                                          >
                                            <a href={''}><i className={'nc-icon nc-simple-remove'}/></a>
                                          </Popconfirm>
                                        </th>
                                        <td>{v.address.addressIdentifier.user_email}</td>
                                        <td>{v.payment.total_price}</td>
                                        <td>{v.payment.payment_date + " - " + v.payment.payment_time}</td>
                                      </tr>
                                  );
                                })
                            )
                          }
                          </tbody>
                        </Table>
                      </>
                  ) : self.state.page == 1 && (
                    <>
                      <div className="owner">
                        <div className="avatar">
                          <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={this.state.order.profile_pic}
                          />
                        </div>
                        <div className="name">
                          <h4 className="title">
                            {this.state.order.username} <br />
                          </h4>
                          <Button className="btn-round" color="default" onClick={() => self.toList()} outline>
                            <i className="fa fa-plus-square-o" /> Return List Orders
                          </Button>
                          <br/>
                          <br/>
                          <h6 className="description">Paid User Infos</h6>
                          <br/>
                        </div>
                      </div>
                      <Row>
                        <Col className="ml-auto mr-auto" md="6">
                          <ListGroup>
                            <ListGroupItem>User e-mail: {this.state.order.address.addressIdentifier.user_email}</ListGroupItem>
                            <ListGroupItem>User mobile-phone: {this.state.order.phoneFirst + " " + this.state.order.phoneRest}</ListGroupItem>
                            <ListGroupItem>Shipping address: {this.state.order.address.address}</ListGroupItem>
                            <ListGroupItem>Payment date: {this.state.order.payment.payment_date}</ListGroupItem>
                            <ListGroupItem>Total price: {this.state.order.payment.total_price}$</ListGroupItem>
                            <ListGroupItem>Exist Statu: {this.state.order.payment.stat}</ListGroupItem>
                            <ListGroupItem>
                              <form className="needs-validation" noValidate="">
                                <div className="mb-3">
                                  <label htmlFor="existAddress">Chosse Status</label>
                                  <Input type="select" name="existAddress" id="userAddress" placeholder="Choose New Status" onChange={e => self.change('status',e.target.value)}>
                                    <option value="Chosse">Choose New Status</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Arrive">Arrive</option>
                                    <option value="Canceled">Cancel</option>
                                  </Input>
                                </div>
                              </form>
                            </ListGroupItem>
                            <ListGroupItem>
                              <button className="btn btn-primary btn-lg btn-block" onClick={(e) => self.updateOrder(e)} type="submit">Make Payment via Credit Card</button>
                            </ListGroupItem>
                          </ListGroup>
                        </Col>
                      </Row>
                      <br/>
                      <div className="owner">
                        <div className="name">
                          <h6 className="description">Paid Products Infos</h6>
                          <br/>
                        </div>
                      </div>
                      <Row>
                        <Col className="ml-auto mr-auto" md="6">
                          <ul className="list-unstyled follows">
                            {
                              self.state.order.itemList != null && (
                                  this.state.order.itemList.map(function (v, i) {
                                    return (
                                        <>
                                          <li>
                                            <Row>
                                              <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                <img
                                                    alt="..."
                                                    className="img-rounded img-no-padding img-responsive"
                                                    src={v.product_pic}
                                                />
                                              </Col>
                                              <Col className="ml-auto mr-auto" lg="9" md="8" xs="8">
                                                <h6>
                                                  Product Name: {v.itemIdentifier.product_name} <br />
                                                  <small>Product Author: {v.itemIdentifier.product_author}</small><br />
                                                  <small>Product Printer: {v.itemIdentifier.product_printer}</small><br />
                                                  <small>Product Volume: {v.itemIdentifier.product_volume}</small><br />
                                                  <small>Product Amount: {v.amount}</small><br />
                                                  <small>Total Price: {v.amount * v.unit_price}</small>
                                                </h6>
                                              </Col>
                                            </Row>
                                          </li>
                                          <hr />
                                        </>
                                    );
                                  })
                              )
                            }

                          </ul>
                        </Col>
                      </Row>
                    </>
                  )
                }
              </Container>
            </Container>
          </div>
          <DemoFooter />
        </>
    );
  };
}

export default ProfilePage;

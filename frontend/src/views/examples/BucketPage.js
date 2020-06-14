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
class BucketPage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      page: 0,
      address: null,
      bucketProducts: null,
      newAddress: null,
      selectedAddress: "new",
      ccName: null,
      ccNumber: null,
      ccExp: null,
      ccCVV: null,
    };
  }
  componentDidMount() {
    self.getBucket();
    self.getAddress();
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
  getBucket() {
    Api.getBucket().then(function (response) {
      self.setState({
        bucketProducts: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  goToCheckOut(){
    self.setState({
      page: 1,
    });
  }
  addAmount(e){
    self.setState({
      amount: e
    });
  }
  removeProduct(i,e){
    e.preventDefault();
    Api.deleteBucket(this.state.bucketProducts[i]).then(function (response) {
      message.success("Safetly Deleted.");
      self.getBucket();
    }).catch(error => {
      console.log(error);
    });
  }
  change(type,value){
    if(type === "address"){
      self.setState({
        selectedAddress: value,
        newAddress: null,
      });
    }
    if(type === "newAddress"){
      self.setState({
        selectedAddress: "new",
        newAddress: value,
      });
    }
    if(type === "ccName"){
      self.setState({
        ccName: value,
      });
    }
    if(type === "ccNumber"){
      self.setState({
        ccNumber: value,
      });
    }
    if(type === "ccExp"){
      self.setState({
        ccExp: value,
      });
    }
    if(type === "ccCVV"){
      self.setState({
        ccCVV: value,
      });
    }
    self.render();
  };
  handleSubmitUpdate(e){
    e.preventDefault();
    if(
        (this.state.form.productIDentifier.name == "") ||
        (this.state.form.productIDentifier.printer == "") ||
        (this.state.form.productIDentifier.writter == "") ||
        (this.state.form.stock == 0) ||
        (this.state.form.price == 0) ||
        (this.state.form.brief == "") ||
        (this.state.form.category_id == 0) ||
        (this.state.form.product_pic == "")
    )
    {
      message.error("There is at least one requiered field is empty");
    }
    else{
      if((this.state.form.stock >= 0) && (this.state.form.price >= 0))
      {
        Api.updateProducts(this.state.form).then(function (response) {
          message.success("Update is success");
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
            product: null,
          });
          self.getProdutcs();
        }).catch(error => {
          UserInfo.generalAlert(error);
        });
      }
      else
      {
        message.error("Stock and Price cannot be less than 0");
      }
    }
  }
  addAdress(e){
    e.preventDefault();
    if(this.state.selectedAddress == "new")
    {
      if((this.state.newAddress != null) && (this.state.newAddress != ""))
      {
        Api.addAddress(this.state.newAddress).then(function (response) {
          message.success("Address has been added.");
          self.getAddress();
          self.render();
        }).catch(error => {
          console.log(error);
        });
      }else{
        message.error("Address Field Cannot Be Empty.");
      }
    }
  }
  submitPayment(e){
    e.preventDefault();
    const masterCard = RegExp('^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$');
    const visaCard = RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    const exp = RegExp('^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$');
    if(
        ((this.state.ccName != null) && (this.state.ccName != "")) &&
        ((this.state.ccNumber != null) && (this.state.ccNumber != "")) &&
        ((this.state.ccExp != null) && (this.state.ccExp != "")) &&
        ((this.state.ccCVV != null) && (this.state.ccCVV != ""))
    )
    {
      if(masterCard.test(this.state.ccNumber) || visaCard.test(this.state.ccNumber))
      {
        if(exp.test(this.state.ccExp))
        {
          if(this.state.ccCVV.length == 3)
          {
            let mount = this.state.ccExp.charAt(0) + this.state.ccExp.charAt(1);
            let year = this.state.ccExp.charAt(2) + this.state.ccExp.charAt(3);
            if(Number(year) >= 20)
            {
              if((Number(year) == 20) && (Number(mount) >= 7))
              {
                if(this.state.selectedAddress != "new")
                {
                  let data = {
                    "cc":{
                      "paymentIden":{
                        "bucket_id": this.state.bucketProducts[0].itemIdentifier.bucket_id,
                        "user_email":UserInfo.getEmail(),
                      },
                      "card_num" : this.state.ccNumber,
                      "cvc" : Number(this.state.ccCVV)
                    },
                    "items": this.state.bucketProducts,
                    "address": this.state.address[this.state.selectedAddress]
                  };
                  Api.payment(data).then(function (response) {
                    message.success("You have been pay the bill.");
                    self.setState({
                      page: 0,
                    });
                    self.getBucket();
                  }).catch(error => {
                    console.log(error);
                  });
                }
                else{
                  message.error("You have to choosse address");
                }
              }
              else if(Number(year) > 20)
              {
                if(this.state.selectedAddress != "new")
                {
                  let data = {
                    "cc":{
                      "paymentIden":{
                        "bucket_id": this.state.bucketProducts[0].itemIdentifier.bucket_id,
                        "user_email":UserInfo.getEmail(),
                      },
                      "card_num" : this.state.ccNumber,
                      "cvc" : Number(this.state.ccCVV)
                    },
                    "items": this.state.bucketProducts,
                    "address": this.state.address[this.state.selectedAddress]
                  };
                  Api.payment(data).then(function (response) {
                    message.success("You have been pay the bill.");
                    self.setState({
                      page: 0,
                    });
                    self.getBucket();
                  }).catch(error => {
                    console.log(error);
                  });
                }
                else{
                  message.error("You have to choosse address");
                }
              }
              else
              {
                message.error("Card Exp Date is Expired.");
              }
            }
            else
            {
              message.error("Card Exp Date is Expired.");
            }
          }else{
            message.error("Card CVV Is Invalid.");
          }
        }else{
          message.error("Card Exp Date Is Invalid.");
        }
      }else {
        message.error("Card Number Is Invalid.");
      }
    }
    else
    {
      message.error("Credit Card Fields Cannot Be Empty.");
    }
  }
  render(){
    return (
        <>
          <IndexNavbar />
          <ProfilePageHeader />
          {
            this.state.page == 0 ?
                (
                    <Container>
                      <Row>
                        <Col md={3}/>
                        <Col md={6}>
                          <br/>
                          <br/>
                          <h4 style={{textAlign: "center"}}>You can manipulate your bucket or you can goto checkout</h4>
                          <br/>
                          <br/>
                          {
                            ((this.state.bucketProducts != null) && (this.state.bucketProducts.length != 0)) ? (
                                <Form>
                                  <div className="list-group">
                                    {
                                      self.state.bucketProducts != null && (
                                          this.state.bucketProducts.map(function (v, i) {
                                            return (
                                                <a className="list-group-item list-group-item-action flex-column align-items-start">
                                                  <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">{v.itemIdentifier.product_name}</h5>
                                                    <small>Number of product in bucket: #{v.amount}</small>
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
                                                    <Col md={3}></Col>
                                                    <Col md={6} style={{textAlign: "center"}}>
                                                      <p className="mb-1">{v.itemIdentifier.product_author} | {v.itemIdentifier.product_printer}</p>
                                                      <FormGroup style={{marginTop: '15px'}}>
                                                        <Label for="totalAmount" style={{paddingRight: '10px'}}>Total price: {v.amount * v.unit_price}$</Label>
                                                        <Button onClick={(e)=>self.removeProduct(i,e)}>Remove all</Button>
                                                      </FormGroup>
                                                    </Col>
                                                    <Col md={3}>
                                                    </Col>
                                                  </Row>
                                                  <Row>
                                                    <Col md={10}/>
                                                  </Row>
                                                </a>
                                            );
                                          })
                                      )
                                    }
                                  </div>
                                  <br/>
                                  <Row form>
                                    <Col md={8}/>
                                    <Col md={4}>
                                      <Button onClick={this.goToCheckOut}>Goto Checkout</Button>
                                    </Col>
                                  </Row>
                                </Form>
                            ) : (
                                <h4 style={{textAlign: "center"}}>There is no product in your bucket.</h4>
                            )
                          }
                        </Col>
                        <Col md={3}/>
                      </Row>
                    </Container>
                ) : (
                    <div className="container">
                      <div className="py-5 text-center">
                        <h2>Checkout</h2>
                        <p className="lead">You can checkout via that form </p>
                      </div>
                      <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                          <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{self.state.bucketProducts != null && (self.state.bucketProducts.length)}</span>
                          </h4>
                          <ul className="list-group mb-3">
                            {
                              self.state.bucketProducts != null && (
                                  this.state.bucketProducts.map(function (v, i) {
                                    return (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                          <div>
                                            <h6 className="my-0">{v.itemIdentifier.product_name}</h6>
                                            <small className="text-muted">{v.itemIdentifier.product_author}</small>
                                          </div>
                                          <span className="text-muted">${v.amount * v.unit_price}</span>
                                        </li>
                                    );
                                  })
                              )
                            }
                          </ul>
                        </div>
                        <div className="col-md-8 order-md-1">
                          <h4 className="mb-3">Billing address</h4>
                          <form className="needs-validation" noValidate="">
                            {
                              (this.state.address != null) && (
                                  <div className="mb-3">
                                    <label htmlFor="existAddress">Chosse Exist Address</label>
                                    <Input type="select" name="existAddress" id="userAddress" placeholder="Choose Exist Address" onChange={e => self.change('address',e.target.value)}>
                                      <option value="new">Create new address</option>
                                      {
                                        self.state.address != null && (
                                            this.state.address.map(function (v, i) {
                                              return (
                                                  <option value={i}>{v.address}</option>
                                              );
                                            })
                                        )
                                      }
                                    </Input>
                                  </div>
                              )
                            }
                            {
                              (this.state.selectedAddress == "new") && (
                                <>
                                  <div className="mb-3">
                                    <label htmlFor="address">Enter New Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="Enter Your Address" required="" onChange={e => self.change('newAddress',e.target.value)} value={this.state.newAddress}/>
                                    <div className="invalid-feedback">
                                      Please enter your shipping address.
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <button className="btn btn-primary btn-lg btn-block" onClick={(e) => self.addAdress(e)} type="submit">Create Address</button>
                                  </div>
                                </>
                              )
                            }
                            <hr className="mb-4"/>
                            <h4 className="mb-3">Payment via Credit Card</h4>
                            <div>
                              <div className="row">
                                <div className="col-md-6 mb-3">
                                  <label htmlFor="cc-name">Name on card</label>
                                  <input type="text" className="form-control" id="cc-name" placeholder="" required="" onChange={e => self.change('ccName',e.target.value)}/>
                                  <small className="text-muted">Full name as displayed on card</small>
                                  <div className="invalid-feedback">
                                    Name on card is required
                                  </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                  <label htmlFor="cc-number">Credit card number</label>
                                  <input type="text" className="form-control" id="cc-number" placeholder="" required="" onChange={e => self.change('ccNumber',e.target.value)}/>
                                  <div className="invalid-feedback">
                                    Credit card number is required
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-3 mb-3">
                                  <label htmlFor="cc-expiration">Expiration</label>
                                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" onChange={e => self.change('ccExp',e.target.value)}/>
                                  <div className="invalid-feedback">
                                    Expiration date required
                                  </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <label htmlFor="cc-expiration">CVV</label>
                                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" onChange={e => self.change('ccCVV',e.target.value)}/>
                                  <div className="invalid-feedback">
                                    Security code required
                                  </div>
                                </div>
                              </div>
                              <hr className="mb-4"/>
                              <button className="btn btn-primary btn-lg btn-block" onClick={(e) => self.submitPayment(e)} type="submit">Make Payment via Credit Card</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                )
          }
          <DemoFooter />
        </>
    );
  };
}

export default BucketPage;

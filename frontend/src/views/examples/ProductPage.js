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
  FormText,
  Form,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col, Table
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import Api from "../../components/Api/api";
import UserInfo from "../../components/Api/userInfo";
let self = null;

class ProductPage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      products: null,
    };
  }

  componentDidMount() {
    self.getProdutcs();
  }

  getProdutcs(){
    Api.getProduct().then(function (response) {
      self.setState({
        products: JSON.stringify(response.data)
      });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
        <>
          <IndexNavbar />
          <ProfilePageHeader />
          <div className="section profile-content">
            <Container>
              <br/>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="6">
                  <p>
                    Product Manipulate Page
                  </p>
                  <br />
                  <Button className="btn-round" color="default" outline>
                    <i className="fa fa-plus-square-o" /> Add Products
                  </Button>
                </Col>
              </Row>
              <br />
              <Container>
                <br/>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="productName">Name</Label>
                        <Input type="text" name="name" id="productName" placeholder="Product Name" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="productPrinter">Printer</Label>
                        <Input type="text" name="printer" id="productPrinter" placeholder="Product Printer" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="productWritter">Writter</Label>
                    <Input type="text" name="writter" id="productWritter" placeholder="Product Writer"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="productVolume">Volume</Label>
                    <Input type="text" name="volume" id="productVolume" placeholder="Product Volume"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="productStock">Stock</Label>
                    <Input type="text" name="stock" id="productStock" placeholder="Product Stock"/>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="productCategory" sm={2}>Category</Label>
                    <Col sm={10}>
                      <Input type="select" name="category" id="productCategory">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="productBrief">Brief</Label>
                        <Input type="text" name="brief" id="productBrief" placeholder="Product Brief"/>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup row>
                        <Label for="productPicture" sm={2}>Product Picture</Label>
                        <Col sm={10}>
                          <Input type="file" name="picture" id="productPicture" />
                          <FormText color="muted">
                            Picture of product
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button>Add Product</Button>
                </Form>
              </Container>
            </Container>
          </div>
          <DemoFooter />
        </>
    );
  };
}

export default ProductPage;

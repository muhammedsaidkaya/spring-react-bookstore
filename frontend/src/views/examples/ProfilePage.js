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
class ProfilePage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      products: null,
      product: null,
      page: 0,
      activeTab: "1",
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
      categories: null,
      feedbacks: null,
    };
  }
  componentDidMount() {
    self.getProdutcs();
    self.getCategories();
    self.render();
  }
  sendEditPage(e,i){
    e.preventDefault();
    self.setState({
      product: self.state.products[i],
      form: self.state.products[i],
      page: 1
    });
  }
  sendDelete(e,i){
    e.preventDefault();
    Api.deleteProduct(self.state.products[i].productIDentifier).then(function (response) {
      message.success("Delete is success");
      self.getProdutcs();
    }).catch(error => {
      console.log(error);
    });
  }
  sendFeedbackDelete(e,i){
    e.preventDefault();
    Api.deleteFeedback(self.state.feedbacks[i].itemIdentifier).then(function (response) {
      message.success("Delete is success");
      self.toggle("2");
    }).catch(error => {
      console.log(error);
    });
  }
  getCategories(){
    Api.getCategories().then(function (response) {
      self.setState({
        categories: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  getProdutcs(){
    Api.getProduct().then(function (response) {
      self.setState({
        products: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  toList(){
    self.setState({
      product: null,
      feedbacks: null,
      activeTab: "1",
      page: 0
    });
  }
  toNewProduct(){
    self.setState({
      product: null,
      page: 1
    });
  }
  handleSubmitAdd(e){
    e.preventDefault();
    if(
        (this.state.form.productIDentifier.name == "") ||
        (this.state.form.productIDentifier.printer == "") ||
        (this.state.form.productIDentifier.writter == "") ||
        (this.state.form.productIDentifier.volume == "") ||
        (this.state.form.stock == 0) ||
        (this.state.form.price == 0) ||
        (this.state.form.brief == "") ||
        (this.state.form.product_pic == "")
    )
    {
      message.error("There is at least one requiered field is empty");
    }
    else{
      if((this.state.form.stock >= 0) && (this.state.form.price >= 0) && (this.state.form.productIDentifier.volume >= 0))
      {
        Api.addProducts(this.state.form).then(function (response) {
          message.success("Adding is success");
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
          UserInfo.generalAlert(error.response);
        });
      }
      else
      {
        message.error("Stock, Volume, Price cannot be less than 0");
      }

    }
  }
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
  change(type,value){
    if(type == 'name'){
      self.setState({
        form: {
          productIDentifier: {
            name: value,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    } else if(type == 'printer'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: value,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'writter'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: value,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'volume'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: value,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'stock'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: value,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'price'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: value,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'category'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: value,
          brief: this.state.form.brief,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'brief'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: value,
          product_pic: this.state.form.product_pic,
        }
      })
    }else if(type == 'picture'){
      self.setState({
        form: {
          productIDentifier: {
            name: this.state.form.productIDentifier.name,
            printer: this.state.form.productIDentifier.printer,
            writter: this.state.form.productIDentifier.writter,
            volume: this.state.form.productIDentifier.volume,
          },
          stock: this.state.form.stock,
          price: this.state.form.price,
          category_id: this.state.form.category_id,
          brief: this.state.form.brief,
          product_pic: value,
        }
      })
    }
  }
  getCategory(id){
    this.state.categories.map(function (v, i) {
      if(id == v.id){
        return v.name;
      }
    })
  }
  toggle(type){
    self.setState({
      activeTab: type
    });
    if(type == "2"){
      Api.getFeedback(this.state.product.productIDentifier).then(function (response) {
        self.setState({
          feedbacks: response.data
        });
      }).catch(error => {
        console.log(error);
      });
    };
  }
  render(){
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
                  {
                    this.state.page == 0 ? (
                        <Button className="btn-round" color="default" onClick={() => self.toNewProduct()} outline>
                          <i className="fa fa-plus-square-o" /> Add Products
                        </Button>
                    ): (
                        <Button className="btn-round" color="default" onClick={() => self.toList()} outline>
                          <i className="fa fa-plus-square-o" /> List Products
                        </Button>
                    )
                  }

                </Col>
              </Row>
              <br />
              <Container>
                <br/>
                {
                  self.state.page == 0 ? (
                      <Table striped>
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>Edit</th>
                          <th>Delete</th>
                          <th>Product Name</th>
                          <th>Product Author</th>
                          <th>Product Stock</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          self.state.products != null && (
                              this.state.products.map(function (v, i) {
                                return (
                                    <tr>
                                      <th scope="row">{i}</th>
                                      <th scope="row"><a href={''} onClick={(e) => self.sendEditPage(e,i)}><i className={'fa fa-pencil-square-o'}/></a></th>
                                      <th scope="row">
                                        <Popconfirm
                                            title="Are you sure delete this products?"
                                            onConfirm={(e) =>self.sendDelete(e,i)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                          <a href={''}><i className={'fa fa-trash-o'}/></a>
                                        </Popconfirm>
                                      </th>
                                      <td>{v.productIDentifier.name}</td>
                                      <td>{v.productIDentifier.writter}</td>
                                      <td>{v.stock}</td>
                                    </tr>
                                );
                              })
                          )
                        }
                        </tbody>
                      </Table>
                  ) : self.state.page == 1 && (
                      self.state.product == null ? (
                          <Form onSubmit={(e) => self.handleSubmitAdd(e)}>
                            <Row form>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="productName">Name</Label>
                                  <Input type="text" name="name" id="productName" placeholder="Product Name" onChange={e => self.change('name',e.target.value)}/>
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="productPrinter">Printer</Label>
                                  <Input type="text" name="printer" id="productPrinter" placeholder="Product Printer" onChange={e => self.change('printer',e.target.value)}/>
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Label for="productWritter">Writter</Label>
                              <Input type="text" name="writter" id="productWritter" placeholder="Product Writer" onChange={e => self.change('writter',e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                              <Label for="productVolume">Volume</Label>
                              <Input type="text" name="volume" id="productVolume" placeholder="Product Volume" onChange={e => self.change('volume',e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                              <Label for="productStock">Stock</Label>
                              <Input type="text" name="stock" id="productStock" placeholder="Product Stock" onChange={e => self.change('stock',e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                              <Label for="productPrice">Price</Label>
                              <Input type="text" name="price" id="productPrice" placeholder="Product Price" onChange={e => self.change('price',e.target.value)}/>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="productCategory" sm={2}>Category</Label>
                              <Col sm={10}>
                                <Input type="select" name="category" id="productCategory" onChange={e => self.change('category',e.target.value)}>
                                  {
                                    self.state.categories != null && (
                                        this.state.categories.map(function (v, i) {
                                          return(
                                              <option value={v.id}>{v.name}</option>
                                          );
                                        }))
                                  }
                                </Input>
                              </Col>
                            </FormGroup>
                            <Row form>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="productBrief">Brief</Label>
                                  <Input type="text" name="brief" id="productBrief" placeholder="Product Brief" onChange={e => self.change('brief',e.target.value)}/>
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <Label for="productPicture">Product Picture</Label>
                                  <Input type="text" name="picture" id="productPicture" placeholder="Product Picture" onChange={e => self.change('picture',e.target.value)} />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Button>Add Product</Button>
                          </Form>
                      ):(
                          <>
                            <div>
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
                                        Product Infos
                                      </NavLink>
                                    </NavItem>
                                    <NavItem>
                                      <NavLink
                                          className={this.state.activeTab === "2" ? "active" : ""}
                                          onClick={() => {
                                            this.toggle("2");
                                          }}
                                      >
                                        Product Feedback Infos
                                      </NavLink>
                                    </NavItem>
                                  </Nav>
                                </div>
                              </div>
                              <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                  <Form onSubmit={(e) => self.handleSubmitUpdate(e)}>
                                    <Row form>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Label for="productName">Name</Label>
                                          <Input disabled type="text" name="name" id="productName" placeholder="Product Name" onChange={e => self.change('name',e.target.value)} value={this.state.form.productIDentifier.name}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Label for="productPrinter">Printer</Label>
                                          <Input disabled type="text" name="printer" id="productPrinter" placeholder="Product Printer" onChange={e => self.change('printer',e.target.value)} value={this.state.form.productIDentifier.printer}/>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <FormGroup>
                                      <Label for="productWritter">Writter</Label>
                                      <Input disabled type="text" name="writter" id="productWritter" placeholder="Product Writer" onChange={e => self.change('writter',e.target.value)} value={this.state.form.productIDentifier.writter}/>
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="productVolume">Volume</Label>
                                      <Input disabled type="text" name="volume" id="productVolume" placeholder="Product Volume" onChange={e => self.change('volume',e.target.value)} value={this.state.form.productIDentifier.volume}/>
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="productStock">Stock</Label>
                                      <Input type="text" name="stock" id="productStock" placeholder="Product Stock" onChange={e => self.change('stock',e.target.value)} value={this.state.form.stock}/>
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="productPrice">Price</Label>
                                      <Input type="text" name="price" id="productPrice" placeholder="Product Price" onChange={e => self.change('price',e.target.value)} value={this.state.form.price}/>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Label for="productCategory" sm={2}>Category</Label>
                                      <Col sm={10}>
                                        <Input type="select" name="category" id="productCategory" onChange={e => self.change('category',e.target.value)} value={this.state.form.category_id}>
                                          {
                                            self.state.categories != null && (
                                                this.state.categories.map(function (v, i) {
                                                  return(
                                                      <option value={v.id}>{v.name}</option>
                                                  );
                                                }))
                                          }
                                        </Input>
                                      </Col>
                                    </FormGroup>
                                    <Row form>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Label for="productBrief">Brief</Label>
                                          <Input type="text" name="brief" id="productBrief" placeholder="Product Brief" onChange={e => self.change('brief',e.target.value)} value={this.state.form.brief}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Label for="productPicture">Product Picture</Label>
                                          <Input type="text" name="picture" id="productPicture" placeholder="Product Picture" onChange={e => self.change('picture',e.target.value)} value={this.state.form.product_pic} />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Button>Update Product</Button>
                                  </Form>
                                  <br/>
                                  <h3 style={{textAlign:'center'}}>Product Preview</h3>
                                  <br/>
                                  <Media>
                                    <Media left>
                                      <Media className={'img-thumbnail img-responsive'} style={{maxHeight:'250px'}} object src={this.state.form.product_pic}/>
                                    </Media>
                                    <Media body style={{marginLeft:'20px'}}>
                                      <Media heading>
                                        {this.state.form.productIDentifier.name+" | "+this.state.form.productIDentifier.writter+" | "+this.state.form.productIDentifier.printer+" | Volume "+this.state.form.productIDentifier.volume}
                                      </Media>
                                      <h5>Brief: {this.state.form.brief}</h5>
                                      <h5>Stock: {this.state.form.stock}</h5>
                                      <h5>Price: {this.state.form.price}$</h5>
                                    </Media>
                                  </Media>
                                </TabPane>
                                <TabPane tabId="2">
                                  <Table striped>
                                    <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Delete</th>
                                      <th>Comment Owner</th>
                                      <th>Comment</th>
                                      <th>Rate</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      self.state.feedbacks != null && (
                                          this.state.feedbacks.map(function (v, i) {
                                            return (
                                                <tr>
                                                  <th scope="row">{i}</th>
                                                  <th scope="row">
                                                    <Popconfirm
                                                        title="Are you sure delete this products?"
                                                        onConfirm={(e) =>self.sendFeedbackDelete(e,i)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                      <a href={''}><i className={'fa fa-trash-o'}/></a>
                                                    </Popconfirm>
                                                  </th>
                                                  <td>{v.itemIdentifier.user_email}</td>
                                                  <td>{v.explanation}</td>
                                                  <td>{v.rate}</td>
                                                </tr>
                                            );
                                          })
                                      )
                                    }
                                    </tbody>
                                  </Table>
                                </TabPane>
                              </TabContent>
                            </div>
                          </>
                      )
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

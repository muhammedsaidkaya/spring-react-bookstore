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
import Popconfirm from "antd/es/popconfirm";
import LandingPageHeader from "../../components/Headers/LandingPageHeader";
import SectionCarousel from "./SectionCarousel";
import BucketPage from "../examples/BucketPage";
import Form from "reactstrap/es/Form";
import Media from "reactstrap/es/Media";
let self = null;
class SectionProduct extends Component{
    constructor(props) {
        super(props);
        self = this;
        self.state = {
            activeTab: "1",
            activeCategories: 0,
            page: 0,
            products: null,
            amount: 0,
            categories: null,
            stactics: null,
            type: false,
            catName: "All Product",
            feedbacks: null,
        };
    }
    componentDidMount() {
        self.getProdutcs();
        self.getCategories();
        self.getStatistic();
        self.render();
    }
    toggle(type){
        if(type === "1"){
            this.getProdutcs();
        }
        if(type === "2"){
            self.getMostSellerProdutcs();
            self.setState({
                type: true,
            });
        }
        if(type === "3"){
            self.getMostRatedProdutcs();
            self.setState({
                type: true,
            });
        }
        self.setState({
            activeTab: type,
            activeCategories: 0,
            catName: "All Product",
        });
    }
    toggleCategories(type){
        self.setState({
            activeCategories: type,
            catName: "Selected Category",
        });
        self.getByCategory(type);
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
    getByCategory(type){
        Api.getProductsByCategory(type).then(function (response) {
            self.setState({
                products: response.data,
                activeTab: "1",
            });
        }).catch(error => {
            console.log(error);
        });
    }
    getProdutcs(){
        Api.getProduct().then(function (response) {
            self.setState({
                products: response.data,
                type: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }
    getSearchProducts(e){
        Api.getBySearch(e).then(function (response) {
            self.setState({
                products: response.data,
                type: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }
    getStatistic(){
        Api.getStatistic().then(function (response) {
            self.setState({
                stactics: response.data
            });
        }).catch(error => {
            console.log(error);
        });
    }
    getMostSellerProdutcs(){
        let mostSelled= self.state.stactics.mostCommentedProducts.body;
        self.setState({
            products: mostSelled
        });
    }
    getMostRatedProdutcs(){
        let mostRated = self.state.stactics.highestRateProducts.body;
        self.setState({
            products: mostRated
        });
    }
    addBucket(i){
        let data = {
            "product_name":this.state.products[i].productIDentifier.name,
            "product_author":this.state.products[i].productIDentifier.writter,
            "product_volume":this.state.products[i].productIDentifier.volume,
            "product_printer":this.state.products[i].productIDentifier.printer,
            "user_email":UserInfo.getEmail(),
            "product_pic":this.state.products[i].product_pic,
            "amount":1,
            "unit_price":this.state.products[i].price
        };
        console.log(data);
        Api.addBucket(data).then(function (response) {
            message.success("Product Added to Bucket");
        }).catch(error => {
            console.log(error);
        });
    }
    addBucketMost(i){
        let data = {
            "product_name":this.state.products[i].product.productIDentifier.name,
            "product_author":this.state.products[i].product.productIDentifier.writter,
            "product_volume":this.state.products[i].product.productIDentifier.volume,
            "product_printer":this.state.products[i].product.productIDentifier.printer,
            "user_email":UserInfo.getEmail(),
            "product_pic":this.state.products[i].product.product_pic,
            "amount":1,
            "unit_price":this.state.products[i].product.price
        };
        Api.addBucket(data).then(function (response) {
            message.success("Product Added to Bucket");
        }).catch(error => {
            console.log(error);
        });
    }
    getProductDetail(i){
        self.setState({
            product: this.state.products[i],
            page: 1
        });
        Api.getFeedback(this.state.products[i].productIDentifier).then(function (response) {
            self.setState({
                feedbacks: response.data
            });
        }).catch(error => {
            console.log(error);
        });
    }
    getProductDetailMost(i){
        self.setState({
            product: this.state.products[i].product,
            page: 1
        });
    }
    addAmount(e){
        self.setState({
            amount: e
        });
    }
    addDetailProduct(){
        if(this.state.amount > this.state.product.stock) {
            message.error("You cannot buy greater than stock value.");
        }else if (this.state.amount < 0){
            message.error("You have to enter positive amount");
        }else{
            let data = {
                "product_name":this.state.product.productIDentifier.name,
                "product_author":this.state.product.productIDentifier.writter,
                "product_volume":this.state.product.productIDentifier.volume,
                "product_printer":this.state.product.productIDentifier.printer,
                "user_email":UserInfo.getEmail(),
                "product_pic":this.state.product.product_pic,
                "amount":this.state.amount,
                "unit_price":this.state.product.price
            };
            Api.addBucket(data).then(function (response) {
                message.success("Product Added to Bucket");
            }).catch(error => {
                console.log(error);
            });
        }
    }
    render(){
        return (
            <>
                {this.state.page == 0 ? (
                    <>
                        <LandingPageHeader />
                        <div className="main">
                            <br/>
                            <Row>
                                <Col md={"3"}/>
                                <Col md={"6"}>
                                    <FormGroup>
                                        <Label for="productPrinter">Search Product</Label>
                                        <Input type="text" name="printer" id="productPrinter" placeholder="Product Name..." onChange={(e) => self.getSearchProducts(e.target.value)}/>
                                    </FormGroup>
                                </Col>
                                <Col md={"3"}/>
                            </Row>
                            <br/>
                            <Row>
                                <Col md="1"/>
                                <Col md="2">
                                    <h3>Categories</h3>
                                    <div className="nav-tabs-navigation">
                                        <div className="nav-tabs-wrapper" style={{fontSize: '12px'}}>
                                            <Nav id="tabs" role="tablist" tabs>
                                                {
                                                    self.state.categories != null && (
                                                        this.state.categories.map(function (v, i) {
                                                            return (
                                                                <NavItem>
                                                                    <NavLink
                                                                        className={self.state.activeCategories === v.id ? "active" : ""}
                                                                        onClick={() => {
                                                                            self.toggleCategories(v.id);
                                                                        }}
                                                                    >
                                                                        <h6>{v.name}</h6>
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
                                <Col md="6">
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
                                                        {this.state.catName}
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "2" ? "active" : ""}
                                                        onClick={() => {
                                                            this.toggle("2");
                                                        }}
                                                    >
                                                        Most Seller 6 Products
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "3" ? "active" : ""}
                                                        onClick={() => {
                                                            this.toggle("3");
                                                        }}
                                                    >
                                                        Most Rated 6 Products
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <div className="album py-5 bg-light">
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            (this.state.type === false) && (
                                                                (self.state.products != null) && (
                                                                    (self.state.products.length !== 0) ?
                                                                        (
                                                                            this.state.products.map(function (v, i) {
                                                                                    return (
                                                                                        <div className="col-md-4">
                                                                                            <div className="card mb-4 box-shadow" style={{minHeight: '600px'}}>
                                                                                                <img className="card-img-top"
                                                                                                     data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                                                                                                     alt="Thumbnail [100%x225]"
                                                                                                     style={{height: "225px", width: "100%", display: "block"}}
                                                                                                     src={v.product_pic}
                                                                                                     data-holder-rendered="true"/>
                                                                                                <div className="card-body" style={{background: "#F7F4F3"}}>
                                                                                                    <p className="card-text">
                                                                                                        <b>{v.productIDentifier.name} | {v.productIDentifier.writter}</b>
                                                                                                        <br/>
                                                                                                        {v.brief.substring(0, 150)}...
                                                                                                    </p>
                                                                                                    <div
                                                                                                        className="d-flex justify-content-between align-items-center align-bottom">
                                                                                                        <div className="btn-group">
                                                                                                            <button type="button"
                                                                                                                    className="btn btn-sm" onClick={()=>self.getProductDetail(i)}>Detail
                                                                                                            </button>
                                                                                                            <button type="button"
                                                                                                                    className="btn btn-sm" onClick={()=>self.addBucket(i)}>Add
                                                                                                            </button>
                                                                                                        </div>
                                                                                                        <small className="text-muted">Stock: {v.stock}</small>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )
                                                                        ):(
                                                                            <h3>There is no product in this category. :(</h3>
                                                                        )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div className="album py-5 bg-light">
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            (this.state.type === true) && (
                                                                (self.state.products != null) && (
                                                                    (self.state.products.length !== 0) ?
                                                                        (
                                                                            this.state.products.map(function (v, i) {
                                                                                    return (
                                                                                        <div className="col-md-4">
                                                                                            <div className="card mb-4 box-shadow" style={{minHeight: '600px'}}>
                                                                                                <img className="card-img-top"
                                                                                                     data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                                                                                                     alt="Thumbnail [100%x225]"
                                                                                                     style={{height: "225px", width: "100%", display: "block"}}
                                                                                                     src={v.product.product_pic}
                                                                                                     data-holder-rendered="true"/>
                                                                                                <div className="card-body" style={{background: "#F7F4F3"}}>
                                                                                                    <p className="card-text">
                                                                                                        <b>{v.product.productIDentifier.name} | {v.product.productIDentifier.writter}</b>
                                                                                                        <br/>
                                                                                                        {v.product.brief.substring(0, 150)}...
                                                                                                    </p>
                                                                                                    <div
                                                                                                        className="d-flex justify-content-between align-items-center align-bottom">
                                                                                                        <div className="btn-group">
                                                                                                            <button type="button"
                                                                                                                    className="btn btn-sm" onClick={()=>self.getProductDetailMost(i)}>Detail
                                                                                                            </button>
                                                                                                            <button type="button"
                                                                                                                    className="btn btn-sm" onClick={()=>self.addBucketMost(i)}>Add
                                                                                                            </button>
                                                                                                        </div>
                                                                                                        <small className="text-muted">Stock: {v.product.stock}</small>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )
                                                                        ):(
                                                                            <h3>There is no product in this category. :(</h3>
                                                                        )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <div className="album py-5 bg-light">
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            (this.state.type === true) && (
                                                                (self.state.products != null) && (
                                                                    (self.state.products.length !== 0) ?
                                                                        (
                                                                            this.state.products.map(function (v, i) {
                                                                                    return (
                                                                                        <div className="col-md-4">
                                                                                            <div className="card mb-4 box-shadow" style={{minHeight: '600px'}}>
                                                                                                <img className="card-img-top"
                                                                                                     data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                                                                                                     alt="Thumbnail [100%x225]"
                                                                                                     style={{height: "225px", width: "100%", display: "block"}}
                                                                                                     src={v.product.product_pic}
                                                                                                     data-holder-rendered="true"/>
                                                                                                <div className="card-body" style={{background: "#F7F4F3"}}>
                                                                                                    <p className="card-text">
                                                                                                        <b>{v.product.productIDentifier.name} | {v.product.productIDentifier.writter}</b>
                                                                                                        <br/>
                                                                                                        {v.product.brief.substring(0, 150)}...
                                                                                                    </p>
                                                                                                    <div
                                                                                                        className="d-flex justify-content-between align-items-center align-bottom">
                                                                                                        <div className="btn-group">
                                                                                                            <button type="button"
                                                                                                                    className="btn btn-sm" onClick={()=>self.getProductDetailMost(i)}>Detail
                                                                                                            </button>
                                                                                                            <button type="button"
                                                                                                                    className="btn btn-sm" onClick={()=>self.addBucketMost(i)}>Add
                                                                                                            </button>
                                                                                                        </div>
                                                                                                        <small className="text-muted">Stock: {v.product.stock}</small>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )
                                                                        ):(
                                                                            <h3>There is no product in this category. :(</h3>
                                                                        )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                                <Col md="2">
                                    <h3>Statistics</h3>
                                    {
                                        this.state.stactics != null && (
                                            <ListGroup>
                                                <ListGroupItem>Today Log Count: {this.state.stactics.todayLogCount.body}</ListGroupItem>
                                                <ListGroupItem>All Log Count: {this.state.stactics.allLogCount.body}</ListGroupItem>
                                                <ListGroupItem>Today Payment Count: {this.state.stactics.todayPaymentCount.body}</ListGroupItem>
                                                <ListGroupItem>All Payment Count: {this.state.stactics.allPaymentCount.body}</ListGroupItem>
                                            </ListGroup>
                                        )
                                    }
                                </Col>
                                <Col md="1"/>
                            </Row>
                            <DemoFooter />
                        </div>
                    </>
                ):(
                    <>
                        <IndexNavbar />
                        <ProfilePageHeader />
                        <Row>
                            <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center">
                                <div className="my-3 p-3">
                                    <h2 className="display-5">Book Name: {this.state.product.productIDentifier.name}</h2>
                                    <p className="lead">Book Brief: {this.state.product.brief}</p>
                                </div>
                                <div className="bg-white box-shadow mx-auto"
                                     style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}>
                                    <div className="owner">
                                        <div className="avatar">
                                            <img
                                                alt="..."
                                                className="img-rounded img-no-padding img-responsive"
                                                src={this.state.product.product_pic}
                                                style={{marginTop: '50px'}}
                                            />
                                        </div>
                                        <div className="name">
                                            <h4 className="title">
                                                {this.state.product.productIDentifier.writter} <br />
                                            </h4>
                                            <br/>
                                            <h6 className="description">Product Info</h6>
                                            <br/>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col className="ml-auto mr-auto" md="6">
                                            <ListGroup>
                                                <ListGroupItem>Product Printer: {this.state.product.productIDentifier.printer}</ListGroupItem>
                                                <ListGroupItem>Product Volume: {this.state.product.productIDentifier.volume}</ListGroupItem>
                                                <ListGroupItem>Product Stock: {this.state.product.stock}</ListGroupItem>
                                                <ListGroupItem>Product Price: {this.state.product.price}$</ListGroupItem>
                                                <ListGroupItem>
                                                    <Form>
                                                        <Row form>
                                                            <Col md={2}/>
                                                            <Col md={5}>
                                                                <FormGroup>
                                                                    <Label for="totalAmount">Total Amount</Label>
                                                                    <Input type="text" name="totalAmount" id="totalAmount" onChange={(e) => self.addAmount(e.target.value)} placeholder="Enter Your Request Amount"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                    <Button style={{marginTop: "30px"}} onClick={() => self.addDetailProduct()}>Add Bucket</Button>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={2}/>
                                                        </Row>
                                                    </Form>
                                                </ListGroupItem>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="ml-auto mr-auto" md="6">
                                            <div className="text-center">
                                            <Table striped>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Email</th>
                                                    <th>Explation</th>
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
                                        </div>
                                        </Col>
                                    </Row>
                                    <div className="section profile-content">
                                        <Container>
                                            <br />
                                            <Container>
                                                <br/>
                                            </Container>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </>
                )}
            </>
        );
    };
}

export default SectionProduct;

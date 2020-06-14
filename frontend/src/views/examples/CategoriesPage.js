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
  Col, Table
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
class CategoriesPage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      categories: null,
      page: 0,
      form: null,
      name: null
    };
  }
  componentDidMount() {
    self.getCategories();
    self.render();
  }
  sendDelete(e,i){
    e.preventDefault();
    console.log(self.state.categories[i].id);
    Api.deleteCategory(self.state.categories[i].id).then(function (response) {
      message.success("Delete is success");
      self.getCategories();
    }).catch(error => {
      console.log(error);
    });
  }
  getCategories(){
    Api.getCategory().then(function (response) {
      self.setState({
        categories: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  toList(){
    self.setState({
      page: 0
    });
  }
  toNewCategory(){
    self.setState({
      page: 1
    });
  }
  change(type,value){
    if(type === "name"){
      self.setState({
        name: value,
      });
    }
  }
  handleSubmitAdd(e){
    e.preventDefault();
    if(
        (this.state.name == "") ||
        (this.state.name == null)
    )
    {
      message.error("There is at least one requiered field is empty");
    }
    else{
      Api.addCategory(this.state.name).then(function (response) {
        message.success("Adding is success");
        self.setState({
          page: 0,
          name: null,
        });
        self.getCategories();
      }).catch(error => {
        UserInfo.generalAlert(error.response);
      });
    }
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
                    Category Manipulate Page
                  </p>
                  <br />
                  {
                    this.state.page == 0 ? (
                        <Button className="btn-round" color="default" onClick={() => self.toNewCategory()} outline>
                          <i className="fa fa-plus-square-o" /> Add Category
                        </Button>
                    ): (
                        <Button className="btn-round" color="default" onClick={() => self.toList()} outline>
                          <i className="fa fa-plus-square-o" /> List Categories
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
                          <th>Delete</th>
                          <th>Category Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          self.state.categories != null && (
                              this.state.categories.map(function (v, i) {
                                return (
                                    <tr>
                                      <th scope="row">{i}</th>
                                      <th scope="row">
                                        {
                                          (v.name != "OTHERS") && (
                                              <Popconfirm
                                                  title="Are you sure delete this user?"
                                                  onConfirm={(e) =>self.sendDelete(e,i)}
                                                  okText="Yes"
                                                  cancelText="No"
                                              >
                                                <a href={''}><i className={'fa fa-trash-o'}/></a>
                                              </Popconfirm>
                                          )
                                        }
                                      </th>
                                      <td>{v.name}</td>
                                    </tr>
                                );
                              })
                          )
                        }
                        </tbody>
                      </Table>
                  ) : self.state.page == 1 && (
                      <>
                        <Form onSubmit={(e) => self.handleSubmitAdd(e)}>
                          <Row form>
                            <Col md={3}></Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="categoryName">Name</Label>
                                <Input type="text" name="name" id="categoryName" placeholder="Category Name" onChange={e => self.change('name',e.target.value)}/>
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <Button style={{marginTop: '30px'}}>Add Category</Button>
                            </Col>
                            <Col md={3}></Col>
                          </Row>
                        </Form>
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

export default CategoriesPage;

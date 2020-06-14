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
class UserPage extends Component{
  constructor(props) {
    super(props);
    self = this;
    self.state = {
      users: null,
      user: null,
      page: 0,
      form: null,
      name: null,
      email: null,
      gender: null,
      brithday: null,
      region: null,
      rest: null,
      pic: null,
      admin: null,
    };
  }
  componentDidMount() {
    self.getUsers();
    self.render();
  }
  sendEditPage(e,i){
    e.preventDefault();
    self.setState({
      user: self.state.users[i],
      form: self.state.users[i],
      page: 1,
      name: self.state.users[i].name,
      email: self.state.users[i].email,
      gender: self.state.users[i].gender,
      brithday: self.state.users[i].dob,
      region: self.state.users[i].phone_first3.toString(),
      rest: self.state.users[i].phone_rest.toString(),
      pic: self.state.users[i].profil_pic,
      admin: self.state.users[i].admin,
    });
  }
  sendDelete(e,i){
    e.preventDefault();
    if(self.state.users[i].admin !== true)
    {
      Api.deleteUser(self.state.users[i].email).then(function (response) {
        message.success("Delete is success");
        self.getUsers();
      }).catch(error => {
        console.log(error);
      });
    }
    else
    {
      message.error("You cannot delete admin user");
    }
  }
  getUsers(){
    Api.getUsers().then(function (response) {
      self.setState({
        users: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }
  toList(){
    self.setState({
      product: null,
      page: 0
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
        brithday: value,
      });
    }else if(type === "region"){
      self.setState({
        region: value,
      });
    }else if(type === "rest"){
      self.setState({
        rest: value,
      });
    }else if(type === "pic"){
      self.setState({
        pic: value,
      });
    }
    if(type === "admin"){
      self.setState({
        admin: value,
      });
    }
  };
  handleSubmitUpdate(e){
    e.preventDefault();
    console.log(this.state);
    if(
        (this.state.name == "") ||
        (this.state.email == "") ||
        (this.state.brithday == "") ||
        (this.state.region == "") ||
        (this.state.rest == "") ||
        (this.state.pic == "")
    )
    {
      message.error("There is at least one requiered field is empty");
    }
    else{
      console.log(this.state.region.toString());
      console.log(this.state.rest.toString());
      if((this.state.region.length == 3) && (this.state.region > 0))
      {
        if((this.state.rest.length == 7) && (this.state.rest > 0))
        {
          Api.updateUserAdmin(this.state).then(function (response) {
            message.success("Update is success");
            self.setState({
              page: 0,
              user: null,
            });
            self.getUsers();
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
                    User Manipulate Page
                  </p>
                  <br />
                  {
                    this.state.page == 1 && (
                        <Button className="btn-round" color="default" onClick={() => self.toList()} outline>
                          <i className="fa fa-plus-square-o" /> List User
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
                          <th>Is Admin</th>
                          <th>User Name</th>
                          <th>User Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          self.state.users != null && (
                              this.state.users.map(function (v, i) {
                                return (
                                    <tr>
                                      <th scope="row">{i}</th>
                                      <th scope="row"><a href={''} onClick={(e) => self.sendEditPage(e,i)}><i className={'fa fa-pencil-square-o'}/></a></th>
                                      <th scope="row">
                                        <Popconfirm
                                            title="Are you sure delete this user?"
                                            onConfirm={(e) =>self.sendDelete(e,i)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                          <a href={''}><i className={'fa fa-trash-o'}/></a>
                                        </Popconfirm>
                                      </th>
                                      <td>{
                                        v.admin ?
                                            <i className="nc-icon nc-check-2" />
                                            :
                                            <i className="nc-icon nc-simple-remove" />
                                      }</td>
                                      <td>{v.name}</td>
                                      <td>{v.email}</td>
                                    </tr>
                                );
                              })
                          )
                        }
                        </tbody>
                      </Table>
                  ) : self.state.page == 1 && (
                      <>
                        <Form onSubmit={(e) => self.handleSubmitUpdate(e)}>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="userName">User Name</Label>
                                <Input type="text" name="name" id="userName" placeholder="User Name" onChange={e => self.change('name',e.target.value)} defaultValue={this.state.form.name}/>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="userEmail">User e-mail</Label>
                                <Input disabled type="text" name="email" id="userEmail" placeholder="User e-mail" onChange={e => self.change('email',e.target.value)} defaultValue={this.state.form.email}/>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="userGender">User Gender</Label>
                                <Input type="select" name="gender" id="userGender" placeholder="User Gender" onChange={e => self.change('gender',e.target.value)} defaultValue={this.state.form.gender}>
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
                                    defaultValue={this.state.form.dob}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={2}>
                              <FormGroup>
                                <Label for="userPhoneRegion">Phone Region Phone</Label>
                                <Input type="text" name="region" id="userPhoneRegion" placeholder="Phone Region Phone" onChange={e => self.change('region',e.target.value)} defaultValue={this.state.form.phone_first3}/>
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="userPhoneRest">Phone Rest</Label>
                                <Input type="text" name="rest" id="userPhoneRest" placeholder="Phone Rest" onChange={e => self.change('rest',e.target.value)} defaultValue={this.state.form.phone_rest}/>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="profilePic">Profile Pic</Label>
                                <Input type="text" name="pic" id="profilePic" placeholder="Profile Pic" onChange={e => self.change('pic',e.target.value)} defaultValue={this.state.form.profil_pic}/>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={2}>
                              <FormGroup>
                                <Label for="userAdmin">Admin</Label>
                                <Input type="select" name="admin" id="userAdmin" placeholder="Product Price" onChange={e => self.change('admin',e.target.value)} defaultValue={this.state.form.admin}>
                                  <option value={true}>True</option>
                                  <option value={false}>False</option>
                                </Input>
                              </FormGroup>
                            </Col>
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
                            <h5>Birthday: {this.state.brithday}</h5>
                            <h5>Phone Region: {this.state.region}</h5>
                            <h5>Phone Rest: {this.state.rest}</h5>
                            <h5>Admin: {
                              this.state.admin == true ?
                                "Yes"
                                :
                                "No"
                            }</h5>
                          </Media>
                        </Media>
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

export default UserPage;

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
let self = null;
class SectionBucket extends Component{
    constructor(props) {
        super(props);
        self = this;
        self.state = {
            bucket: 0,

        };
    }
    componentDidMount() {
        self.getBucketCount();
        self.render();
    }
    getBucketCount(){
        Api.getBucketCount().then(function (response) {
            self.setState({
                bucket: response.data
            });
        }).catch(error => {
            console.log(error);
        });
    }
    render(){
        return (
            <>
                <NavItem>
                    <NavLink
                        href="bucket"
                    >
                        <i className="nc-icon nc-cart-simple" /> Bucket ({this.state.bucket})
                    </NavLink>
                </NavItem>
            </>
        );
    };
}

export default SectionBucket;

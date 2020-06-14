import axios from "axios/index";
import UserInfo from "./userInfo";
import * as moment from "moment";

const Api = {

    apiUrl: function () {
    const url = window.location.host;
    const apiUrl = 'http://localhost:8080/';
    return apiUrl;
    },

    header: function (){
        let headers = {
            'Content-Type': 'application/json'
        };
        return headers;
    },
    login: function (email,password) {
    return new Promise((resolve, reject) => {
        let data= {
          email: email,
          password: password
        };
        let headers = {
          'Content-Type': 'application/json'
        };
        axios.post(Api.apiUrl() + 'users/login', data, {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
    });
    },
    addProducts: function (data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.apiUrl() + 'products/addProduct', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    updateProducts: function (data) {
        return new Promise((resolve, reject) => {
            axios.put(Api.apiUrl() + 'products/updateProduct', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getProduct: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'products', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getCategories: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'categories', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getUsers: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'users', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getUser: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'users/get/'+ UserInfo.getEmail(), {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getAddreses: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'addresses/email='+ UserInfo.getEmail(), {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteProduct: function (data) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.apiUrl() + 'products/deleteProduct', {headers: this.header(),data}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteUser: function (email) {
        return new Promise((resolve, reject) => {
            let data = {
                "email":email
            };
            axios.delete(Api.apiUrl() + 'users/deleteAccount', {headers: this.header(),data}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    updateUser: function (data) {
        return new Promise((resolve, reject) => {
            let sendingData = {};
            if((data.password != null) && (data.password != ""))
            {
                sendingData =
                    {
                        "email": data.email,
                        "name": data.name,
                        "gender": data.gender,
                        "dob": data.dob,
                        "phone_first3": data.phone_first3,
                        "phone_rest": data.phone_rest,
                        "profil_pic": data.pic,
                        "admin": data.admin,
                        "password": data.password,
                    };
            }else{
                sendingData =
                    {
                        "email": data.email,
                        "name": data.name,
                        "gender": data.gender,
                        "dob": data.dob,
                        "phone_first3": data.phone_first3,
                        "phone_rest": data.phone_rest,
                        "profil_pic": data.pic,
                        "admin": data.admin,
                    };
            }
            console.log(sendingData);
            axios.put(Api.apiUrl() + 'users/updateAccount', sendingData, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    updateUserAdmin: function (data) {
        return new Promise((resolve, reject) => {
            let sendingData =
                {
                    "email": data.email,
                    "name": data.name,
                    "gender": data.gender,
                    "dob": data.brithday,
                    "phone_first3": data.region,
                    "phone_rest": data.rest,
                    "profil_pic": data.pic,
                    "admin": data.admin,
                };
            console.log(sendingData);
            axios.put(Api.apiUrl() + 'users/updateAccount', sendingData, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    updateAddress: function (data) {
        return new Promise((resolve, reject) => {
            console.log(data);
            axios.put(Api.apiUrl() + 'addresses', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    addAddress: function (addres) {
        return new Promise((resolve, reject) => {
            let data = {
                "address": addres,
                "user_email": UserInfo.getEmail()
            };
            axios.post(Api.apiUrl() + 'addresses', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    payment: function (data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.apiUrl() + 'pymnt/pay/c', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    rate: function (data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.apiUrl() + 'rate/add', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    updateOrder: function (data) {
        return new Promise((resolve, reject) => {
            console.log(data);
            axios.put(Api.apiUrl() + 'pymnt/statUP', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    addCategory: function (name) {
        return new Promise((resolve, reject) => {
            let data = {
                "name":name
            }
            axios.post(Api.apiUrl() + 'categories/add', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getCategory: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'categories', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getUserOrders: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'bucket/paid/email='+ UserInfo.getEmail(), {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteCategory: function (id) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.apiUrl() + 'categories/id='+id, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getLogs: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'log/list', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    setPasswordToDefault: function (data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.apiUrl() + 'users/forgetPassword', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    sendLog: function (email) {
        return new Promise((resolve, reject) => {
            let data = {
                "logIdentifier": {
                    "user_email": email,
                    "date": moment.now(),
                }
            }
            axios.post(Api.apiUrl() + 'log/add', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getFeedback: function (data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.apiUrl() + 'rate/list', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getBySearch: function (data) {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'products/search='+data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteFeedback: function (data) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.apiUrl() + 'rate/delete', {headers: this.header(),data}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteAddress: function (data) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.apiUrl() + 'addresses', {headers: this.header(),data}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getStatistic: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'log/statistics', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getOrders: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'bucket/paid', {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    postRegister: function (email,password) {
        return new Promise((resolve, reject) => {
            let data = {
                "email": email,
                "password": password
            }
            axios.post(Api.apiUrl() + 'users/register', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getBucketCount: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'bucket/current/total/email='+ UserInfo.getEmail() , {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getProductsByCategory: function (id) {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'products/category_id='+ id , {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    addBucket: function (data) {
        return new Promise((resolve, reject) => {
            axios.post(Api.apiUrl() + 'bucket/addTbucket', data, {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getBucket: function () {
        return new Promise((resolve, reject) => {
            axios.get(Api.apiUrl() + 'bucket/current/email='+ UserInfo.getEmail() , {headers: this.header()}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteBucket: function (data) {
        return new Promise((resolve, reject) => {
            axios.delete(Api.apiUrl() + 'bucket/delete', {headers: this.header(),data}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
};

export default Api;

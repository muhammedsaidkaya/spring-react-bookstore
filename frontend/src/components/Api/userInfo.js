//import Api from "api";
import React from "react";
import moment from "moment";
import { message } from 'antd';
import Api from "./api";

const UserInfo = {
    json2array: function (json) {
        let result = [];
        let keys = Object.keys(json);
        let values = Object.values(json);
        keys.forEach(function (key,i) {
            result[key] = values[i];
        });

        return result;
    },
    generalAlert: function (data, type, title, clickPageChange = null, closeTime = 30000) {
        let modal = false;
        let messageStr = '';
        console.log(data);
        data = data.response ? data.response.data : data;
        data = data.data ? data.data : data;
        if (data.Errors) {
            if (data.Errors.length > 0) {
                data.Errors.map(function (i, v) {
                    messageStr += v + " ";
                    //!INFO Loginden gelen hata mesajları hatalı bilgilendirilecek API tarafı
                });
            } else {
                messageStr += data.Errors;
            }
        } else if (data.Message) {
            messageStr += data.Message;
        } else if (data != null) {
            messageStr += data;
        } else {
            messageStr = 'Bir hata oluştu lütfen daha sonra tekrar dene.';
        }

        type = type ? type : 'error';
        if (type == 'success') {
            message.success(messageStr);
        } else if (type == 'error') {
            if(data.status == 422){
                message.error("There is a product with that identical fields.");
            }else{
                message.error("There is an unexpected error occur");
            }
        } else if (type == 'info') {
            message.info(messageStr);
        } else if (type == 'warning') {
            message.warning(messageStr);
        }
    },
    getObjectKeyExists: function (data, value) {
        let found = Object.keys(data).filter(function (key) {
            return data[key] === value;
        });
        return !found.length;
    },
    pageChange: function (thisSelf, changePage) {
        const {history} = thisSelf.props;
        if (changePage && history) {
            history.push(changePage);
        } else {
            window.location.href = changePage;
        }
    },
    info: function (attr) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            if (userInfo.email) {
                if (attr) {
                    const json2array = this.json2array(userInfo);
                    if (json2array[attr]) {
                        return json2array[attr];
                    }
                    return '';
                }
                return userInfo;
            } else if (userInfo) {
                return true;
            }
        }
        return false;
    },
    set: function (name, value) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            if (name && this.getObjectKeyExists(userInfo, value)) {
                userInfo[name] = value;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                return userInfo[name];
            }
        }
        return false;
    },
    logout: function (self) {
        localStorage.removeItem('userInfo');
        window.location.href = 'Login';
    },
    isCheckLogin: function () {
        if (UserInfo.info()) {
            return true
        }
        return false
    },
    isAdmin: function () {
        return UserInfo.info('admin');
    },
    getToken: function () {
        return localStorage.getItem('jwt');
    },
    getEmail: function () {
        return UserInfo.info('email');
    },
    getBucketCount: function () {
        let count = 2;
        Api.getBucketCount().then(function (response) {
            count = response.data;
        }).catch(error => {
            console.log(error);
        });
        return count;
    },
    getUserInfo: function () {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            return userInfo;
        }
    },
    setUserInfo: function (data) {
        console.log(data.gender + "asdsa");
        this.set("name",data.name);
        this.set("email",data.email);
        this.set("dob",data.dob);
        this.set("phone_first3",data.phone_first3);
        this.set("phone_rest",data.phone_rest);
        this.set("pic",data.pic);
    }
};
export default UserInfo;

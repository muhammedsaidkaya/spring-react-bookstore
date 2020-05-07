import axios from "axios/index";

const Api = {

  apiUrl: function () {
    const url = window.location.host;
    const apiUrl = 'https://bookstore-spring-boot-rest-api.herokuapp.com/';
    return apiUrl;
  },
  /*cities() {
    return new Promise((resolve, reject) => {
      Api.getHeaderToken().then(function (headers) {
        axios.get(Api.apiUrl() + 'api/generalcontroller/getallcity', {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
      }).catch(e => reject(e));
    });
  },
  updateAccount: function (type, id, forms, fileList, maps,supplyInput) {
    return new Promise((resolve, reject) => {
      Api.getHeaderToken().then(function (headers) {
        let data= {};
        if (type == true) {
          data = {
            "Id": id,
            "ServiceScope": forms.ServiceScope,
            "RepairedBrands": forms.RepairedBrands,
            "ProductGroup": forms.ProductGroup,
            "SoldBrands": forms.SoldBrands,
            "XAxis": maps.center.lat,
            "YAxis": maps.center.lng,
            "MerchApproval": forms.MerchApproval,
            "Expert": forms.Expert,
            'Images':fileList
          };
        }
        if (type == false) {
          data = {
            "Id": id,
            "ProductGroup": forms.ProductGroup,
            "SoldBrands": forms.SoldBrands,
            "XAxis": maps.center.lat,
            "YAxis": maps.center.lng,
            "MerchApproval": forms.MerchApproval,
            "Expert": forms.Expert,
            'Images':fileList,
            'WhoseSalers':supplyInput
          };
        }
        axios.put(Api.apiUrl() + 'api/account', data, {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
      }).catch(e => reject(e));
    });
  },*/
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
            let headers = {
                'Content-Type': 'application/json'
            };
            axios.post(Api.apiUrl() + 'products/addProduct', data, {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    updateProducts: function (data) {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json'
            };
            axios.put(Api.apiUrl() + 'products/updateProduct', data, {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getProduct: function (email,password) {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json'
            };
            axios.get(Api.apiUrl() + 'products', {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    getCategories: function (email,password) {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json'
            };
            axios.get(Api.apiUrl() + 'categories', {headers: headers}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
    deleteProduct: function (data) {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE"
            };
            axios.delete(Api.apiUrl() + 'products/deleteProduct', {headers: headers,data}).then(r => resolve(r)).catch(e => reject(e));
        });
    },
};

export default Api;

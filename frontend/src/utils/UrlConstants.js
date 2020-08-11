var Globals = require('./Globals');

var baseUrl = Globals.ENVIRONMENT[Globals.ENVIRONMENT.ENV].BACKEND_BASE_URL;

module.exports = {

    /* ENVIRONMENT */
    URLS: {

        registerCustomer: baseUrl + 'Customer/webSignUp/',
        loginCustomer: baseUrl + 'Customer/webLogin/',

        /* Dashboard */
        getProducts: baseUrl + 'Product/getProducts/',
        searchProducts: baseUrl + 'Product/searchProducts/',
        getProduct: baseUrl + 'Product/getProduct?',
        addProduct: baseUrl + 'Product/addProduct/',
        editProduct: baseUrl + 'Product/editProduct/',
        removeProduct: baseUrl + 'Product/removeProduct/',
        /* End of Dashboard */
    },
};

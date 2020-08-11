import Cookies from 'universal-cookie';
import axios from "axios";

const cookies = new Cookies();

var Globals = require('./Globals');

export default class Util {

    static setAuthToken(token) {
        if(token) {
            return axios.defaults.headers.common["Authorization"] = token;
        } else {
            return delete axios.defaults.headers.common["Authorization"];
        }
    };

    static validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    static isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    };

}
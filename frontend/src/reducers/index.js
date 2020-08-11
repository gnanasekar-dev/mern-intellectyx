import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import productReducer from "./productReducer.js";
import loadingReducer from "./loadingReducer.js";
import formResetReducer from "./formResetReducer.js";

export default combineReducers({
	auth: authReducer,
	products: productReducer,
	loading: loadingReducer,
	resetform: formResetReducer,
});

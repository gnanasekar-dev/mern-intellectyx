import { SET_CURRENT_USER } from "../actions/types.js";
import Util from '../utils/Util';
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("jwtToken") || null;
const decoded = token ? jwt_decode(token) : {};

const initialState = {
	isAuthenticated: token ? true : false,
	user: decoded,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !Util.isEmpty(action.payload),
				user: action.payload
			};

		default:
			return state;
	}
}

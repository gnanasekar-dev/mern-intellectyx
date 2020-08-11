import {
	RESET_PRODUCT,
	GET_PRODUCTS,
	GET_PRODUCT,
	DELETE_PRODUCT,
} from "../actions/types.js";

const initialState = {
	products: [],
	product: {},
};

export default function (state = initialState, action) {

	switch(action.type) {

		case RESET_PRODUCT:
			return {
				...initialState,
			};

		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};

		case GET_PRODUCT:
			return {
				...state,
				product: action.payload,
			};

		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(product => product.id !== action.payload)
			};

		default:
			return state;
	}
}

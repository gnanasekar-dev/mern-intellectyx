import {
	RESET_FORM,
} from "../actions/types.js";

const initialState = {
	resetform: false,
};

export default function (state = initialState, action) {

	switch(action.type) {
		case RESET_FORM:
			return {
				...state,
        		resetform: action.payload
			};

		default:
			return state;
	}
}

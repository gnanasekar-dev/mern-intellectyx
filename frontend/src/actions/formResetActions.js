import {
	RESET_FORM,
} from "./types";

// Reset form
export const resetForm = (bool) => dispatch => {

	dispatch({
		type: RESET_FORM,
		payload: bool
	});

};
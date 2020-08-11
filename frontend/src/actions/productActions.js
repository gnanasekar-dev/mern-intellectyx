import axios from "axios";
import { toast } from "react-toastify";
import {
	LOADING,
	RESET_PRODUCT,
	GET_PRODUCTS,
	GET_PRODUCT,
	DELETE_PRODUCT,
} from "./types";

import { resetForm } from "./formResetActions";
var UrlConstants = require('../utils/UrlConstants');

// Reset to initial Values
export const resetProductData = () => dispatch => {
	dispatch({
		type: RESET_PRODUCT,
	})
}

// Get products
export const getProducts = () => dispatch => {

	dispatch(setLoading(true));

	axios
		.get(UrlConstants.URLS.getProducts)
		.then(res => {
			return dispatch({
				type: GET_PRODUCTS,
				payload: res.data
			})
		})
		.catch(err => {
			if(err.response && err.response.data) {
				toast.error(err.response.data)
			} else {
				console.log('err..', err)
			}
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

// Add a product
export const addProduct = (productData, history) => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.addProduct, productData)
		.then(res => {
			toast.success('Product Added');
			dispatch(resetForm(true));
		})
		.catch(err => {
			toast.error(err.response.data);
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

// Get a product
export const getProduct = (id) => dispatch => {

	dispatch(setLoading(true));
	var params = 'productId=' + id;

	axios
		.get(UrlConstants.URLS.getProduct + params)
		.then(res => {
			// console.log('res...', res);
			return dispatch({
				type: GET_PRODUCT,
				payload: res.data
			})
		})
		.catch(err => {
			toast.error(err.response.data);
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

// Edit a product
export const editProduct = (productData, history) => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.editProduct, productData)
		.then(res => {
			toast.success('Changes has been updated');
		})
		.catch(err => {
			toast.error(err.response.data);
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

// Remove a product
export const removeProduct = (id) => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.removeProduct, id)
		.then(res => {
			toast.success('Product Deleted Successfully');
			return dispatch({
				type: DELETE_PRODUCT,
				payload: res.data
			})
		})
		.catch(err => {
			toast.error(err.response.data);
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

export const setLoading = (loadingStatus) => {
	return {
		type: LOADING,
		payload: loadingStatus
	};
};
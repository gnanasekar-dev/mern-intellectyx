import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductForm from './ProductForm';
import { addProduct } from "../../actions/productActions.js";

class AddProduct extends Component {

	// Handler for adding product
	handleAddProduct(productData) {
		this.props.addProduct(productData);
	}

	render() {

		return (
			<div className="page-content container">
				<ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
				<div className="row page-title">
					<div className="col-md-12">
						<h4><i class="fa fa-angle-left" aria-hidden="true"></i> Add Product</h4>
					</div>
				</div>
				<div class="section-container">
					<div className="row">
						<div className="col-md-6">
							<div className="form-container">
								<ProductForm onSubmit={this.handleAddProduct.bind(this)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddProduct.propTypes = {
	addProduct: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { addProduct })(
	AddProduct
);

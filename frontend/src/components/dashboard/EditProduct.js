import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductForm from './ProductForm';
import { resetProductData, getProduct, editProduct } from "../../actions/productActions.js";
import Util from '../../utils/Util';

class EditProduct extends Component {

	componentDidMount() {
		this.props.getProduct(this.props.match.params.productId)
	}

	componentWillUnmount() {
		this.props.resetProductData();
	}

	// Handler for editing product
	handleEditProduct(productData) {
		productData.productId = this.props.match.params.productId;
		this.props.editProduct(productData);
	}

	render() {

		const { product } = this.props.products;

		var initialValues = {};

		if(!Util.isEmpty(product)) {

			initialValues = {
				name: product.name,
				price: product.price,
			}
		}

		return (
			<div className="page-content container">
				<ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
				<div className="row page-title">
					<div className="col-md-12">
						<h4><i class="fa fa-angle-left" aria-hidden="true"></i> Edit Product</h4>
					</div>
				</div>
				<div class="section-container">
					<div className="row">
						<div className="col-md-6">
							<div className="form-container">
								{!Util.isEmpty(product) ?
									<ProductForm 
										onSubmit={this.handleEditProduct.bind(this)}
										initialValues={initialValues}
									/>
								: null }
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	}
}

EditProduct.propTypes = {
	getProduct: PropTypes.func.isRequired,
	resetProductData: PropTypes.func.isRequired,
	products: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	products: state.products,
});

export default connect(mapStateToProps, { resetProductData, getProduct, editProduct })(
	EditProduct
);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Util from '../../utils/Util';

import { resetForm } from "../../actions/formResetActions";

class ProductForm extends Component {

	constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                price: "",
            },
        };
    }
    
    resetForm() {
        this.setState({
            form: {
                name: "",
                price: "",
            },
        }, () => {
            this.props.resetForm(false);
        });
    }
	
	componentDidMount() {
		
		// Render initial values if present
		if(!Util.isEmpty(this.props.initialValues)) {

			var formObj = {};
			formObj = {
				...this.props.initialValues,
			};

			this.setState({
				form: formObj,
			});
		}
    }

    componentDidUpdate(prevProps) {

        const { resetform } = this.props;

        // Typical usage (don't forget to compare props):
        if (resetform.resetform && resetform.resetform !== prevProps.resetform.resetform) {
            this.resetForm();
        }
    }

    // Handler for input field change event
    handleInputFeild(event) {
        
        const { name, value } = event.target;
        const { form } = this.state;

        var formObj = {};
        formObj = {
            ...form,
            [name]: value,
        };

        this.setState({
            form: formObj,
        });
        
    }

	// Handler for product submit
	handleProductSubmit(e) {
        e.preventDefault();

        var error = null;

        if (this.state.form.name == "" || this.state.form.price == "") {

            error = "Please enter all the details";
            this.setState({
                error: error
            });
            return false;
        }

        const { form } = this.state;
        this.props.onSubmit(form);
    }
    
	render() {

		const { form } = this.state;

		return(
			<form onSubmit={this.handleProductSubmit.bind(this)}>
                <div class="form-group">
					<label>Name <span className="text-danger">*</span></label>
					<div>
						<input type="text" class="form-control" name="name" value={form.name} onChange={this.handleInputFeild.bind(this)} placeholder="Enter Product Name" />
					</div>
				</div>
				<div class="form-group">
					<label>Price <span className="text-danger">*</span></label>
					<div>
                        <input type="text" class="form-control" name="price" value={form.price} onChange={this.handleInputFeild.bind(this)} placeholder="Enter Product Price" />
					</div>
				</div>

                <div id="errorMsg">
                    <p>{this.state.error}</p>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
		);
	}
}

ProductForm.propTypes = {
    resetform: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    resetform: state.resetform,
});

export default connect(mapStateToProps, { resetForm })(
	ProductForm
);

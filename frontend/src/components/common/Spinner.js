import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Spinner extends Component {

    constructor(props) {
        super(props);
    }

	render() {

        const { loading } = this.props.loading;
        
        return(
            <div>
                {loading ? 
                    <div className="spinner-container">
                        <div className="spinner-gooey">
                            <span className="dot"></span>
                            <div className="dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                : null}
            </div>
        );
	}
}

Spinner.propTypes = {
	loading: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	loading: state.loading,
});

export default connect(mapStateToProps, { })(
	Spinner
);

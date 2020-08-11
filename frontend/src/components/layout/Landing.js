import React, { Component } from 'react';

class Landing extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showActivityIndicator: true,
		};
	}

	componentDidMount() {
		this.setState({ showActivityIndicator: false });
	}

	render() {
		if(this.state.showActivityIndicator) {
			return (
				<div className='loaderComponent'>
					<div className="loaderContainer">
						<img src="/images/loading_indicator.gif" className="img-fluid" alt="Loader" />
					</div>
				</div>
			)
		} else {
			return (
				<div className="body-section">
					<p>Landing Page Contents here</p>
				</div>
			);
		}
	}
}

export default Landing;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
	render() {
		return (
			<div className="page-content container">
				<h2 ref="title">404. Not found.</h2>
				<p>Sorry, this page does not exist</p>
				<Link to="/">Go to index</Link>
			</div>
		);
	}
}

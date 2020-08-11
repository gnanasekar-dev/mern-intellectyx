import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import { getProducts, removeProduct } from "../../actions/productActions";
var _ = require('lodash');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteModal: false,
            itemToRemove: null,
        };
    }

    componentDidMount() {
        this.props.getProducts();
    }

    toggleDeleteModal(rowId) {

        if(this.state.deleteModal) {
            this.setState({
                deleteModal: false,
                itemToRemove: null,
            });
        } else {
            this.setState({
                deleteModal: true,
                itemToRemove: rowId,
            });
        }
    }

    // Handler for removing product
    handleProductDelete() {

        if(this.state.itemToRemove) {
            this.props.removeProduct({id: this.state.itemToRemove});
            this.setState({
                deleteModal: false,
                itemToRemove: null,
            });
        }
    }

    // Renders product table
    renderTable() {

        const { products } = this.props.products;

        return (
            <div>
                <ReactTable
                    data={products}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name",
                        },
                        {
                            Header: "Price",
                            accessor: "price",
                        },
                        {
                            Header: '',
                            Cell: row => (
                                <div>
                                    <Link to={`/product/edit/${row.original.id}`} title="Edit" className="table-action-button">Edit</Link>
                                    <button className="table-action-button" title="Delete" onClick={this.toggleDeleteModal.bind(this, row.original.id)}>Delete</button>
                                </div>
                            ),
                            maxWidth: 100,
                        }
                    ]}
                    defaultPageSize={10}
                    minRows={0}
                    className="-highlight"
                    noDataText= "No Products Found"
                />
            </div>
        );
    };

    render() {

        return(
            <div>
                <ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
                <Link to="/product/add" className="btn btn-light custom-link-style " title="Add Product">Add Product</Link>
                <div className="section-container">
                    { this.renderTable() }
                </div>
                <div>
                    <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal.bind(this)}>
                        <ModalHeader toggle={this.toggleDeleteModal.bind(this)}>Delete Product</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete this Record?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" title="Delete" onClick={this.handleProductDelete.bind(this)}>Delete</Button>{' '}
                            <Button color="secondary" title="Cancel" onClick={this.toggleDeleteModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getProducts: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    products: state.products,
});

export default connect(mapStateToProps, { getProducts, removeProduct })(
    Dashboard
);

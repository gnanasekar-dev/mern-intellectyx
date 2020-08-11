import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 text-sm-left text-center">
                            <p>© 2020 Project Name</p>
                        </div>
                        <div className="col-sm-8 text-sm-right text-center">
                            <p>
                                <span style={{marginRight:"15px"}}><a target='_blank' href='#'>Terms of Use</a></span>
                                <span><a target='_blank' href='#'>Privacy Policy</a></span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}


export default Footer;
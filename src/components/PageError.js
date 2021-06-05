import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageError extends Component {
    render() {
        return (
            <div className="page-error">
               <h1>404 Page Error</h1>
               <p>The question you are trying to reach is not available</p>
               <Link to='/'>Sign In</Link>
            </div>
        );
    }
}

export default PageError;
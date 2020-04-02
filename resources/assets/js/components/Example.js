import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link } from 'react-router-dom';
export default class Example extends Component {
    render() {
      console.log('example');
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Example Component</div>

                            <div className="panel-body">
                                I'm an example component!
                            </div>
                            <Link to="/users">TO USER</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}

/*
 * MIT License
 *
 * Copyright (c) 2022 Code4 v2 Technologies.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, {Component} from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Prompt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            redirectTo: '/',
            redirectPageName: 'main'
        };
    }

    componentDidMount() {
        this.setState({
            message: (this.props.message) ? this.props.message : 'Action is not completed successfully!',
            redirectTo: (this.props.redirectTo) ? this.props.redirectTo : this.state.redirectTo,
            redirectPageName: (this.props.redirectPageName) ? this.props.redirectPageName : this.state.redirectPageName,
        });
    }

    render() {
        return (
            <div>
                <ReactBootStrap.Container>
                    <h4>{this.state.message}</h4>
                    <Link to={this.state.redirectTo}>click here to redirect to
                        the {this.state.redirectPageName} page</Link>
                </ReactBootStrap.Container>
            </div>
        );
    }
}

Prompt.defaultProps = {
    message: 'Action is not completed successfully!',
    redirectTo: '/',
    redirectPageName: 'Main'
};

export default Prompt;

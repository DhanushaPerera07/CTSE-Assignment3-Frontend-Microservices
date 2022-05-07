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

import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import Register from '../register/Register';
import {UserContext} from '../../context/user.context';

class Login extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            password: '',
            errorMessage: {
                userIDField: '',
                passwordField: ''
            }
        };
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    /* redirect to the root page. */
    redirectToRoot() {
        const {history} = this.props;
        if (history) {
            history.push('/');
        }
    }

    async performLogin() {
        const {userID, password} = this.state;
        let formValidity = true;
        if (!(/[A-Za-z0-9]{24}/.test(userID))) {
            formValidity = false;
            this.setState({
                errorMessage: {
                    userIDField: `This field is required, should 24 digit, only letters and numbers or combination of both is allowed`
                }
            });
        }

        if (password.length <= 4) {
            formValidity = false;
            this.setState({
                errorMessage: {
                    userIDField: `This field is required, should not be empty. At least 5 digits or more allowed.`
                }
            });

            return;
        }

        if (formValidity) {
            this.setState({
                errorMessage: ''
            });


            // send credentials
            try {
                if (await this.context.authenticateUser({userID, password})) {
                    console.log('login successful!');
                    this.redirectToRoot();
                }
            } catch (error) {
                console.log('login failed!');
                console.error(error);
            }

        }
    }

    render() {
        return (
            <div>
                <div className="container-sm">
                    <br/>
                    <h1>Login</h1>
                    <br/><br/>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control name="userID" value={this.state.userID} type="text"
                                          onChange={(event) => this.onChange(event)}
                                          placeholder="User ID"/>
                            {(this.state.errorMessage.userIDField) ?
                                <p className="text-danger">{this.state.errorMessage.userIDField}</p> : ''}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} type="password"
                                          onChange={(event) => this.onChange(event)}
                                          placeholder="Password"/>
                            {(this.state.errorMessage.passwordField) ?
                                <p className="text-danger">{this.state.errorMessage.passwordField}</p> : ''}
                        </Form.Group>
                        <br/>
                        <Button variant="primary" onClick={this.performLogin.bind(this)}>Login</Button>
                        {/*<Link to="/" style={{textDecoration: 'none', color: 'white'}}>Login</Link>*/}
                    </Form>
                    <br/>
                    <Link to="/register"
                          style={{textDecoration: 'none', color: 'black'}}>Don't have an account? Register</Link>
                </div>

                {/* router */}
                <Router>
                    <Switch>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withRouter(Login);

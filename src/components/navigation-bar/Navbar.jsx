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
import {Button, Nav, Navbar} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import {Cart2} from 'react-bootstrap-icons';
import './Nabar.css';
import {UserContext} from '../../context/user.context';

/* components. */
import Login from '../login/Login';
import Register from '../register/Register';
import Cart from '../cart/Cart';
import Delivery from '../payment/PaymentHolder';
import Credit from '../payment/Credit';
import Mobile from '../payment/Mobile';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
    };

    /* log out the user. */
    performLogOut(logOutUser) {
        logOutUser();
        window.location = '/'; // redirect to home page.
    }

    render() {
        const {currentUser, logOutUser} = this.context;

        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to="/" className="nav-link">
                        <Navbar.Brand>E-Commerce App</Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>

                        {     // if user logged in
                            (currentUser) ?
                                <Nav>
                                    <h5 className="user_name">Hi {currentUser?.name}</h5>
                                    <Link style={{margin: 'auto'}} to="/cart" className="nav-link">
                                        <Cart2 className="navbar_icon"/>
                                    </Link>

                                    <Button className="nav-link" variant="danger"
                                            onClick={() => this.performLogOut(logOutUser)}>Logout</Button>
                                </Nav>

                                //if user is not logged in
                                : <Nav>
                                    <Link to="/login" className="nav-link navigation_property">Login</Link>
                                    <Link to="/register" className="nav-link navigation_property">Register</Link>
                                </Nav>
                        }

                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/cart">
                        <Cart/>
                    </Route>
                    <Route path="/delivery">
                        <Delivery/>
                    </Route>
                    <Route path="/mobile">
                        <Mobile/>
                    </Route>
                    <Route path="/credit">
                        <Credit/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

NavigationBar.contextType = UserContext;

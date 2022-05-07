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
import {Container, Form} from 'react-bootstrap';
import Credit from './Credit'
import Mobile from './Mobile'


export default class PaymentHolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentType: '',
            address: null,
            email: null
        };
    };

    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }


    render() {
        return (
            <div className="container-sm">
                <br/>
                <h1>Finish your order here!</h1>
                <br/><br/>
                <Form>


                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address"
                                      type="text"
                                      placeholder="Address"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email"
                                      type="text"
                                      placeholder="email"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    {(this.state.email != null && this.state.address != null) ?
                        <Form.Group controlId="formPaymentType">
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Control name="paymentType" as="select" onChange={event => this.onChange(event)}
                                          value={this.state.value}>
                                <option value="mobile">Mobile</option>
                                <option value="credit">Credit</option>

                            </Form.Control>
                        </Form.Group>
                        :
                        ''
                    }


                </Form>

                <Container>
                    {(this.state.paymentType == 'credit') ?
                        <Credit getData={{address: this.state.address, email: this.state.email}}/>
                        :
                        <Mobile/>
                    }

                </Container>


                <br/>
            </div>
        );
    }
}


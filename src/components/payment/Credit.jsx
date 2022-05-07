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
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {cartList} from '../product/ProductListItem';
import EmailService from "../../service/email.service";
import sha256 from 'crypto-js/sha256';

export default class Credit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            cardHolderName: null,
            cardNumber: null,
            cvcNumber: null,
            expireyDate: null,
            getData: this.props.getData
        };
    }

    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    confirmPayment = () => {
        const {address, email} = this.state.getData;
        console.log(address, email);

        console.log(this.state.amount);
        console.log(this.state.cardHolderName);
        console.log(this.state.cardNumber);
        console.log(this.state.cvcNumber);
        console.log(this.state.expireyDate);
        console.log(email);
        console.log(address);

        cartList.splice(0, cartList.length);

        EmailService.sendEmail({
            user_id: 'user_Swzja6hgJOB3MOMfn8x53',
            service_id: 'service_727resg',
            template_id: 'template_3cvmc3f',
            template_params: {
                from_name: 'CODE4.Technology E-commerce-System',
                to_name: atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_NAME))),
                reply_to: email,
                address: address,
                message: 'Congradulations...! Your Order is confirmed. Details as below...',
                itemName: 'Item Name',
                quantity: 'Quantity',
                unitPrice: 'Unit Price',
                total: 'Total'
            },
            accessToken: '6ceb240ee4e4e409d19845b2e08cd7fa'
        }).then(response => {
            window.location = '/';
            console.log(response);
        }).catch(reason => {
            console.error(reason);
        });
    };

    render() {
        const notify = () =>

            toast.success('Item purchased succesfully. Please check your mail inbox', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


        return (
            <div className="container-sm">
                <br/>
                <h1>Payment Details</h1>

                <br/>
                <br/>

                <Form>

                    <Form.Group controlId="formBasicCardHOlderName">
                        <Form.Label>Card holder's name</Form.Label>
                        <Form.Control name="cardHolderName"
                                      type="text"
                                      placeholder="Card holder's name"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCardNumber">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control name="cardNumber"
                                      type="text"
                                      placeholder="Card Number"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    <Form.Group controlId="formBasicCVC">
                        <Form.Label>CVC Number</Form.Label>
                        <Form.Control name="cvcNumber"
                                      type="text"
                                      placeholder="CVC Number"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    <Form.Group controlId="formBasicED">
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control name="expireyDate"
                                      type="text"
                                      placeholder="Expire Number"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>


                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name="amount"
                                      type="text"
                                      placeholder="Amount"
                                      onChange={(event) => this.onChange(event)}
                        />
                    </Form.Group>

                    <hr></hr>
                    <br/>
                    <Button onClick={() => {
                        this.confirmPayment();
                        notify();
                    }}
                            variant="primary"> Confirm
                        {/* // TODO: if registration successful, then redirect to root URL (/product). */}
                        {/* <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Confirm</Link> */}
                    </Button>
                </Form>
                <br/>
            </div>
        );
    }
}


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
import {Button, Card, Col, Row} from 'react-bootstrap';
/*icons*/
import {Trash} from 'react-bootstrap-icons';
import {Link, useHistory} from 'react-router-dom';
import {cartList} from '../product/ProductListItem';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* TODO: this will be removed. */

const fontStyle = {
    fontSize: 'medium',
};

export default function CartListItem(props) {
    const {product, selectProduct} = props;
    let history = useHistory();

    /* remove  the product from the cart. */
    const onRemove = () => {
        cartList.pop();
    };

    const notify = () =>
        toast.error('Item removed from the cart', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    return (
        <div style={{marginRight: '5%'}}>
            <br/>
            <Row>
                <Col>
                    <Card style={{width: '20rem'}}>
                        <Card.Body>
                            <Card.Title>Name: {product.name}</Card.Title>
                            <Card.Text style={fontStyle}>
                                Description: {product.description}
                            </Card.Text>
                            <Card.Text>Unit Price: {product.price}</Card.Text>
                            <Card.Text>Hand On Quantity: {product.quantity}</Card.Text>

                            <Row>
                                {
                                    // product delete button

                                    (true) ? (
                                        <Link to="/" style={{color: 'white', margin: 'auto'}}>
                                            <Button
                                                style={{margin: 'auto', padding: '0.4rem 1rem'}}
                                                variant="danger"
                                                onClick={() => {
                                                    onRemove();
                                                    notify();
                                                }}
                                                title="Delete Product"
                                            >
                                                <Trash style={{fontSize: '1.6rem'}}/>
                                            </Button>
                                        </Link>
                                    ) : (
                                        ''
                                    )
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

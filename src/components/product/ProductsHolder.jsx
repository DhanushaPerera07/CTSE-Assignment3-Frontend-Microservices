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
import Products from './Products';
import {Redirect, Route, Switch} from 'react-router-dom';
import AddEditProduct from './AddEditProduct';
import {ProductContext} from '../../context/product.context';
import sha256 from 'crypto-js/sha256';

export default class ProductsHolder extends React.Component {

    static contextType = ProductContext;

    constructor(props) {
        super(props);
    }

    /** method to add a new product. */
    addProduct(product) {
        return this.context.addProduct(product);
    }

    /** method to update the product. */
    updateProduct(product) {
        return this.context.updateProduct(product);
    }

    render() {
        // console.log('product holder works', this.context);
        const isAdmin = (atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))) === 'ADMIN');
        return (
            <div>
                <Switch>
                    <Route exact path="/products">
                        {/* products component. */}
                        <Products products={(this.context?.products) ? this.context?.products : []}/>
                    </Route>
                    {/* Protected routes - if User Type == 'ADMIN' then only client can navigate to these routes. */}
                    <Route exact path="/products/add"
                           render={(props) => ((isAdmin) ?
                               <AddEditProduct {...props} saveOrUpdate={this.addProduct.bind(this)}/> :
                               <Redirect to="/"/>)}/>
                    <Route exact path="/products/:productID/edit"
                           render={(props) => ((isAdmin) ?
                               <AddEditProduct {...props} saveOrUpdate={this.updateProduct.bind(this)}/> :
                               <Redirect to="/"/>)}/>
                </Switch>
            </div>
        );
    }
}

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

const CartContext = React.createContext({
    cartProducts: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    totalAmount: () => {
    },
    cleanCart: () => {
    }
});

class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartProducts: [],
            addToCart: null,
            removeFromCart: null,
            totalAmount: 0,
            cleanCart: null
        };
    }

    _addToCart(product) {
        this.setState(prevState => {
            [...prevState.cartProducts].unshift(product);
        });

        this._totalAmount();
    }

    _removeFromCart(productId) {
        this.setState(prevState => {
            const productsArr = [...prevState.cartProducts];
            /* find the index of the updated product element/object. */
            const indexOfProduct = productsArr.findIndex((productElem, index) => productElem.id === productId);
            /* replace the updated product with the old one. */
            productsArr.splice(indexOfProduct, 1);

            this.setState((prevValue => {
                prevValue.products = productsArr;
            }));

            this._totalAmount();
        });
    }

    /* calculate the total. */
    _totalAmount() {
        let total = 0;
        if (this.state.cartProducts) {
            this.setState({
                totalAmount: 0
            });
        } else {
            this.state.cartProducts.forEach(productElem => {
                total += productElem.unitPrice;
            });

            this.setState({
                totalAmount: total
            });
        }
    }

    _cleanCart() {
        this.state.cartProducts = [];
    }

    render() {
        return (<CartContext.Provider value={
            {
                cartProducts: this.state.cartProducts,
                addToCart: this._addToCart.bind(this),
                removeFromCart: this._removeFromCart.bind(this),
                totalAmount: this.state.totalAmount,
                cleanCart: this._cleanCart.bind(this)
            }
        }>
            {this.props.children}
        </CartContext.Provider>);
    }
}

const CartConsumer = CartContext.Consumer;
module.exports = {
    CartProvider, CartContext, CartConsumer
};

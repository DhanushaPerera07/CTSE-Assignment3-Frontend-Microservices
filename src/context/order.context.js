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
import OrderService from '../service/order.service';

/* create the Order context using default values. */
const OrderContext = React.createContext({
    orders: [],
    addOrder: () => {
    }
});

class OrderProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    /** Add a new order.
     * @param order order object with values.
     * @return Promise with a result. if success resolve { generatedId: <id>},
     * otherwise, reject the error. */
    addOrder(order) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await OrderService.addOrder(order);
                if (response.status === 201) {
                    /* 201 - CREATED - Order successful. */
                    const resultObject = JSON.parse(response.data);
                    /* created product should be add to the order array. */
                    this.setState(prevState => {
                        prevState.orders = [...prevState.orders].unshift({...order, id: resultObject?.generatedId});
                    });
                    resolve(resultObject);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    render() {
        return (
            <OrderContext.Provider value={{
                orders: this.state.orders,
                addOrder: this.addOrder
            }}>
                {this.props.children}
            </OrderContext.Provider>
        );
    }
}

module.exports = {
    OrderContext, OrderProvider
};

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

import React, {useContext} from 'react';
import {ProductContext} from '../../context/product.context';
import {Container, Form} from 'react-bootstrap';

function ProductSearch(props) {
    const {filterProductsByName} = useContext(ProductContext);

    /** Search prodcut by name. */
    const searching = (event) => {
        event.stopPropagation();
        const searchKeyValue = event.target.value;
        filterProductsByName(searchKeyValue).then(console.log).catch(console.error);
    };

    return (
        <div>
            <Container>
                <Form>
                    <Form.Control type="text"
                                  name="productName"
                                  placeholder="Search Product by Name"
                                  onChange={searching}
                    />
                </Form>
            </Container>
        </div>
    );
}

export default ProductSearch;

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

import React from "react";
import ProductListItem from "./ProductListItem";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import ProductSearch from "./ProductSearch";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  selectProduct(product) {
    this.setState({ product: product });
  }

  render() {
    const { products } = this.props;
    const isAdmin =
      atob(
        sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))
      ) === "ADMIN";
    return (
      <Container style={{ padding: "2rem 0" }}>
        {/* header. */}

        <Container fluid className="products-header p-0">
          <Row>
            <Col>
              <h1>Products</h1>
            </Col>
            <Col>
              <ProductSearch />
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                justifyItems: "center",
              }}
            >
              {isAdmin ? (
                <Link to="/products/add">
                  <Button> Add </Button>
                </Link>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row>
            {/* display product item by item by looping through. */}
            {products.map((product) => {
              return (
                <ProductListItem
                  key={product._id}
                  product={product}
                  selectProduct={(product) => {
                    this.selectProduct(product);
                  }}
                />
              );
            })}
          </Row>
        </Container>
      </Container>
    );
  }
}

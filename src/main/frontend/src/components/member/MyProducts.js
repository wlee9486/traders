/**
 * @author heera youn
 * @create date 2023-10-24 17:39:43
 * @modify date 2023-10-28 17:53:04
 * @desc [Mypage 내 등록 물품 FE]
 */
/**
 * @author wheesunglee
 * @create date 2023-10-24 13:02:02
 * @modify date 2023-10-24 17:39:39
 */

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductList from "../product/ProductList";
import TokenRefresher from "../util/TokenRefresher";

const MyProducts = () => {
  const [data, setData] = useState();
  useEffect(() => {
    TokenRefresher.get("http://localhost:8080/api/myproducts")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          const errorResponse = error.response.data;
          console.log(errorResponse);
        }
      });
  }, []);
  console.log(data);

  return (
    <>
      <Container style={{ width: "850px", marginTop: "180px" }}>
        <Row className="justify-content-center" style={{ margin: "0px" }}>
          <Col md="12" style={{ margin: "0px" }}>
            <Row>
              {data &&
                data.map((product, index) => {
                  return (
                    <Col md={3} key={index} style={{ marginBottom: "15px" }}>
                      <ProductList product={product} />
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyProducts;

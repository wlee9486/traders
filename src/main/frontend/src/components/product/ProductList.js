/**
 * @author wheesunglee
 * @create date 2023-09-20 10:19:28
 * @modify date 2023-10-30 11:07:11
 */
/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-27 14:55:51
 * @desc [페이지 전체 템플릿 css]
 */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { IoIosHeart } from "react-icons/io";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAddress } from "../../assets/js/product";

const ProductList = ({ product }) => {
  const [images, setImages] = useState();
  const history = useHistory();
  const [address, setAddress] = useState();

  useEffect(() => {
    setImages(product.images);
    getAddress(product.latitude, product.longitude)
      .then((addressInfo) =>
        setAddress(addressInfo.region1 + " " + addressInfo.region3)
      )
      .catch((error) => console.error(error));
  }, [product]);
  return (
    <>
      <Card className="product-card-list">
        <CardBody className="card-body">
          {images && (
            <>
              <img
                alt=""
                src={`http://localhost:8080${images[0].filepath}`}
                className="product-list-img"
                onClick={() => history.push(`/products/${product.id}`)}
              />
              <span className="badge position-absolute top-0 end-0">
                {product.status}
              </span>
            </>
          )}

          <Row style={{ marginTop: "8px", fontWeight: "700" }}>
            <Col className="product-name">#{product.category}</Col>
          </Row>

          <Row className="justify-content">
            <Col sm={7} className="product-name">
              {product.name}
            </Col>
            <Col sm={4} className="product-name-like">
              <font className="likes">{product.likes}</font>
              <IoIosHeart className="product-name-icons"></IoIosHeart>
            </Col>
          </Row>

          <Row className="justify-content" style={{ marginTop: "12px" }}>
            <Col sm={5} className="product-price">
              {product.price}
              <span
                style={{ marginLeft: "3px", marginTop: "7px", fontSize: "9pt" }}
              >
                원
              </span>
            </Col>
            <Col sm={6} className="product-addr">
              {address}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default ProductList;

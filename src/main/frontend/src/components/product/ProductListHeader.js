/**
 * @author wheesunglee
 * @create date 2023-09-20 10:21:07
 * @modify date 2023-10-31 11:48:40
 */
/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-27 14:55:51
 * @desc [페이지 전체 템플릿 css]
 */
import { React, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../assets/css/Product.css";
import { fetchAllProducts, getNearby } from "../../assets/js/product";
import ProductList from "./ProductList";

const ProductListHeader = () => {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewNearby, setViewNearby] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const history = useHistory();

  const filterByCategory = (category) => {
    setCategoryFilter(category);
    if (category === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((product) => product.category === category);
      setFilteredData(filtered);
    }
  };

  const nearbyProducts = () => {
    setViewNearby(!viewNearby);
    getNearby(viewNearby).then((response) => {
      if (response) {
        setData(response);
      }
    });
  };

  useEffect(() => {
    fetchAllProducts().then((response) => {
      if (response) {
        setData(response.data);
      }
    });
  }, []);

  return (
    <>
      <Container style={{ width: "850px", marginTop: "180px" }}>
        <Row>
          <Col md="12" style={{ position: "relative", left: "38px" }}>
            <div style={{ width: "100%" }}>
              <button
                className="category-btn"
                onClick={() => filterByCategory("")}
              >
                전체
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="text-center mb-4">
            <div style={{ width: "100%" }}>
              <button
                className="category-btn"
                onClick={() => filterByCategory("여성의류")}
              >
                여성의류
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("남성의류")}
              >
                남성의류
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("신발")}
              >
                신발
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("가방/지갑")}
              >
                가방/지갑
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("반려동물")}
              >
                반려동물
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("디지털")}
              >
                디지털
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("가전제품")}
              >
                가전제품
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("스포츠/레저")}
              >
                스포츠/레저
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("도서/티켓")}
              >
                도서/티켓
              </button>
              <button
                className="category-btn"
                onClick={() => filterByCategory("인테리어")}
              >
                인테리어
              </button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-left-align bold-colored-font ">
            <button
              className="saveButton-3"
              onClick={() => setShowAvailable(!showAvailable)}
            >
              {showAvailable ? "전체 보기" : "거래 가능한 물품"}
            </button>
            <button className="saveButton-3" onClick={nearbyProducts}>
              {viewNearby ? "전지역 물품보기" : "현위치 물품보기"}
            </button>
          </Col>
          <Col className="col-right-align"></Col>
        </Row>
      </Container>

      <Container style={{ width: "850px", marginTop: "15px" }}>
        <Row className="justify-content-center" style={{ margin: "26px" }}>
          <Col md="12" style={{ margin: "0px" }}>
            <Row>
              {(categoryFilter === "" ? data : filteredData).map(
                (product, index) => {
                  if (showAvailable && product.status === "SOLD") {
                    return null;
                  }
                  return (
                    <Col md={3} key={index} style={{ marginBottom: "15px" }}>
                      <ProductList product={product} />
                    </Col>
                  );
                }
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductListHeader;

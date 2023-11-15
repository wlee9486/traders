/**
 * @author wheesunglee
 * @create date 2023-09-30 13:38:26
 * @modify date 2023-10-31 11:42:03
 */

/**
 * @author hyunseul
 * @modify date 2023-10-18 11:11:38
 * css 수정
 */
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../../assets/css/ProductRegistration.css";
import "../../styles/global.css";
import TokenRefresher from "../util/TokenRefresher";
import ImagePreview from "./ImagePreview";
import ProductMap from "./ProductMap";

const ProductRegistration = () => {
  const form = new FormData();
  const [files, setFiles] = useState([]);

  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const { name, price, description, category } = data;

  const changeInput = (evt) => {
    const { name, value, type } = evt.target;

    if (type === "file") {
      let maxSize = 20 * 1024 * 1024;

      const selectedFiles = Array.from(evt.target.files);

      let fileSize = selectedFiles[0].size;

      if (fileSize > maxSize) {
        alert("파일 사이즈는 20MB 이내로 가능합니다.");
        return;
      }
      setFiles([...files, ...selectedFiles]);
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleMapSubmit = (location) => {
    setData({
      ...data,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const deleteFile = (indexToDelete) => {
    const updatedFiles = files.filter((_, index) => index !== indexToDelete);
    setFiles(updatedFiles);
  };

  const history = useHistory();

  const submitData = () => {
    files.forEach((file) => {
      form.append("files", file);
    });
    form.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    try {
      TokenRefresher.post("http://localhost:8080/api/products/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => console.log(res.data));
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    }

    setTimeout(() => {
      history.push("/products");
    }, 500);
  };

  return (
    <body className="basefont">
      <Container
        className="product"
        style={{ width: "850px", marginTop: "180px" }}
      >
        <Row className="product-header">
          기본정보
          <Col sm={4} style={{ fontSize: "12pt", color: "rgb(170, 44, 44)" }}>
            *필수항목
          </Col>
        </Row>

        <Row className="product-row-sm-1">
          <hr className="product-hr" />
          <Col sm={2} className="product-col-sm-1">
            상품명<font style={{ color: "rgb(170, 44, 44)" }}>*</font>
          </Col>
          <Col sm={8}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={changeInput}
              placeholder=" 　상품명을 입력해 주세요."
              className="sm-input"
              id="custom-placeholder-1"
            />
          </Col>
          <hr className="product-hr" />
        </Row>

        <Row className="product-row-sm-1">
          <Col sm={2} className="product-col-sm-1">
            가격<font style={{ color: "rgb(170, 44, 44)" }}>*</font>
          </Col>
          <Col sm={8}>
            <input
              type="text"
              name="price"
              value={price}
              onChange={changeInput}
              placeholder="　가격을 입력해 주세요.　　　　　　　원"
              id="custom-placeholder-1"
              className="sm-input-price"
            />
          </Col>
          <hr className="product-hr" />
        </Row>

        <Row className="product-row-sm-2">
          <Col sm={2} className="product-col-sm-1">
            설명<font style={{ color: "rgb(170, 44, 44)" }}>*</font>
          </Col>
          <Col sm={8}>
            <textarea
              name="description"
              value={description}
              onChange={changeInput}
              rows={10}
              resize="none"
              className="product-textarea"
              id="custom-placeholder"
              placeholder=" 구매시기, 브랜드/모델명, 제품의 상태(사용감, 하자 유무)등을 입력해 주세요.
              서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요."
            />
          </Col>
        </Row>

        <Row className="product-row-sm-1">
          <Col sm={2} className="product-col-sm-1">
            카테고리<font style={{ color: "rgb(170, 44, 44)" }}>*</font>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="여성의류"
              name="category"
              value="여성의류"
              onChange={changeInput}
            />
            <label htmlFor="여성의류">여성의류</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="남성의류"
              name="category"
              value="남성의류"
              onChange={changeInput}
            />
            <label htmlFor="남성의류">남성의류</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="신발"
              name="category"
              value="신발"
              onChange={changeInput}
            />
            <label htmlFor="신발">신발</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="가방/지갑"
              name="category"
              value="가방/지갑"
              onChange={changeInput}
            />
            <label htmlFor="가방/지갑">가방/지갑</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="반려동물"
              name="category"
              value="반려동물"
              onChange={changeInput}
            />
            <label htmlFor="반려동물">반려동물</label>
          </Col>
        </Row>
        <Row className="product-row-sm-1">
          <Col sm={2} className="product-col-sm-1"></Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="디지털"
              name="category"
              value="디지털"
              onChange={changeInput}
            />
            <label htmlFor="디지털">디지털</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="가전제품"
              name="category"
              value="가전제품"
              onChange={changeInput}
            />
            <label htmlFor="가전제품">가전제품</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="스포츠/레저"
              name="category"
              value="스포츠/레저"
              onChange={changeInput}
            />
            <label htmlFor="스포츠/레저">스포츠/레저</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="도서/티켓"
              name="category"
              value="도서/티켓"
              onChange={changeInput}
            />
            <label htmlFor="도서/티켓">도서/티켓</label>
          </Col>
          <Col sm={2} className="custom-radio">
            <input
              type="radio"
              id="인테리어"
              name="category"
              value="인테리어"
              onChange={changeInput}
            />
            <label htmlFor="인테리어">인테리어</label>
          </Col>
        </Row>

        <Row className="product-row-sm-1">
          <Col sm={2} className="product-col-sm-1">
            거래지역<font style={{ color: "rgb(170, 44, 44)" }}>*</font>
          </Col>

          <Col sm={1} className="product-col-sm-1">
            <ProductMap
              onMapSubmit={handleMapSubmit}
              className="modal-button"
            />
          </Col>
          <hr className="product-hr" />
        </Row>

        <Row className="product-row-sm-1">
          <Col sm={2} className="sm-col-img">
            상품이미지<font style={{ color: "rgb(170, 44, 44)" }}>*</font>
            <font style={{ color: " #7d807f", fontSize: "12pt" }}></font>
          </Col>

          <Col sm={2}>
            <label for="files">
              <div className="btn-upload ">
                <font className="file-text">이미지 등록</font>
              </div>
            </label>
            <input
              name="files"
              id="files"
              type="file"
              accept="image/png, image/jpeg"
              onChange={changeInput}
              style={{ display: "none" }}
            />
          </Col>
          <Row Row className="product-row-sm-1">
            <ImagePreview files={files} deleteFile={deleteFile} />
          </Row>
        </Row>
        <hr className="product-hr" style={{ marginTop: "50px" }} />

        <Row className="product-row-sm-1">
          <Col className="product-col-sm-1">
            <button
              onClick={() =>
                setTimeout(() => {
                  history.push("/products");
                }, 500)
              }
              className="saveButton-2"
              style={{
                backgroundColor: "#d0d0d0",
                color: "rgb(88, 88, 88)",
                marginRight: "30px",
              }}
            >
              뒤로가기
            </button>

            <button onClick={submitData} className="saveButton-1">
              등록하기
            </button>
          </Col>
        </Row>
      </Container>
    </body>
  );
};

export default ProductRegistration;

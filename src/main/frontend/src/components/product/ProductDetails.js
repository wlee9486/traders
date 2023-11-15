/**
 * @author wheesunglee
 * @create date 2023-09-20 10:21:07
 * @modify date 2023-10-28 17:16:02
 */
/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-27 14:55:51
 * @desc [페이지 전체 템플릿 css]
 */

import jwt_encode from "jwt-encode";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AiOutlineClockCircle, AiOutlineShop } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsChatHeart, BsDot } from "react-icons/bs";
import { FiBookmark, FiMapPin } from "react-icons/fi";
import { IoIosHeart } from "react-icons/io";
import { useHistory } from "react-router-dom/";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../../assets/css/Product.css";
import {
  changeLikes,
  fetchLiked,
  fetchLikes,
  fetchProduct,
  getAddress,
} from "../../assets/js/product";
import ImageView from "./ImageView";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({});
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState();
  const [imageList, setImageList] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [user, setUser] = useState();
  const [address, setAddress] = useState();
  const {
    seller,
    name,
    price,
    description,
    category,
    latitude,
    longitude,
    images,
    createdAt,
  } = data;
  const key = process.env.REACT_APP_JWT_KEY;
  const KAKAOMAP_API_KEY = process.env.REACT_APP_KAKAOMAP_API_KEY;

  useEffect(() => {
    setUser(window.user);
    fetchProduct(id).then((response) => {
      if (response) {
        setData(response.data);
        setImageList(response.data.images);
      }
    });
    fetchLikes(id).then((response) => {
      if (response) {
        setLikes(response.data);
      }
    });

    fetchLiked(id).then((response) => {
      if (response) {
        setLiked(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      getAddress(latitude, longitude)
        .then((addressInfo) =>
          setAddress(addressInfo.region2 + " " + addressInfo.region3)
        )
        .catch((error) => console.error(error));
    }
  }, [data]);

  const changeLiked = (id) => {
    setLiked(!liked);
    changeLikes(id).then((response) => {
      if (response) {
        setLikes(response.data);
      }
    });
  };

  function generateRoomNum(id, seller, user) {
    const data = {
      productId: id,
      seller: seller,
      buyer: user,
    };
    const roomNum = jwt_encode(data, key);
    return roomNum;
  }

  const moveToChat = () => {
    const roomNum = generateRoomNum(id, seller, user);
    history.push({
      pathname: `../chat/roomNum/${roomNum}`,
      state: data,
    });
  };

  const MapComponent = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
          draggable: false,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };

    return (
      <div
        id="map"
        style={{ width: "100%", height: "280px", position: "relative" }}
      />
    );
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      "그린페이 되나요?" 라고 물어볼 필요 없이 안전결제로 구매할 수 있는
      상품이에요.
    </Tooltip>
  );

  return (
    <>
      <Container
        style={{ width: "850px", height: "830px", marginTop: "250px" }}
      >
        <hr style={{ color: "#000" }}></hr>
        <Row style={{ width: "850px" }} className="product-detail-row-1">
          <Col xs={12} className="product-detail-col-1">
            {images && <ImageView imageList={images} />}
          </Col>
          <Col
            xs={12}
            style={{ marginRight: "0px", marginLeft: "30px" }}
            className="product-detail-col-2"
          >
            <div style={{ fontSize: "23pt", fontWeight: "600" }}>{name}</div>
            <div
              style={{ fontSize: "27pt", fontWeight: "600", marginTop: "15px" }}
            >
              {price}원
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button className="saveButton-1" id="pay-popup">
                  그린페이
                </Button>
              </OverlayTrigger>
              <hr style={{ color: "#999" }}></hr>
            </div>

            <Row>
              <Col
                sm={1}
                style={{
                  padding: "0px",
                  textAlign: "center",
                  color: liked ? "#dc3545" : "gray",
                }}
              >
                <IoIosHeart size={20} />
                {likes}
              </Col>
              <Col sm={6} style={{ margin: "0px", color: "gray" }}>
                <AiOutlineClockCircle size={20} /> {createdAt}
              </Col>
            </Row>

            <Row style={{ marginTop: "25px" }}>
              <Col
                sm={3}
                style={{
                  paddingLeft: "7px",
                  paddingRight: "0px",
                  textAlign: "left",
                  color: "gray",
                  alignContent: "center",
                }}
              >
                <BsDot size={25} />
                카테고리
              </Col>
              <Col sm={6} style={{ paddingLeft: "0px" }}>
                {category}
              </Col>
            </Row>

            <Row style={{ marginTop: "25px" }}>
              <Col
                sm={3}
                style={{
                  paddingLeft: "7px",
                  paddingRight: "0px",
                  textAlign: "left",
                  color: "gray",
                  alignContent: "center",
                }}
              >
                <BsDot size={25} />
                교환여부
              </Col>
              <Col sm={6} style={{ paddingLeft: "0px" }}>
                교환불가능
              </Col>
            </Row>

            <Row style={{ marginTop: "25px" }}>
              <Col
                sm={3}
                style={{
                  paddingLeft: "7px",
                  paddingRight: "0px",
                  textAlign: "left",
                  color: "gray",
                  alignContent: "center",
                }}
              >
                <BsDot size={25} />
                거래장소
              </Col>
              <Col sm={6} style={{ paddingLeft: "0px" }}>
                {address}
              </Col>
            </Row>

            <Row>
              <Col md="10">
                <div className="col-right-align">
                  {seller === user && (
                    <button
                      className="saveButton-3"
                      onClick={() => {
                        history.push({
                          pathname: "/products/update/" + id,
                          state: data,
                        });
                      }}
                    >
                      수정하기
                    </button>
                  )}
                </div>
              </Col>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  {seller === user ? null : (
                    <div className="mt-4">
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-center"
                      >
                        <button
                          style={{
                            width: "210px",
                            fontSize: "15pt",
                            textAlign: "center",
                          }}
                          className="saveButton-2"
                          color="default"
                          type="button"
                          onClick={() => changeLiked(id)}
                        >
                          <IoIosHeart size={20} /> 찜{likes}
                        </button>
                        <button
                          style={{
                            width: "210px",
                            fontSize: "15pt",
                            textAlign: "center",
                          }}
                          className="saveButton-1"
                          color="default"
                          type="button"
                          onClick={() => moveToChat()}
                        >
                          <BsChatHeart
                            style={{
                              transform: "scaleX(-1)",
                              alignContent: "center",
                              marginRight: "8px",
                              marginBottom: "4px",
                            }}
                            size={20}
                          />
                          그린톡
                        </button>
                      </Stack>
                    </div>
                  )}
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
        <hr
          style={{
            marginTop: "40px",
            height: " 0",
            margin: "1rem 0.5rem 0.5rem 0.5rem",
            overflow: "hidden",
            borderTop: "1px solid #000",
          }}
        />
        <Row style={{ marginTop: "40px" }}>
          <Col md={11} style={{ margin: "auto" }}>
            <MapComponent latitude={latitude} longitude={longitude} />
          </Col>
        </Row>
        <hr style={{ color: "#000" }}></hr>
        <Row>
          <Col md="3" style={{ marginLeft: "0px", marginRight: "0px" }}>
            <div className="text-center">
              <div
                style={{
                  fontSize: "15pt",
                  fontWeight: "600",
                  marginTop: "40px",
                }}
              >
                <AiOutlineShop size={35} /> 상점 정보
              </div>
              <hr style={{ color: "#000" }}></hr>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "0px",
                  marginLeft: "0px",
                  textAlign: "left",
                }}
              >
                <BiUserCircle
                  size={20}
                  style={{
                    color: "#999",
                    position: "absolute",
                    alignContent: "center",
                    marginTop: "5px",
                  }}
                />
                <span
                  style={{
                    color: "#999",
                    fontSize: "10pt",
                    marginLeft: "23px",
                  }}
                >
                  판매자 정보
                </span>
                <span style={{ marginLeft: "20px", fontSize: "11pt" }}>
                  {seller}
                </span>
              </div>
              <hr style={{ color: "#000" }}></hr>
              <div
                style={{
                  marginTop: "15px",
                  alignContent: "center",
                  textAlign: "left",
                }}
              >
                <FiMapPin
                  size={20}
                  style={{
                    color: "#999",
                    position: "absolute",
                    alignContent: "center",
                    marginTop: "5px",
                  }}
                />
                <span
                  style={{
                    color: "#999",
                    fontSize: "10pt",
                    marginLeft: "23px",
                  }}
                >
                  거래지역
                </span>
                <span style={{ marginLeft: "10px", fontSize: "10pt" }}>
                  {address}
                </span>
              </div>
              <hr style={{ color: "#000" }}></hr>
              <div
                style={{
                  marginTop: "15px",
                  alignContent: "center",
                  textAlign: "left",
                }}
              >
                <FiBookmark
                  size={22}
                  style={{
                    color: "#999",
                    position: "absolute",
                    marginTop: "5px",
                  }}
                />
                <span
                  style={{
                    color: "#999",
                    fontSize: "10pt",
                    marginLeft: "23px",
                  }}
                >
                  카테고리
                </span>
                <span style={{ marginLeft: "10px", fontSize: "10pt" }}>
                  {category}
                </span>
              </div>
            </div>
          </Col>

          <Col sm="1">
            <div className="vertical-line"></div>
          </Col>
          <Col>
            <div className="text-center">
              <div
                style={{
                  fontSize: "15pt",
                  fontWeight: "600",
                  marginTop: "40px",
                }}
              >
                상품 정보
              </div>
              <hr style={{ color: "#000" }}></hr>
              <div style={{ marginTop: "10px" }}>{description}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;

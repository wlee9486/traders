/**
 * @author hyunseul
 * @create date 2023-10-23 22:31:18
 * @modify date 2023-10-28 17:53:27
 * @desc [페이지 전체 템플릿 css]
 */
/**
 * @author ahrayi
 * @create date 2023-10-17 10:02:58
 * @modify date 2023-10-23 22:31:17
 */

import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { PiNumberCircleThree } from "react-icons/pi";
import "../../assets/css/AccountRegister.css";
import "../../assets/css/ProductRegistration.css";

const AccountRegister3 = ({ postAccountInfo }) => {
  const [flag, setFlag] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const handleAgreementChange = () => {
    setAgreed(!agreed);
  };

  const handleVerification = () => {
    setFlag(false);
  };

  const handleNext = () => {
    postAccountInfo();
  };

  return (
    <body>
      <Container
        className="product"
        style={{ width: "850px", marginTop: "180PX" }}
      >
        <Row className="product-header ">
          <div
            style={{ fontSize: "15pt", fontWeight: "600", color: " #198754" }}
          >
            ▷인증하기
          </div>
          <hr className="product-hr" />
        </Row>
        <Row style={{ height: "120px" }}>
          <p style={{ fontWeight: "700", marginBottom: "5px" }}>ARS 인증</p>
          <p className="account-col-1">
            * 본인확인을 위해 전화인증을 수행할 전화번호를 선택하시면 ARS가
            발신됩니다.
            <br />* 당행에 등록된 전화번호를 확인해 주시기 바랍니다.
          </p>
        </Row>
        <Row style={{ fontWeight: "900" }}>
          <div>
            <PiNumberCircleThree style={{ fontSize: "16pt" }} /> 인증번호 입력
          </div>
        </Row>
      </Container>

      <Container
        style={{ maxWidth: "1040px", maxHeight: "350px" }}
        className="account-container-2"
      >
        <Row style={{ marginTop: "50px" }} className="account-3-row-1">
          ARS 인증
        </Row>
        <Row style={{ marginTop: "20px" }} className="account-3-row-2">
          인증전화를 받은 후, 안내 음성에 따라 아래 번호를 입력해주세요.
        </Row>
        <Row
          style={{ marginTop: "20px", height: "20px" }}
          className="account-3-row-3"
        >
          <Col md={6}>
            <span style={{ color: "green", fontWeight: "bold" }}>[필수]</span>
            &nbsp;&nbsp; 오픈뱅킹 출금이체 동의 &nbsp;
            <a href="#">상세보기</a>
          </Col>
        </Row>
        <Row className="account-3-row-3" style={{ height: "30px" }}>
          <Col md={6} style={{ marginTop: "20px" }}>
            <span>
              <input
                type="checkbox"
                className="term-checkbox"
                checked={agreed}
                onChange={handleAgreementChange}
                disabled={!flag}
              />
              동의함 &nbsp;&nbsp;
              <input
                type="checkbox"
                className="term-checkbox"
                checked={!agreed}
                onChange={handleAgreementChange}
                disabled={!flag}
              />
              동의안함
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "50px" }}>
          {flag && (
            <button
              className={` account-3-row-btn ${
                agreed ? "saveButton-2" : "cancelButton-1"
              }`}
              onClick={handleVerification}
              disabled={!agreed}
            >
              📞 인증전화 받기
            </button>
          )}
          {/* {flag && <button  onClick={handleVerification} disabled={!agreed}>📞인증전화 받기</button>} */}
          {!flag && (
            <button
              style={{ marginTop: "20px" }}
              className="accout-3-row-btn saveButton-2"
              onClick={handleNext}
            >
              인증 완료
            </button>
          )}
          <br />
          {!flag && (
            <p style={{ textAlign: "center" }}>
              <br />
              ARS 인증과정은 생략됩니다.
            </p>
          )}
        </Row>
      </Container>

      <Container
        style={{
          maxWidth: "1040px",
          backgroundColor: "#cdcdcd8d ",
          height: "150px",
        }}
      >
        <Row className="account-row text-2" style={{ paddingTop: "10px" }}>
          <p>
            ▶ 전화가 오지 않은 경우 전화번호가 다르거나 착신이 정지되어 있는지
            확인하시기 바랍니다.
            <br></br>
            <br></br>▶ 착신 전환된 전화번호로는 ARS인증이 불가하오니 유의하시기
            바랍니다.
          </p>
        </Row>
      </Container>
    </body>
  );
};

export default AccountRegister3;

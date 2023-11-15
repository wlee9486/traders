/**
 * @author hyunseul
 * @create date 2023-10-23 22:31:18
 * @modify date 2023-10-28 17:53:21
 * @desc [페이지 전체 템플릿 css]
 */
/**
 * @author ahrayi
 * @create date 2023-10-13 16:44:23
 * @modify date 2023-10-25 16:10:54
 */

import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { PiNumberCircleOne } from "react-icons/pi";
import "../../assets/css/AccountRegister.css";
import "../../assets/css/ProductRegistration.css";
import "../../styles/global.css";
import TokenRefresher from "../util/TokenRefresher";
import bankCode from "./bankCode";

const AccountRegister1 = ({ form, onText, onNext, setRanNum }) => {
  const [address, setAddress] = useState("");

  var themeObj = {
    searchBgColor: "#198754", //검색창 배경색
    queryTextColor: "#FFFFFF", //검색창 글자색
  };

  const handleAddressInput = () => {
    if (window.daum && window.daum.Postcode) {
      // 'daum' 객체 및 'Postcode' 함수가 로드된 상태에서 실행

      new window.daum.Postcode({
        theme: themeObj,
        popupTitle: "주소 검색 - TRADERS",
        popupKey: "popup1",
        oncomplete: (data) => {
          // 'data' 객체에서 주소와 상세주소 정보 가져오기
          setAddress(data.address);
          onText({ target: { value: data.address, name: "addr1" } });
        },
      }).open();
    } else {
      // 'daum' 객체나 'Postcode' 함수가 로드되지 않은 경우에 대한 처리
      console.error("Daum Postcode API is not available.");
    }
  };

  const handleAccountVerification = () => {
    const requestBody = {
      accountNum: form.accountNum,
      addr1: form.addr1,
      addr2: form.addr2,
      bankCodeStd: form.bankCodeStd,
      clientInfo: form.clientInfo,
    };

    TokenRefresher.post(
      "http://localhost:8080/api/payment/valid-account",
      requestBody
    )
      .then((Response) => {
        if (Response.status === 200) {
          console.log(Response.data);
          setRanNum(Response.data.ranNum);

          onNext();
        } else {
          alert("유효하지 않은 계좌정보입니다.");
        }
      })
      .catch((error) => {
        console.error();
      });
  };
  return (
    <body>
      <Container
        className="product"
        style={{ width: "850px", marginTop: "180PX" }}
      >
        <Row className="product-header">
          <div
            style={{ fontSize: "15pt", fontWeight: "600", color: " #198754" }}
          >
            ▷인증하기
          </div>
          <hr className="product-hr" />
        </Row>
        <Row style={{ height: "120px" }}>
          <p style={{ fontWeight: "700", marginBottom: "5px" }}>
            은행 계좌 인증
          </p>
          <p className="account-col-1">
            * 은행 계좌 인증을 진행해 주세요.
            <br />* 회원님의 실명과 계좌에 등록된 이름이 일치해야 인증이
            가능합니다.
          </p>
        </Row>
        <Row style={{ fontWeight: "900" }}>
          <div>
            <PiNumberCircleOne style={{ fontSize: "16pt" }} /> 인증할 은행 계좌
            정보
          </div>
        </Row>
      </Container>
      <Container
        style={{ maxWidth: "1040px", height: "330px" }}
        className="account-container-2"
      >
        <Row style={{ marginTop: "45px" }} className="account-row">
          <Col md={2} className="account-col-2">
            은행 선택
          </Col>
          <Col md={9} className="account-col-3">
            <Form.Select
              aria-label="인증할 은행을 선택해주세요."
              name="bankCodeStd"
              value={form.bankCodeStd}
              onChange={onText}
              style={{ border: "1px solid", fontSize: "10pt", width: "70%" }}
            >
              {bankCode.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="account-row">
          <Col md={2} className="account-col-2">
            은행 계좌번호
          </Col>
          <Col md={9} className="account-col-3">
            <input
              className="account-text-field"
              maxLength={16}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="계좌번호를 입력해주세요."
              type="text"
              color="success"
              required
              name="accountNum"
              onChange={onText}
            />
          </Col>
        </Row>
        <Row className="account-row">
          <Col md={2} className="account-col-2">
            주소
          </Col>
          <Col md={9} className="account-col-3">
            <input
              type="text"
              id="addr1"
              name="addr1"
              value={address}
              required
              onChange={onText}
              readOnly
              className="account-text-field"
              placeholder="주소를 입력해주세요."
              onClick={handleAddressInput}
            />
          </Col>
        </Row>
        <Row className="account-row">
          <Col md={2} className="account-col-2">
            상세주소
          </Col>
          <Col md={9} className="account-col-3">
            <input
              type="text"
              id="addr2"
              name="addr2"
              required
              onChange={onText}
              className="account-text-field"
            />
          </Col>
        </Row>
      </Container>

      <Row className="account-row">
        <button
          className="account-row-btn saveButton-2 "
          onClick={handleAccountVerification}
        >
          계좌 인증 요청
        </button>
      </Row>
      <br></br>
      <Container
        style={{
          maxWidth: "1040px",
          backgroundColor: "#cdcdcd8d ",
          height: "150px",
        }}
      >
        <Row className="account-row text-2" style={{ paddingTop: "10px" }}>
          <p>
            ▶계좌 인증을 위하여 1원을 송금할 예정입니다.
            <br></br>
            <br></br>▶ 계좌 거래내역에서 '그린_000'중 세자리 인증번호를
            입력해주세요.
          </p>
        </Row>
      </Container>
    </body>
  );
};

export default AccountRegister1;

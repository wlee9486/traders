/**
 * @author heera youn
 * @create date 2023-10-22 23:27:59
 * @modify date 2023-10-28 17:52:40
 * @desc [그린페이 충전 및 환급 모달 페이지]
 */
/**
 * @author ahrayi
 * @create date 2023-10-22 02:22:56
 * @modify date 2023-10-23 08:53:49
 * @desc 그린페이 충전
 */

import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../assets/css/ChatMapModal.css";
import PayPassword from "./PayPassword";

const PointCharge = ({ showModal, handleCloseModal }) => {
  const [counter, setCounter] = useState(0);
  const [num, setNum] = useState(0);

  // 숫자 버튼을 클릭할 때 해당 버튼의 값이 counter에 추가되도록 처리
  const handleNumberClick = (number) => {
    if (number === "00" || number === "0") {
      setCounter(counter * 10 + parseInt(number));
    } else if (number === "delete") {
      setCounter(Math.floor(counter / 10));
    } else {
      setCounter(counter * 10 + parseInt(number));
    }
  };

  function onClick() {
    setCounter(counter + 1);
  }

  const inputPriceFormat = (str) => {
    console.log("s", str);
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  return (
    <Modal
      className="basefont"
      show={showModal}
      onHide={handleCloseModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="text-center w-100 title"
          style={{ marginLeft: "5px" }}
        >
          &nbsp;&nbsp;그린페이 충전하기
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ margin: "auto", justifyContent: "center" }}>
        <p style={{ textAlign: "center" }} className="allterms">
          충전하실 금액을 입력해주세요.
        </p>

        <p className="titleterms" style={{ textAlign: "center" }}>
          {inputPriceFormat(counter)}
        </p>

        <Col style={{ margin: "10px" }}>
          <span>충전 : </span>
          <button
            onClick={() => setCounter(counter + 10000)}
            className="chargeButton"
          >
            {" "}
            + 1만원
          </button>
          <button
            onClick={() => setCounter(counter + 50000)}
            className="chargeButton"
          >
            + 5만원
          </button>
          <button
            onClick={() => setCounter(counter + 100000)}
            className="chargeButton"
          >
            + 10만원
          </button>
        </Col>
        <br />

        <div className style={{ margin: "auto" }}>
          <div className style={{ textAlign: "center" }}>
            <button onClick={() => handleNumberClick(1)} className="paybutton">
              1
            </button>
            <button onClick={() => handleNumberClick(2)} className="paybutton">
              2
            </button>
            <button onClick={() => handleNumberClick(3)} className="paybutton">
              3
            </button>
          </div>
          <div className style={{ textAlign: "center" }}>
            <button onClick={() => handleNumberClick(4)} className="paybutton">
              4
            </button>
            <button onClick={() => handleNumberClick(5)} className="paybutton">
              5
            </button>
            <button onClick={() => handleNumberClick(6)} className="paybutton">
              6
            </button>
          </div>
          <div className style={{ textAlign: "center" }}>
            <button onClick={() => handleNumberClick(7)} className="paybutton">
              7
            </button>
            <button onClick={() => handleNumberClick(8)} className="paybutton">
              8
            </button>
            <button onClick={() => handleNumberClick(9)} className="paybutton">
              9
            </button>
          </div>
          <div className style={{ textAlign: "center" }}>
            <button
              onClick={() => handleNumberClick("00")}
              className="paybutton"
            >
              00
            </button>
            <button
              onClick={() => handleNumberClick("0")}
              className="paybutton"
            >
              0
            </button>
            <button
              onClick={() => handleNumberClick("delete")}
              className="paybutton"
            >
              ←
            </button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="cancelButton-1"
          variant="secondary"
          onClick={handleCloseModal}
        >
          취소
        </Button>
        <Button
          className="saveButton-1"
          variant="primary"
          onClick={PayPassword}
        >
          충전
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PointCharge;

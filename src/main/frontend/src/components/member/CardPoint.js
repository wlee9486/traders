/**
 * @author heera youn
 * @create date 2023-10-22 02:25:19
 * @modify date 2023-10-31 10:39:28
 * @desc [마이페이지 TAB1.그린페이 전환/충전, 내역테이블 ]
 */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "../../assets/css/payment.css";
import TokenRefresher from "../util/TokenRefresher";
import PointCharge from "./PointCharge";
import WithdrawGpay from "./WithdrawGpay";

const CardPoint = (props) => {
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleShowChargeModal = () => {
    setShowChargeModal(true);
  };

  const handleCloseChargeModal = () => {
    setShowChargeModal(false);
  };

  const handleShowWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
  };

  useEffect(() => {
    setUser(window.user);
  }, []);

  const [data, setData] = useState({
    nickName: "",
    accountNum: "",
    bankCodeStd: "",
    payBalance: "",
    // + 최근이용내역관련 data
  });

  useEffect(() => {
    TokenRefresher.post("http://localhost:8080/api/payment/payMgmt")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  if (props.tab === 0) {
    return (
      <>
        <Row
          className="basefont"
          style={{ justifyContent: "center", margin: "40px" }}
        >
          <div class="paycard">
            <div class="cardtop">
              {user && <scan>{user}</scan>}
              <br />
              <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
            </div>
            <div class="infos">
              <section class="card-number">
                <p className="paycardtext">Account Number</p>
                <h1 style={{ fontSize: "20px" }}>5495 9549 2883 2434</h1>
              </section>
              <div class="cardbottom">
                <aside class="infos--bottom">
                  <section>
                    <p className="paycardtext">Expiry date</p>
                    <h3 style={{ fontSize: "11px" }}>08/24</h3>
                  </section>
                  <section>
                    <p className="paycardtext">CVV</p>
                    <h3 style={{ fontSize: "11px" }}>748</h3>
                  </section>
                </aside>
                <aside>
                  <section>
                    <img
                      src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png"
                      class="cardbrand"
                    />
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </Row>

        <Row
          style={{
            margin: "auto",
            justifyContent: "center",
            flexWrap: "nowrap",
            textAlign: "center",
          }}
        >
          <span className="titleterms" style={{ textAlign: "center" }}>
            {user ? `🌿${user}🌿님의 그린페이` : "@@@"} 원
          </span>
        </Row>

        <Row
          style={{
            flexWrap: "nowrap",
            width: "50%",
            margin: "auto",
            marginBottom: "40px",
          }}
        >
          <button
            className="checkButton"
            style={{ width: "200px" }}
            onClick={handleShowChargeModal}
          >
            충전하기
          </button>

          <button
            className="backButton"
            style={{ width: "200px" }}
            onClick={handleShowWithdrawModal}
          >
            계좌송금
          </button>
        </Row>

        <PointCharge
          showModal={showChargeModal}
          handleCloseModal={handleCloseChargeModal}
        />
        <WithdrawGpay
          showModal={showWithdrawModal}
          handleCloseModal={handleCloseWithdrawModal}
        />

        {/* 포인트 내역 테이블 */}
        <TableContainer style={{ width: "80%", margin: "auto" }}>
          <Table stickyHeader="true" size="smaill" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" component="th">
                  최근 이용 내역
                </TableCell>
                <TableCell align="center" component="th">
                  구분아이콘
                  {/* (판매/구매/충전/환급) */}
                </TableCell>
                <TableCell align="center" component="th">
                  거래일시
                </TableCell>
                <TableCell align="center" component="th">
                  거래품목
                </TableCell>
                {/* 비고(후기작성/작성완료) */}
              </TableRow>
            </TableHead>

            <TableBody>
              <br /> <br /> <br /> <br /> <br />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default CardPoint;

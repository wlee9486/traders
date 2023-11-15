/**
 * @author heera youn
 * @create date 2023-10-24 10:12:21
 * @modify date 2023-10-28 17:53:06
 * @desc [충전 페이 비밀번호 입력창 구현 FE + CSS]
 */
/**
 * @author ahrayi
 * @create date 2022-10-23 03:45:27
 * @modify date 2023-10-25 15:56:08
 * @desc 페이비밀번호 입력창
 */

import React, { useEffect, useState } from "react";
import { Error, Warn } from "../util/Alert";

const PayPassword = ({ onCloseModal, setPayPwd, postAddPayMoney }) => {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (pin !== "") {
      setPayPwd(pin);
    }
  }, [pin, setPayPwd]);

  const addNumber = (number) => {
    setPin((prevPin) => prevPin + number);
  };

  const clearForm = () => {
    setPin("");
  };

  const submitForm = () => {
    if (pin === "") {
      Error("Enter a PIN");
    } else {
      clearForm(); // 처리 후 폼 초기화
      onCloseModal();
      postAddPayMoney();
      Warn("결제가 요청되었습니다! - " + pin);
    }
  };
  // 버튼 배열 생성
  const buttonLayout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["clear", 0, "enter"],
  ];

  return (
    <div>
      <form name="PINform" id="PINform" autoComplete="off">
        <input id="PINbox" type="password" value={pin} disabled />
        <br />
        <div>
          {buttonLayout.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((button, buttonIndex) => (
                <input
                  key={buttonIndex}
                  type="button"
                  className={`PINbutton ${
                    button === "enter"
                      ? "enter"
                      : button === "clear"
                      ? "clear"
                      : ""
                  }`}
                  value={
                    button === "enter"
                      ? "enter"
                      : button === "clear"
                      ? "clear"
                      : button
                  }
                  onClick={() =>
                    button === "enter"
                      ? submitForm()
                      : button === "clear"
                      ? clearForm()
                      : addNumber(button)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default PayPassword;

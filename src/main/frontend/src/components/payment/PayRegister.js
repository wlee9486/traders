/**
 * @author heera youn
 * @create date 2023-10-22 23:30:04
 * @modify date 2023-10-28 17:53:58
 * @desc [CSS 및 Toastify알림 추가]
 */
/**
 * @author ahrayi
 * @create date 2023-09-25 18:43:06
 * @modify date 2023-10-21 10:41:39
 * @modify date 2023-10-19 17:34:06
 * 그린페이 가입 프로세스
 */

import React, { useState } from "react";
import LoadingModal from "./LoadingModal";
import RegisterComplete from "./RegisterComplete";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";

import { Success } from "../util/Alert";
import TokenRefresher from "../util/TokenRefresher";

const PayRegister = () => {
  const [form, setForm] = useState({
    userName: "",
    userInfo: "",
    userGender: "",
    cellCarrier: "",
    userCellNo: "",
    agreeYn: "",
    agreeDtime: "",
    payPassword: "",
    inputAuthNum: "",
  });

  const {
    userName,
    userInfo,
    userGender,
    cellCarrier,
    userCellNo,
    agreeYn,
    agreeDtime,
    payPassword,
    inputAuthNum,
  } = form;

  const [authBtnFlag, setAuthBtnFlag] = useState(false);
  const [gpayPwd, setGpayPwd] = useState("");
  const [gpayPwd2, setGpayPwd2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function toggleAuthNumBtn() {
    setAuthBtnFlag(!authBtnFlag);
  }

  const onText = (evt) => {
    const { value, name } = evt.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [step, setStep] = useState(1);

  const onNext = () => {
    console.log(form);
    setStep((state) => state + 1);
  };
  const onPrev = () => {
    setStep((state) => state - 1);
  };

  function confirmGpayPwd() {
    console.log("gpayPwd :" + gpayPwd);
    console.log("gpayPwd2:" + gpayPwd2);

    if (gpayPwd.length === 6 && gpayPwd === gpayPwd2) {
      PayRegisterHandler();
    } else {
      onPrev();
    }
  }

  function getCurrentDtime() {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}${hour}${minutes}${seconds}`;
  }

  // 성별 판별
  function getGender() {
    if (userGender % 2 === 0) {
      return "F";
    } else {
      return "M";
    }
  }

  // 생년월일 처리
  function getBirth() {
    if (
      userGender == 1 ||
      userGender == 2 ||
      userGender == 5 ||
      userGender == 6
    ) {
      return "19" + userInfo;
    } else if (userGender == 9 || userGender == 0) {
      return "18" + userInfo;
    } else {
      return "20" + userInfo;
    }
  }

  // 인증문자 발송 요청
  const handleSendSms = () => {
    try {
      const smsRequest = {
        rphone: userCellNo,
      };
      TokenRefresher.post("http://localhost:8080/api/payment/sms", smsRequest) // 요청 본문을 객체로 감싸서 보냅니다.
        .then((Response) => {
          if (Response.status === 200) {
            toggleAuthNumBtn();
            Success("📩 문자 발송 성공");
            console.log(Response.data);
          } else {
            Error("❌ 문자 발송 실패");
            console.log("전송 요청 실패");
          }
        })
        .catch((error) => {
          console.error();
        });
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  // 문자인증 검증 요청
  const handleVerifySms = () => {
    try {
      const smsRequest = {
        rphone: userCellNo,
        inputAuthNum: inputAuthNum,
      };
      TokenRefresher.post(
        "http://localhost:8080/api/payment/verify-sms",
        smsRequest
      ).then((Response) => {
        if (Response.status === 200) {
          Success("📩 문자 인증 성공");
          onNext();
        } else if (Response.status === 208) {
          Error("❌ 문자 인증 실패");
          return;
        }
      });
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  // 계정등록 요청
  const PayRegisterHandler = async () => {
    setIsLoading(true);

    const apiUrl = "http://localhost:8080/api/payment/register";
    const gender = getGender();
    const birth = getBirth();

    try {
      const requestData = {
        userName: userName,
        userInfo: birth,
        userGender: gender,
        cellCarrier: cellCarrier,
        userCellNo: userCellNo,
        agreeYn: "Y",
        agreeDtime: getCurrentDtime(),
        payPassword: gpayPwd,
      };

      const response = await TokenRefresher.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("API 호출 실패"); // 에러 처리 보완
      }

      const responseData = response.data;
      console.log("API 응답:", responseData);
      setIsLoading(false); // 로딩 중지
      setStep(5);
    } catch (error) {
      console.error("API 호출 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingModal />}
      {step === 1 && (
        <RegisterStep1 form={form} onText={onText} onNext={onNext} />
      )}
      {step === 2 && (
        <RegisterStep2
          {...form}
          inputAuthNum={inputAuthNum}
          onText={onText}
          authBtnFlag={authBtnFlag}
          handleSendSms={handleSendSms}
          handleVerifySms={handleVerifySms}
        />
      )}
      {step === 3 && <RegisterStep3 onNext={onNext} setGpayPwd={setGpayPwd} />}
      {step === 4 && (
        <RegisterStep4
          onNext={onNext}
          gpayPwd2={gpayPwd2}
          setGpayPwd2={setGpayPwd2}
          confirmGpayPwd={confirmGpayPwd}
        />
      )}
      {step === 5 && <RegisterComplete />}
    </div>
  );
};

export default PayRegister;

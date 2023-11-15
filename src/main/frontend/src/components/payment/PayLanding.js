/**
 * @author ahrayi
 * @create date 2023-10-26 13:51:44
 * @modify date 2023-10-28 17:53:45
 */

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TokenRefresher from "../util/TokenRefresher";

const PayLanding = () => {
  const history = useHistory();

  useEffect(() => {
    TokenRefresher.get("http://localhost:8080/api/payment/payLanding")
      .then((response) => {
        console.log(response.data);
        toNextPage(response.data);
      })
      .catch((error) => {
        console.error("멤버등급 조회 실패", error);
      });
  }, []);

  function toNextPage(memGrade) {
    if (memGrade == 2) {
      history.push("/payment/myPay");
    } else if (memGrade == 1) {
      history.push("/payment/accnt");
    } else if (memGrade == 0) {
      history.push("/payment/payIntro");
    } else {
      history.push("/payment/payMgmt");
    }
  }
  return <div>Loading...</div>;
};

export default PayLanding;

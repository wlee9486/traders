/**
 * @author heera youn
 * @create date 2023-10-25 14:17:24
 * @modify date 2023-10-28 17:55:31
 * @desc [로딩페이지]
 */
import React from "react";
import planetload from "../../assets/img/planetload.png";
import { Background, LoadingText } from "../../assets/js/Styles";

export const OfficialLoading = () => {
  return (
    <Background>
      <LoadingText className="basefont">Loading...</LoadingText>
      <img src={planetload} alt="로딩중" width="10%" className="loadingimage" />
    </Background>
  );
};

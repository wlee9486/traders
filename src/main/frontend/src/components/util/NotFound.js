/**
 * @author hyunseul
 * @create date 2023-10-25 14:11:45
 * @modify date 2023-10-28 17:55:29
 * @desc [Error Page 제작]
 */
import React from "react";
import { Container } from "react-bootstrap";
import ErrorPage from "../../assets/img/ErrorPage.jpg";

const NotFound = () => {
  return (
    <Container style={{ width: "100%" }}>
      <img src={ErrorPage} style={{ margin: "auto", width: "100%" }} />
    </Container>
  );
};

export default NotFound;

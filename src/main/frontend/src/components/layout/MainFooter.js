/**
 * @author heera youn
 * @create date 2023-10-22 17:24:50
 * @modify date 2023-10-28 17:52:06
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:56
 * @modify date 2023-10-17 18:05:10
 */
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Footer.css";

const MainFooter = () => {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          copyright © Traders. All rights reserved
          <hr style={{ color: "white", height: "3px", margin: "10px" }} />
        </p>
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/sign-up">사이트소개&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="/sign-up">개인정보처리방침&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            <Link to="/sign-up">이용약관</Link>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>고객센터&nbsp;&nbsp;&nbsp;&nbsp;Traders@email.com</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainFooter;

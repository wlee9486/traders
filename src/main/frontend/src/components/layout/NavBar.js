/**
 * @author heera youn
 * @create date 2023-10-22 23:35:51
 * @modify date 2023-10-31 09:55:49
 * @desc [로고 회전 및 메뉴명 수정]
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:29:09
 * @modify date 2023-10-27 11:24:25
 */
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { PiUserPlusLight } from "react-icons/pi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../assets/css/NavBar.css";
import NavLogo1 from "../../assets/img/NavLogo1.png";

const NavBar = () => {
  const user = window.user;

  const history = useHistory();
  return (
    <div className="basefont">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav">
        <Container className="nav-container">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-menu me-auto">
              <NavDropdown
                title="거래"
                id="collapsible-nav-dropdown"
                style={{ marginRight: "0px" }}
              >
                <NavDropdown.Item className="item-nav" href="/products">
                  구매하기
                </NavDropdown.Item>

                <NavDropdown.Item
                  className="item-nav"
                  href="/products/register"
                >
                  판매하기
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/campaign">
                <span>캠페인</span>
              </Nav.Link>

              <NavDropdown
                title="마이페이지"
                id="collapsible-nav-dropdown"
                style={{ marginRight: "0px" }}
              >
                <NavDropdown.Item className="item-nav" href="/payment">
                  그린페이 충전/환급
                </NavDropdown.Item>

                <NavDropdown.Item className="item-nav" href="/mylikes">
                  나의 관심상품
                </NavDropdown.Item>

                <NavDropdown.Item className="item-nav" href="/myproducts">
                  내 등록물품
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item className="item-nav" href="/attendance">
                  출석체크 이벤트
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Navbar.Brand href="/" className="nav-logo">
              NewUs
              {/* <img src={NavLogo} className='nav-logo-img'/> */}
              <img src={NavLogo1} className="nav-logo-img" />
              Traders
            </Navbar.Brand>
            <Nav>
              {/* 로그인 상태에 따른 이름 출력 */}
              <div className="usernickname" style={{ marginTop: "11px" }}>
                <span style={{ color: "#167146", marginTop: "11px" }}>
                  {user ? <p>{user}님 안녕하세요!</p> : null}
                </span>
              </div>

              <NavDropdown
                title={<PiUserPlusLight style={{ fontSize: "23pt" }} />}
                id="collapsible-nav-dropdown"
                style={{ marginRight: "0px" }}
              >
                <NavDropdown.Item className="item-nav" href="/login">
                  로그인
                </NavDropdown.Item>
                <NavDropdown.Item className="item-nav" href="/signup">
                  회원가입
                </NavDropdown.Item>
                <NavDropdown.Item className="item-nav" href="/logout">
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;

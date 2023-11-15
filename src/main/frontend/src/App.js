import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import React from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./components/Notification";
import ChatBox from "./components/chat/ChatBox";
import ChatList from "./components/chat/ChatList";
import Elasticsearch from "./components/elasticsearch/Elasticsearch";
import MainFooter from "./components/layout/MainFooter";
import MainView from "./components/layout/MainView";
import NavBar from "./components/layout/NavBar";
import { TopButton, scrollToTop } from "./components/layout/PublicComponents";
import ResizedComponent from "./components/layout/ResizedComponent";
import Login from "./components/login/Login";
import { signout } from "./components/login/SignAPIService";
import SignUp from "./components/login/SignUp";
import Attendance from "./components/member/Attendance";
import MyLikes from "./components/member/MyLikes";
import MyProducts from "./components/member/MyProducts";
import Mypage from "./components/member/Mypage";
import RandomEvent from "./components/member/RandomEvent";
import AccountRegister from "./components/payment/AccountRegister";
import GreenPay from "./components/payment/GreenPay";
import PayLanding from "./components/payment/PayLanding";
import PayMgmt from "./components/payment/PayMgmt";
import PayRegister from "./components/payment/PayRegister";
import RegisterComplete from "./components/payment/RegisterComplete";
import TransferGpay from "./components/payment/TransferGpay";
import ProductDetails from "./components/product/ProductDetails";
import ProductListHeader from "./components/product/ProductListHeader";
import ProductRegistration from "./components/product/ProductRegistration";
import ProductUpdate from "./components/product/ProductUpdate";
import CampaignList from "./components/sns/CampaignList";
import NewsList from "./components/sns/NewsList";
import Youtube from "./components/sns/Youtube";
import PrivateRoute from "./components/util/PrivateRoute";
import "./styles/global.css";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo",
  },
});

function App() {
  const user = localStorage.getItem("REFRESH_TOKEN")
    ? jwt_decode(localStorage.getItem("REFRESH_TOKEN")).sub
    : null;
  window.user = user;
  console.log("Main User", user);
  return (
    <>
      <ResizedComponent>
        <NavBar user={user} />
        <Notification />
        {/* <MainView /> */}
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <RandomEvent />

          <Switch>
            <Route path={["/", "/main"]} exact>
              <MainView />
            </Route>

            <Route component={Login} path="/login" exact />

            <Route component={SignUp} path="/signup" exact />

            <Route component={signout} path="/logout" exact />

            <Route component={Elasticsearch} path="/search/:keyword" exact />

            <Route component={ProductListHeader} path="/products" exact />

            <Route component={(Youtube, NewsList)} path="/news" exact />

            <Route component={CampaignList} path="/campaign" exact />

            {/* 마이페이지 회원 관련 */}

            <PrivateRoute component={Attendance} path="/attendance" exact />

            <PrivateRoute component={Notification} path="/notification" />

            <PrivateRoute component={MyLikes} path="/mylikes" exact />

            <PrivateRoute component={MyProducts} path="/myproducts" exact />

            <PrivateRoute component={Mypage} path="/mypage" />

            {/* 물품 관련 */}

            <PrivateRoute
              component={ProductRegistration}
              path="/products/register"
              exact
            />
            <PrivateRoute
              component={ProductUpdate}
              path="/products/update/:id"
              exact
            />

            <PrivateRoute
              component={ProductDetails}
              path="/products/:id"
              exact
            />

            {/* 채팅 관련 */}

            <PrivateRoute
              component={ChatBox}
              path="/chat/roomNum/:roomNum"
              exact
            />

            <PrivateRoute component={ChatList} path="/chat/list" exact />

            {/* 결제 관련 */}

            <Route path="/payment" component={PayLanding} exact />
            <Route
              path="/payment/gpay_register"
              component={PayRegister}
              exact
            />
            <Route
              path="/payment/accnt_register"
              component={AccountRegister}
              exact
            />
            <Route path="/payment/myPay" component={PayMgmt} exact />
            <Route path="/payment/accnt" component={RegisterComplete} exact />
            <Route path="/payment/payIntro" component={GreenPay} exact />
            <Route
              path="/payment/transfer/:id"
              component={TransferGpay}
              exact
            />
          </Switch>
          <BsArrowUpCircle
            onClick={scrollToTop}
            type="button"
            className="public-bottombutton"
            size="50px"
          />
          <TopButton />
          <ChatList />
          <MainFooter />
        </ThemeProvider>
      </ResizedComponent>
    </>
  );
}

export default App;

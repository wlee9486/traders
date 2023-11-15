/**
 * @author heera youn
 * @create date 2023-10-21 20:18:24
 * @modify date 2023-10-28 17:52:57
 * @desc [마이페이지 탭분리, FE]
 */
import React, { useState } from "react";

import CardPoint from "./CardPoint";
import MyLikes from "./MyLikes";
import MyPageTab from "./MyPageTab";
import MyProducts from "./MyProducts";

const Mypage = ({ user }) => {
  const [tab, setTab] = useState(0); //탭 상태관리 변수

  return (
    <div>
      <MyPageTab tab={tab} setTab={setTab} />
      <TabContent tab={tab} />
      <CardPoint user={user} />
      <MyLikes />
      <MyProducts />
    </div>
  );
};

function TabContent(props) {
  if (props.tab === 0) {
    return <CardPoint tab={props.tab} />;
  } else if (props.tab === 1) {
    return <MyLikes tab={props.tab} />;
  } else if (props.tab === 2) {
    return <MyProducts tab={props.tab} />;
  } else if (props.tab === 3) {
    return <div> 출석체크 </div>;
  }
}

export default Mypage;

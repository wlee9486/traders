/**
 * @author heera youn
 * @create date 2023-10-25 14:38:18
 * @modify date 2023-10-28 17:52:16
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:29:09
 * @modify date 2023-10-27 11:24:25
 */
import React from "react";
import "../../styles/global.css";
import MainCarousel from "./MainCarousel";
import MainImg from "./MainImg";
import MainNews from "./MainNews";
import ResizedComponent from "./ResizedComponent";

const MainView = () => {
  return (
    <div className="basefont">
      <body>
        <div>
          <ResizedComponent>
            <MainCarousel />
            <MainImg />
            <MainNews />
          </ResizedComponent>
        </div>
      </body>
    </div>
  );
};
export default MainView;

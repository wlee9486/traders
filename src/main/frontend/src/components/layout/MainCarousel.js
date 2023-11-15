/**
 * @author heera youn
 * @create date 2023-10-22 23:36:29
 * @modify date 2023-10-28 17:52:03
 * @desc [Carousel 이미지 배치 추가]
 */
/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:56
 * @modify date 2023-10-21 18:49:35
 */

import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../assets/css/MainCarousel.css";
import main2 from "../../assets/img/main2.jpg";
import main3 from "../../assets/img/main3.jpg";
import MainTop from "./MainTop";

const MainCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <MainTop />
      </Carousel.Item>

      <Carousel.Item>
        <img src={main2} className="carousel-inner-1" />
      </Carousel.Item>

      <Carousel.Item>
        <img src={main3} className="carousel-inner-1" />
      </Carousel.Item>
    </Carousel>
  );
};

export default MainCarousel;

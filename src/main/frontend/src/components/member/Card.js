/**
 * @author heera youn
 * @create date 2023-10-23 23:22:21
 * @modify date 2023-10-28 17:52:45
 */
import React, { useEffect, useRef, useState } from "react";

function Card() {
  const constrain = 200;
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState([0, 0]);

  useEffect(() => {
    const cardLayer = cardRef.current;

    function transforms(x, y, el) {
      const box = el.getBoundingClientRect();
      const calcX = -(y - box.y - box.height / 1) / constrain;
      const calcY = (x - box.x - box.width / 1) / constrain;

      return `perspective(50px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    }

    function transformElement(el, xyEl) {
      el.style.transform = transforms.apply(null, xyEl);
    }

    function handleMouseMove(e) {
      const xy = [e.clientX, e.clientY];
      const position = xy.concat([cardLayer]);
      transformElement(cardLayer, position);
      setMousePosition(xy);
    }

    cardLayer.style.transition = "transform 0.3s ease-out";

    cardLayer.addEventListener("mousemove", handleMouseMove);

    return () => {
      cardLayer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={cardRef}>
      <div className="card">{/* Your card content */}</div>
    </div>
  );
}

export default Card;

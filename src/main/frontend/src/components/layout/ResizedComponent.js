/**
 * @author hyunseul
 * @create date 2023-10-17 16:29:09
 * @modify date 2023-10-28 17:52:24
 */
import React, { useEffect, useState } from "react";

const ResizedComponent = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? "mobile-layout" : "desktop-layout"}>
      {/* ... */}
      {children}
    </div>
  );
};

export default ResizedComponent;

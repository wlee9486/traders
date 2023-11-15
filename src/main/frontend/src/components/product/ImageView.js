/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-30 11:06:56
 * @desc [페이지 전체 템플릿 css]
 */
/**
 * @author wheesunglee
 * @create date 2023-10-17 00:06:52
 * @modify date 2023-10-27 14:56:06
 */

import { useEffect, useState } from "react";

const ImageView = ({ imageList }) => {
  const [main, setMain] = useState({});

  useEffect(() => {
    if (imageList && imageList.length > 0) {
      setMain(imageList[0]);
    }
  }, [imageList]);

  const onView = (index) => {
    setMain(imageList[index]);
  };

  return (
    <div className="basefont" style={{ marginLeft: "1.5rem" }}>
      {main && (
        <img
          src={`http://localhost:8080${main.filepath}`}
          style={{
            width: "250px",
            height: "280px",
            maxWidth: "250px",
            maxHeight: "280px",
            objectFit: "contain",
            backgroundColor: "#fff",
          }}
        />
      )}
      {imageList.map((image, index) => (
        <li
          className="justify-content-space-between"
          style={{ display: "inline-block" }}
          key={index}
          onClick={() => onView(index)}
        >
          <img
            src={`http://localhost:8080${image.filepath}`}
            style={{
              width: "80px",
              height: "60px",
              maxWidth: "80px",
              maxHeight: "60px",
              objectFit: "contain",
              backgroundColor: "#fff",
            }}
          />
        </li>
      ))}
    </div>
  );
};

export default ImageView;

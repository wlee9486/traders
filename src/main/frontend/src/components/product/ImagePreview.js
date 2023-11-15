/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-28 17:54:29
 * @desc [페이지 전체 템플릿 css]
 */
/**
 * @author wheesunglee
 * @create date 2023-10-06 10:16:27
 * @modify date 2023-10-27 14:56:01
 */
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImagePreview = ({ files, deleteFile }) => {
  const [preview, setPreview] = useState([]);

  let imageUrlLists = [];
  useEffect(() => {
    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setPreview(imageUrlLists);
  }, [files]);

  const deletePreview = (indexToDelete) => {
    setPreview(preview.filter((_, index) => index !== indexToDelete));
    deleteFile(indexToDelete);
  };

  // 한 행에 3개의 이미지가 들어가도록 맵핑합니다.
  const rows = [];
  for (let i = 0; i < preview.length; i += 3) {
    rows.push(
      <Row key={i}>
        {preview.slice(i, i + 3).map((image, index) => (
          <Col sm={4} key={index}>
            <div className="square-box">
              <img src={image} width={250} height={250} className="img-pre" />
            </div>
            <AiOutlineCloseCircle
              onClick={() => deletePreview(i + index)}
              className="delete-btn"
            >
              취소
            </AiOutlineCloseCircle>
          </Col>
        ))}
      </Row>
    );
  }

  return <Container>{rows}</Container>;
};

export default ImagePreview;

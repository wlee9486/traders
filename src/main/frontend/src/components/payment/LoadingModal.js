/**
 * @author heera youn
 * @create date 2023-10-22 01:45:55
 * @modify date 2023-10-28 17:53:38
 * @desc [Loading Page CSS 및 애니메이션 이펙트]
 */

import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const LoadingModal = () => {
  return (
    <Modal show={true} centered backdrop="static">
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="success" role="status" />
          <span className="sr-only">계정 가입 중...</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;

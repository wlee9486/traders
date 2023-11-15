/**
 * @author hyunseul
 * @create date 2023-10-17 16:30:19
 * @modify date 2023-10-28 17:51:39
 */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../assets/css/ChatMapModal.css";

import ScheduleDatePicker from "./ScheduleDatePicker";

import ChatMap from "./ChatMap";

const ChatScheduleModal = ({ show, handleClose, onsave }) => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isMapModalVisible, setMapModalVisible] = useState(false);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleLocationFieldClick = () => {
    if (isMapModalVisible) {
      setMapModalVisible(false);
    } else {
      setMapModalVisible(true);
    }
  };

  const handleSaveClick = () => {
    onsave({ date, location });
    handleClose();
  };

  const handleDatePickerClick = () => {
    if (isMapModalVisible) {
      setMapModalVisible(false);
    } else {
      setMapModalVisible(true);
    }
  };

  const handleCloseMapModal = () => {
    setMapModalVisible(false);
  };

  const handleAddressChange = (newAddress) => {
    setLocation(newAddress);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100 title">
          <b>거래 일정 잡기</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3 label"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>날짜 및 시간</Form.Label>
            <ScheduleDatePicker
              onChange={handleDateChange}
              onClick={handleDatePickerClick}
              onClose={handleCloseMapModal}
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3 label"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>거래 장소 선택</Form.Label>
            <Form.Control
              type="text"
              placeholder="거래 장소를 선택하세요."
              value={location}
              className="form-control react-datepicker"
              onClick={handleLocationFieldClick}
              readOnly
            />
            {isMapModalVisible && (
              <ChatMap onAddressChange={handleAddressChange} />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="cancelButton-1" onClick={handleClose}>
          취소
        </Button>
        <Button className="saveButton-1" onClick={handleSaveClick}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatScheduleModal;

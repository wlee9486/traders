/**
 * @author hyunseul
 * @create date 2023-10-24 19:13:49
 * @modify date 2023-10-30 11:21:42
 * @desc [카카오 지도 api + css]
 */
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import "../../assets/css/ProductRegistration.css";

const ProductMap = ({ onMapSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0.0,
    lng: 0.0,
  });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const markerRef = useRef(null);
  const KAKAOMAP_API_KEY = process.env.REACT_APP_KAKAOMAP_API_KEY;

  useEffect(() => {
    let script;
    if (modalVisible) {
      script = document.createElement("script");
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;

      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };
    }

    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [modalVisible]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });
      });
    }
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const initializeMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      ),
      level: 3,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);

    const newMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      ),
      draggable: true,
    });

    newMarker.setMap(newMap);
    setMarker(newMarker);
    markerRef.current = newMarker; // Set markerRef after the marker is initialized

    window.kakao.maps.event.addListener(
      newMarker,
      "dragend",
      handleMarkerDragEnd
    );
  };

  const handleMarkerDragEnd = () => {
    if (markerRef.current) {
      const newPosition = markerRef.current.getPosition();
      const newLocation = {
        lat: newPosition.getLat(),
        lng: newPosition.getLng(),
      };
      setCurrentLocation(newLocation);
    }
  };

  const handleSubmit = () => {
    onMapSubmit(currentLocation);
    closeModal();
  };

  return (
    <>
      <button
        className="btn-upload"
        style={{
          backgroundColor: "#fff",
          width: "150px",
          fontSize: "12pt",
          position: "relative",
          top: "0px",
        }}
        onClick={openModal}
      >
        거래 장소 선택
      </button>
      <Modal show={modalVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>거래 장소 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </Modal.Body>
        <Modal.Footer>
          <button className="cancelButton-1" onClick={closeModal}>
            취소
          </button>
          <button className="saveButton-3" onClick={handleSubmit}>
            확인
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductMap;

/**
 * @author wheesunglee
 * @create date 2023-10-22 00:24:58
 * @modify date 2023-10-28 17:52:42
 */
/**
 * @author hyunseul
 * @create date 2023-10-22 13:02:02
 * @modify date 2023-10-24 00:32:49
 */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import attendance from "../../assets/img/attendance.jpg";
import newus1 from "../../assets/img/newus1.png";
import newus2 from "../../assets/img/newus2.png";
import newus3 from "../../assets/img/newus3.png";
import newus4 from "../../assets/img/newus4.png";
import newus5 from "../../assets/img/newus5.png";
import { Error, Success } from "../util/Alert";
import TokenRefresher from "../util/TokenRefresher";

const Attendance = () => {
  const user = window.user;
  const currentDay = new Date().getDay() - 1;
  const [weekly, setWeekly] = useState([]);
  const [daily, setDaily] = useState(false);

  const getWeekly = () => {
    TokenRefresher.get("http://localhost:8080/api/redis/weekly").then((res) => {
      setWeekly(res.data);
    });
  };

  const handleAttendance = (index) => {
    if (index !== currentDay) {
      Error("오늘만 출첵 가능");
      return;
    }
    TokenRefresher.post("http://localhost:8080/api/redis/attendance").then(
      (res) => {
        console.log(res.data);
        Success(res.data);
      }
    );
    setDaily(true);
    getWeekly();
  };

  useEffect(() => {
    getWeekly();
  }, []);

  const images = {
    Monday: newus1,
    Tuesday: newus2,
    Wednesday: newus3,
    Thursday: newus4,
    Friday: newus5,
  };

  const rowStyle = {
    width: "850px",
    backgroundImage: `url(${attendance})`, // 배경 이미지 설정
    backgroundSize: "cover", // 이미지가 container를 완전히 덮도록 설정
    position: "relative", // 다른 요소를 위치시키기 위해 position 설정
    height: "700px",
    marginTop: "180px",
  };

  return (
    <>
      <Container style={rowStyle}>
        <Row
          style={{
            margin: "auto",
            width: "780px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {Object.keys(images).map((day, index) => (
            <Col key={day} style={{ marginTop: "550px", textAlign: "center" }}>
              <img
                width={90}
                height={100}
                src={images[day]}
                alt={day}
                style={{
                  filter: weekly[index] ? "none" : "grayscale(100%)",
                }}
                onClick={() => handleAttendance(index)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default Attendance;

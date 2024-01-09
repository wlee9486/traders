# 🍃 Traders, 기후 위기에 대응하고자 하는 마음이 행동으로 이어지도록
아이티윌 자바 핀테크 양성과정 파이널 프로젝트
<br/>
<br/>

## ✨ 프로젝트 소개
### New Earth, New Us, Traders
- Traders는 인근 지역 사람들 간의 직거래 활성화를 유도하는 **중고 거래 플랫폼** 사이트입니다.
- 유저 간 **실시간 채팅**을 통해 자원 순환형 환경친화적 거래 'ECO-TRADE'를 선도합니다.
- 온라인 거래 특성 상 발생하는 택배 거래에 수반되는 **불필요한 자원 낭비**를 **지양**하는 것을 목적으로 합니다.
<br/>
<br/>

## ⏰ 개발 기간
2023년 9월 7일 ~ 2023년 10월 31일(55일)
<br/>
<br/>

## 📚 기술 스택
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![ElasticSearch](https://img.shields.io/badge/-ElasticSearch-005571?style=for-the-badge&logo=elasticsearch)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
<br/>
<br/>

## 📑 DB 구조
### 📃 Oracle
![ERD](./images/erd_f.png)
### 📃 MongoDB
<img src="./images/schema.png" width="300" />
<br/>
<br/>

## 🖥️ 핵심기능
### 📌 회원가입/로그인
- Spring Security + JWT 토큰을 이용한 회원가입 / 로그인 구현
- SMTP를 이용 이메일 인증번호 발송 기능 구현
- react hook form 이용 유효성 검사 구현
- interceptors 이용 자동 토큰 만료 상태 검사 및 Refresh 토큰 재발급 구현
- Redis에 Refresh 토큰 저장
  ![회원가입/로그인](./images/register.png)
### 📌 실시간 채팅
- SSE 서버로 실시간 채팅 메시지 구현
- MongoDB로 사용자 정보와 채팅 메시지 저장
- 카카오 지도 API 이용 맵 구현
![실시간 채팅](./images/chat.png)
### 📌 통합검색
- Logstash를 이용하여 Oracle DB와 연동
- Nori tokenizer 한글 형태소 분석기 사용
- ElasticSearch를 이용한 물품 검색 기능 구현
![통합검색](./images/search.png)
### 📌 물품
- JPA repository를 이용한 crud 구현
- 카카오 지도 API 이용 맵 구현
![물품 등록](./images/products.png)
- Redis를 이용한 찜 기능 구현
![물품 조회](./images/list.png)
### 📌 마이페이지
- 그린페이 충전 및 송금
![그린페이](./images/pay.png)
- Redis를 이용한 출석체크 이벤트
![출석체크](./images/attendance.png)
- 내가 찜한 물품 조회
- 내가 등록한 물품 조회
<br/>
<br/>

## 👩‍💻 멤버 구성
| 이름            | 담당                       |
| -------------- | -------------------------- | 
| 이휘성(팀장)| 물품 CRUD / 통합검색 / 실시간 알림 / 찜 기능 / 출석체크 이벤트 BE / Refresh Token Redis 저장 / 랜덤 포인트 이벤트 BE|
| 강현슬| 실시간 채팅 / 출석체크 이벤트 FE / 카카오 지도 API 이용 맵 구현 / 웹 사이트 전체 및 상세 FE + CSS|
| 윤희라| 회원가입 및 로그인 / 마이페이지 / 랜덤 포인트 이벤트 FE / 웹 사이트 전체 및 상세 FE + CSS|
| 이아라| Mock Server 이용한 그린페이|
| 정예림| 캠페인|




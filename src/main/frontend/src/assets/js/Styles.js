/*
 * @author heera youn
 * @create date 2023-10-22 23:36:29
 * @modify date 2023-10-28 17:51:13
 * [로딩페이지 java script]
 */
import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

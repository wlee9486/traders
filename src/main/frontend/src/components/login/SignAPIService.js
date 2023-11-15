/**
 * @author heera youn
 * @create date 2023-10-14 00:53:26
 * @modify date 2023-10-28 17:52:32
 * @desc [회원가입 및 로그인 관련 API]
 */
import { Error, Success } from "../util/Alert";
import TokenRefresher from "../util/TokenRefresher";

let backendHost;
const hostname = window && window.location && window.location.hostname;
if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}
export const API_BASE_URL = `${backendHost}`;

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
    body: JSON.stringify(request),
  };

  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        Success("🎉 회원가입 성공");
        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      }
    })
    .catch((error) => {
      console.log(error.sta);
      if (error.status === 403 || error.status === 400) {
        // window.location.href = "/login";
        Error("❌ 회원가입 중 오류발생");
        return Promise.reject(error);
      }
    });
}

export function signin(userRequestDTO) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return TokenRefresher.post(`${API_BASE_URL}/api/auth/login`, userRequestDTO, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200 && response.data) {
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", response.data.refreshToken);
        Success("🎉 로그인 성공");
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.log("error: " + error);
        Error("❌ 비밀번호를 확인해주세요");
      } else {
        console.log("error: " + error);
      }
    });
}

export function signout() {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  window.location.href = "/";
}

export function signup(userDTO) {
  console.log(userDTO);
  return call("/api/auth/signup", "POST", userDTO);
}

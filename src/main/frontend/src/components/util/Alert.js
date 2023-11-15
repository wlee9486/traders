/**
 * @author heera youn
 * @create date 2023-10-22 23:37:22
 * @modify date 2023-10-28 17:55:23
 * @desc [전역적으로 사용하기 위한 알림 기능]
 */
import { toast } from "react-toastify";

export const Success = (alertText) => {
  toast.success(`${alertText}`, {
    position: "top-right",
    autoClose: 1500,
  });
  return;
};

export const Warn = (alertText) => {
  toast.warn(`${alertText}`, {
    position: "top-right",
    autoClose: 1500,
  });
  return;
};

export const Error = (alertText) => {
  toast.error(`${alertText}`, {
    position: "top-right",
    autoClose: 2000,
  });
  return;
};

export const toastAlert = (alertText) => {
  toast(`${alertText}`, {
    position: "top-right",
    autoClose: 1300,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

/**
 * @author heera youn
 * @create date 2023-10-22 23:31:56
 * @modify date 2023-10-28 17:52:36
 * @desc [기능구현, FE 유효성 검사 및 Toastify, css 구현]
 */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Grid, Link, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import * as yup from "yup";
import "../../styles/global.css";
import { CustomTextField } from "../../styles/styles.js";
import JoinTerms from "../member/JoinTerms";
import { Error, Success, Warn } from "../util/Alert";
import { signup } from "./SignAPIService";

// ErrorMessage 컴포넌트 정의
const ErrorMessage = ({ message }) => (
  <p style={{ color: "#f00", lineHeight: 1.4 }}>{message}</p>
);

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "닉네임은 최소 2글자 이상입니다!")
    .max(5, "닉네임은 최대 5글자입니다!")
    .matches(
      /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
    )
    .required("닉네임을 입력해주세요"),
  email: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")

    /* 이메일중복체크 */
    .test(
      "unique-email",
      "이미 사용중인 이메일 입니다.",
      async function (value) {
        if (value) {
          const response = await fetch(
            `http://localhost:8080/api/auth/signup/emailCheck?email=${value}`
          );
          if (!response.ok) {
            throw new yup.ValidationError(
              "이미 사용중인 이메일 입니다",
              value,
              "email"
            );
          }
        }
        return true;
      }
    )
    .required("이메일을 필수로 입력해주세요."),
  password: yup
    .string()
    .min(3, "비밀번호를 3~16글자로 입력해주세요.")
    .max(16, "비밀번호를 3~16글자로 입력해주세요.")
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
      "비밀번호에 영문, 숫자, 특수문자를 포함해주세요."
    )
    .required("비밀번호를 필수로 입력해주세요."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    reset,
    setError,
    form,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  // console.log(watch());//유저입력값 실시간 콘솔 보기
  const username = watch.username;

  // 추가된 상태 값
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [showEmailNumber, setShowEmailNumber] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [allAgreed, setAllAgreed] = useState(false);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    signup({ email, username, password })
      .then((response) => {
        // window.location.href="/login";
        console.log("data" + data);
      })
      .catch((error) => {
        console.error("Signup error: ", error);
      });
    console.log("data" + data);
    reset();
  };

  /* 닉네임 중복 체크 */
  const NicknameCheck = async (e) => {
    e.preventDefault();
    const { username } = watch();
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/signup/nameCheck?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        Success("사용가능한 닉네임입니다.");
      } else if (response.status === 409) {
        Warn("이미 사용중인 아이디입니다.");
      } else {
        console.log(response.statusText + "응답데이터");
        Error("사용 불가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  /* 이메일 인증 */
  const handleSendNumberClick = async () => {
    if (isVerificationCodeSent) {
      // 이미 인증 코드가 전송되었을 경우에는 무시
      return;
    }
    setShowEmailNumber(true); // "이메일 인증번호" 입력 필드를 표시
    // sendVerificationCode();
  };

  //이메일 코드 전송하기
  const sendVerificationCode = async () => {
    const emailValue = watch("email");
    if (emailValue.length == 0) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/signup/email?email=${emailValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "applicaion/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.text();
        setConfirmationCode(data);
        setIsVerificationCodeSent(true);
        setShowEmailNumber(true); //인증번호 입력창 보이게 하기 위함
        console.log(response);
        console.log(data);
        Success("📩 인증번호 발송");
      } else {
        console.error("Error sending verification code");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  //검증
  const confirmNumber = () => {
    const enteredVerificationCode = watch("emailnumber");
    if (enteredVerificationCode === confirmationCode) {
      Success("✅인증되었습니다");
    } else {
      Error("❌번호가 다릅니다");
    }
  };

  // render() {
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "250px" }}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: "30px",
                textAlign: "center",
                fontWeight: "bold",
              }}
              component="h1"
              variant="h5"
            >
              계정 생성
            </Typography>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      className="customTextField"
                      autoComplete="fname"
                      variant="outlined"
                      required
                      fullWidth
                      bordercolor="green"
                      id="username"
                      label="닉네임"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <button className="checkButton" onClick={NicknameCheck}>
                  중복체크
                </button>
              </Grid>
            </Grid>
            {errors.username && (
              <ErrorMessage message={errors.username.message} />
            )}
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      autoComplete="email"
                      variant="outlined"
                      required
                      fullWidth
                      bordercolor="green"
                      id="email"
                      label="이메일 주소"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                {/* <button onClick={()=> {handleSendNumberClick(); sendVerificationCode();}}>{isVerificationCodeSent ? "재전송": "인증번호"}</button> */}
                <button className="checkButton" onClick={sendVerificationCode}>
                  {isVerificationCodeSent ? "재전송" : "인증번호"}
                </button>
              </Grid>
            </Grid>
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: showEmailNumber ? "block" : "none" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <Controller
                  name="emailnumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      autoComplete="emailnumber"
                      variant="outlined"
                      required
                      fullWidth
                      bordercolor="green"
                      id="emailnumber"
                      label="이메일 인증번호"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <button className="checkButton" onClick={confirmNumber}>
                  이메일인증
                </button>
              </Grid>
            </Grid>
            {errors.emailnumber && (
              <ErrorMessage message={errors.emailnumber.message} />
            )}
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <CustomTextField
                    autoComplete="current-password"
                    variant="outlined"
                    required
                    fullWidth
                    bordercolor="green"
                    name="password"
                    label="패스워드"
                    type={hidePassword ? "text" : "password"}
                    autoFocus
                    {...field}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "16px",
                      transform: "translateY(-50%)",
                    }}
                    onClick={toggleHidePassword}
                  >
                    <PiEyeBold />
                  </div>
                </div>
              )}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <CustomTextField
                    autoComplete="confirmPassword"
                    id="confirmPassword"
                    variant="outlined"
                    required
                    fullWidth
                    bordercolor="green"
                    name="confirmPassword"
                    label="패스워드 확인"
                    type={hidePassword ? "password" : "text"}
                    autoFocus
                    {...field}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "16px",
                      transform: "translateY(-50%)",
                    }}
                    onClick={toggleHidePassword}
                  >
                    <PiEyeClosedBold />
                  </div>
                </div>
              )}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </Grid>

          <Grid item xs={12}>
            <JoinTerms allAgreedState={setAllAgreed} />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="saveButton"
              type="submit"
              fullWidth
              variant="contained"
              disabled={!allAgreed}
            >
              계정 생성
            </Button>
          </Grid>

          <Grid container justify-content="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className="necessarytext">
                이미 계정이 있습니까? 로그인 하세요.
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;

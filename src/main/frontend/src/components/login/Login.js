/**
 * @author heera youn
 * @create date 2023-10-23 23:22:54
 * @modify date 2023-10-28 17:52:29
 * @desc [로그인 BE,FE 연결 + Refresh Token 적용, 유효성 검사 등]
 */
import { Container, Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import "../../styles/global.css";
import { CustomTextField } from "../../styles/styles";
import { signin } from "./SignAPIService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signin({ email, password });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "250px" }}>
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
            로그인
          </Typography>
          <br />
        </Grid>
        <br />
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일을 입력하세요"
              name="email"
              autoComplete="email"
              bordercolor="green"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="비밀번호 설정"
              type="password"
              id="password"
              bordercolor="green"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="saveButton"
              type="submit"
              fullWidth
              variant="contained"
            >
              로그인
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
            <Link className="necessarytext" href="/signup" variant="body2">
              <Grid item>계정이 없으신가요? 회원가입</Grid>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;

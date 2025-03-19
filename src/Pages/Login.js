// Login.js
// 로그인 페이지

import React, { useContext, useState } from "react";
import { Authstate } from "../Common/Authstate";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAPI from "../Hooks/useAPI";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background: #3A3D4A;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;
const Logo = styled.img`
  position: absolute;
  width: 180px;
  height: auto;
  top: 20%;
  left:50%;
  margin-bottom: 20px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 600;
`;

const Input = styled.input`
  width: calc(100% - 24px);
  max-width: 300px; 
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #55586A;
  background: #2D2F3C;
  border-radius: 8px;
  font-size: 16px;
  color: #ffffff;
  outline: none;

  &:focus {
    border-color: #4A90E2;
    box-shadow: 0 0 5px #4A90E2;
  }
`;

const Button = styled.button`
  width: 60%;
  padding: 12px;
  background: #4A90E2;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;

  &:hover {
    background: #357ABD;
  }
`;

const SignupLink = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #A0A0A0;

  a {
    color: #4A90E2;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
      text-decoration: underline;
      color: #5AA9F1;
    }
  }
`;



const Login = () => {
  const { login } = useContext(Authstate);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { data, fetchData } = useAPI();

  const loginSuccess = (data) => {
    if (data.data) {
      localStorage.setItem("token", data.data);
      console.log("토큰:", data.data);
    }

    login({username:username, token:data.data});
    console.log("로그인 성공:", data);
    alert("로그인 성공!");
    navigate("/Main"); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetchData("auth/login", "POST", { username, password }, null, "로그인 요청");
    if (data && data.success) {
      loginSuccess(data);
    } else {
      alert("로그인 실패");
    }
  }

  return (
    <>
      <Logo src="/logo.png" alt="Todotrio Logo"/>
      <Wrapper>
        <LoginBox>
          <Title>로그인</Title>
          <Form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">로그인</Button>
          </Form>
          <SignupLink>
            계정이 없나요? <Link to="/Signup">회원가입</Link>
          </SignupLink>
        </LoginBox>
      </Wrapper>

    </>
  );
};

export default Login;

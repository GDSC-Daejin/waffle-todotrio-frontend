// Signup.js
// 회원가입 페이지

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAPI from "../Hooks/useAPI";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupBox = styled.div`
  background: #3a3d4a;
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
  top: 16%;
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
  border: 1px solid #55586a;
  background: #2d2f3c;
  border-radius: 8px;
  font-size: 16px;
  color: #ffffff;
  outline: none;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 5px #4a90e2;
  }
`;

const Button = styled.button`
  width: 60%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;

  &:hover {
    background: #357abd;
  }
`;

const LoginLink = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #a0a0a0;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
      text-decoration: underline;
      color: #5aa9f1;
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { data, fetchData } = useAPI();

  const handleSignup = async (e) => {
    e.preventDefault();

    await fetchData("auth/signup", "POST", { username, password, email }, null, "회원가입 요청");
    if (data && data.success) {
      console.log("회원가입 성공:", data);
      alert("회원가입이 완료!");
      navigate("/");
    } else {
      alert("회원가입 실패")        
    }
  }

  return (
    <>
      <Logo src="/logo.png" alt="Todotrio Logo"/>
      <Wrapper>
        <SignupBox>
          <Title>회원가입</Title>
          <Form onSubmit={handleSignup}>
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
            <Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">회원가입</Button>
          </Form>
            <LoginLink>
              이미 계정이 있나요? <Link to="/">로그인</Link>
            </LoginLink>
        </SignupBox>
      </Wrapper>    
    </>




  );
};

export default Signup;

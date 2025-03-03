// Login.js
// 로그인 페이지

import React, { useContext, useState } from "react";
import { Authstate } from "../Common/Authstate";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import logo from "../../Styles/logo.png";

const Wrapper = styled.div`
  // position:relative;
  // height:100%;
  // width:100%;

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("로그인 성공:", data);

      if (!data.success) {
        throw new Error("로그인 실패");
      }

      // 토큰 저장 (백엔드에서 토큰을 제공할 경우)
      if (data.data) {
        localStorage.setItem("token", data.data);
        console.log("토큰:",data.data);
      }

      if(data.success){
        login({username:username, token:data.data});
      }
      alert("로그인 성공!");

      navigate("/Main");

    } catch (err) {
      console.error("로그인 오류:", err);
      setError("로그인에 실패했습니다.");
    }
  };

  return (
    <>
      <img src="/logo.png" alt="Todotrio Logo" style={{position:'absolute',width:'200px', height:'auto', top:'10%', left:'50%'}}/>
      {/* <Wrapper>
        <LoginBox>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <LoginForm onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">로그인</button>
            <span>
              <Link to="/Signup" style={{color:"white",display:'block'}}>회원가입</Link>            
            </span>
          </LoginForm>          
        </LoginBox>

      </Wrapper> */}
      <Wrapper>
        <LoginBox>
          <Title>로그인</Title>
          {error && <p style={{ color: "red" }}>{error}</p>}
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

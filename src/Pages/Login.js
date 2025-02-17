// Login.js
import React, { useContext, useState } from "react";
import { Authstate } from "../Common/Authstate";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position:relative;
  height:100%;
  width:100%;
`;

const LoginForm = styled.form`
  height:200px;
  width:300px;
  background-color: pink;
  left:50%;
  top:300px;
  transform: translate(-50%, 0);
  position: absolute;
  padding:20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input{
    display: block;
    margin:10px;
    padding: 10px;
  }
  
  button {
    padding: 10px;
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
      <h2>로그인</h2>
      <Wrapper>
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
        </LoginForm>
        
      </Wrapper>

      {/* 임시 내비게이션 바 */}
      <div style={{position:'absolute', bottom:'10px'}}>
        <Link to="/Signup" style={{color:"white",display:'block'}}>회원가입</Link>
        <Link to="/Dashboard" style={{color:"white",display:'block'}}>대쉬보드</Link>
        <Link to="/Teams" style={{color:"white",display:'block'}}>팀 정보</Link>
        <Link to="/User" style={{color:"white",display:'block'}}>회원정보</Link>
      </div>

    </>
  );
};

export default Login;

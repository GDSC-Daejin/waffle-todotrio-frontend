// Login.js
import React, { useContext, useState } from "react";
import { Authstate } from "../Common/Authstate";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {login} = useContext(Authstate);
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
    <div>
      <h2>로그인</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
      </form>
      <Link to="/Signup" style={{color:"white", textDecoration:"none"}}>회원가입</Link>
    </div>
  );
};

export default Login;

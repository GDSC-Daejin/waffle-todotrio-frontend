// Signup.js
import React, { useState } from "react";
import { Authstate } from "../Common/Authstate";
import { Link } from "react-router-dom";

const Signup = () => {
  // console.log(process.env.REACT_APP_API_BASE_URL);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

    // 응답 상태 코드 확인
    console.log("응답 상태 코드:", response.status);

    // 응답 본문 확인
    const data = await response.json();
    console.log("응답 본문:", data);

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      console.log("회원가입 성공:", data);
      alert("회원가입이 완료되었습니다!");
    } catch (err) {
      console.error("회원가입 오류:", err);
      setError("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
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
        <input
          type="text"
          placeholder="이메일"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
      <Link to="/" style={{color:"white", textDecoration:"none"}}>이미 계정이 있나요?</Link>
    </div>
  );
};

export default Signup;

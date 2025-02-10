// ---------------------------------------------------------//
// Signup.js
// ---------------------------------------------------------//
import React, { useState } from "react";

// const Signup = () => {
    console.log("API BASE URL:", process.env.VITE_API_BASE_URL);
  const API_BASE_URL = process.env.VITE_API_BASE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      const data = await response.json();
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};



// ---------------------------------------------------------//
// ---------------------------------------------------------//
// ---------------------------------------------------------//

// ---------------------------------------------------------//
// Login.js
// ---------------------------------------------------------//
import React, { useState } from "react";

// const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      // 토큰 저장 (백엔드에서 토큰을 제공할 경우)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("로그인 성공!");
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
    </div>
  );
};



// ---------------------------------------------------------//
// ---------------------------------------------------------//
// ---------------------------------------------------------//


// ---------------------------------------------------------//
// Logout.js
// ---------------------------------------------------------//
const handleLogout = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("로그아웃 실패");
    }

    // 토큰 삭제
    localStorage.removeItem("token");

    alert("로그아웃 되었습니다.");
  } catch (err) {
    console.error("로그아웃 오류:", err);
  }
};

const LogoutButton = () => {
  return <button onClick={handleLogout}>로그아웃</button>;
};


// ---------------------------------------------------------//
// ---------------------------------------------------------//
// ---------------------------------------------------------//
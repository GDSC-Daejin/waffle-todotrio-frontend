// User.js
// 회원정보수정 페이지

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Common/Authstate";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 350px;
    padding: 20px;
    background-color: #2D3748;
    border-radius: 8px;
    color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    font-family: Arial, sans-serif;
    text-align: center;
`;

const Heading = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #fff;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    font-size: 1rem;
    margin-bottom: 8px;
    text-align: left;
    width: 100%;
    color: #ddd;
`;

const Input = styled.input`
    width: 90%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #4A5568;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
        border-color: #3182CE;
        outline: none;
        box-shadow: 0 0 5px #3182CE;
    }
`;

const Button = styled.button`
    background-color: #3182CE;
    color: white;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2B6CB0;
    }

    &:active {
        background-color: #2C5282;
    }
`;

const User = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const token = localStorage.getItem("token");

    // 유저 데이터 가져오기
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/info`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();

                if(result.success) {
                    setUser({
                        username: result.data.username,
                        email: result.data.email,
                        password: "",
                    });
                }
            } catch (error) {
                console.error("유저 데이터 불러오는 중 오류:",error);
            }
        };
        if(token) fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // 유저 데이터 수정
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const updatedUser = {
                username: user.username,
                email: user.email,
            };
    
            // 비밀번호가 입력된 경우에만 비밀번호수정
            if (user.password) {
                updatedUser.password = user.password;
            }

            console.log("전송된 데이터",updatedUser);

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/update`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });
            console.log("응답 상태:", response.status);
            const result = await response.json();
            console.log("서버응답:",result);
            
            if(result.success) {
                alert("회원정보 수정 완료 !");
                login({
                    username: result.data.username,
                    email: result.data.email,
                    password: user.password,
                    token: token,
                });
                navigate("/Main");
            } else {
                alert("회원정보 수정 실패");
            }

        } catch (error) {
            console.log("수정 오류:", error);
            alert("네트워크 오류 발생");
        }
    };

    return(
        <>
            <Wrapper>
                <Heading>회원정보 수정</Heading>
                <Form onSubmit={handleSubmit}>
                    <Label>
                        <p>이름</p>
                        <Input type="text" name="username" value={user.username} onChange={handleChange} required />
                    </Label>
                    <Label>
                        <p>이메일</p>
                        <Input type="email" name="email" value={user.email} onChange={handleChange} required />
                    </Label>
                    <Label>
                        <p>비밀번호</p>
                        <Input type="password" name="password" value={user.password} onChange={handleChange} />
                    </Label>
                    <Button type="submit">저장</Button>
                </Form>
            </Wrapper>      
        </>

    );
}

export default User;
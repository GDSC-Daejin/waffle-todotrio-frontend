//User.js
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Common/Authstate";

const Wrapper = styled.div`
    height: auto;
    width: 250px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    padding-top:60px;
    color: white;
`;
const Form = styled.form`
    display:block;

    label {
        display: block;
        margin-bottom:20px;
    }
    
    input, select, textarea {
        position: absolute;
        left:100px;
    }
`;
const Button = styled.button`
    background-color: pink;
    width:50px;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
`;

const User = () => {
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
                <h2>회원정보 수정</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        이름:
                        <input type="text" name="username" value={user.username} onChange={handleChange} required />
                    </label>
                    <label>
                        이메일:
                        <input type="email" name="email" value={user.email} onChange={handleChange} required />
                    </label>
                    <label>
                        비밀번호:
                        <input type="password" name="password" value={user.password} onChange={handleChange} />
                    </label>
                    <Button type="submit">저장</Button>
                </Form>
            </Wrapper>        
        </>

    );
}

export default User;
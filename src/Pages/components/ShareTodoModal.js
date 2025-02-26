// ShareTodoModal.js
// user를 검색해 todo 공유하는 모달창

import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    background-color: #3a4f76;
    position: absolute;
    width: 200px;
    height: auto;
    padding: 20px 20px;
    padding-top:50px;
    left: 330px;
    bottom: 10px;
    border-radius: 8px;
`;
const CloseButton = styled.span`
    position: absolute;
    top: 15px;
    right: 15px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 40
`;

const ShareTodoModal = ({onClose, todo}) => {
    const [username, setUsername] = useState("");
    const [permission, setPermission] = useState("READ");
    const token = localStorage.getItem("token");

    const handleShare = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/todos/share/${todo.id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ permission, username })
                }
            );

            if (!response.ok) {
                // 서버 응답이 성공적인지 체크 (status 코드 2xx가 아닌 경우 처리)
                throw new Error(`서버 오류: ${response.status}`);
            }
            console.log("유저네임:",username);
            console.log("투두아이디:",todo.id);
            

            const result = await response.json();

            console.log("보내는데이터:",response);
            console.log("서버 응답:", result);
            if (result.success) {
                alert("공유 완료!");
                onClose();
            } else {
                alert("공유 실패: " + result.message);
            }
        } catch (error) {
            console.error("공유 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    return(
        <Wrapper>
            <CloseButton onClick={onClose}>
                <span class="material-symbols-outlined"
                style={{fontSize:'30px'}}>close</span>
            </CloseButton>
            <form onSubmit={handleShare}>
                <input
                    type="text"
                    placeholder="사용자 이름 입력"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{width:'100px'}}
                    required
                />
                <button type="submit" style={{display:'block', margin:'20px 0 10px 0'}}>
                    공유하기
                </button>                
            </form>

        </Wrapper>
    );
}

export default ShareTodoModal;
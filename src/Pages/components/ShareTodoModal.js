// ShareTodoModal.js
// user를 검색해 todo 공유하는 모달창

import { useState } from "react";
import styled from "styled-components";
import useAPI from "../../Hooks/useAPI";

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
    const { data, fetchData } = useAPI();

    const handleShare = async (e) => {
        e.preventDefault();

        await fetchData("todos/share/${todo.id}", "POST", { permission, username }, token, "일정 공유");
        if (data && data.success) {
            alert("공유 완료!");
            onClose();
        } else {
            alert("일정 공유 실패")        
        }
    }

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
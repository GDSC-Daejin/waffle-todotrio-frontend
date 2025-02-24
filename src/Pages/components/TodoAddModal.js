// TodoAddModal.js
// 할 일 추가 모달창

import { useState } from "react";
import styled from "styled-components";

const Backdrop = styled.div`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index:50;
`;

const Wrapper = styled.div`
    position: fixed;
    top: 60px;
    left: 230px;
    width: 250px;
    height: auto;
    background-color: #3a4f76;
    color: white;
    border-radius: 8px;
    padding: 20px;
    z-index: 40;
` ;
const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 40
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


const TodoModal = ({isOpen, onClose, onAddTodo}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const token = localStorage.getItem('token');


    // add todo 모달창 닫을 때 데이터 비우기
    const handleClose = () => {
        setTitle("");
        setContent("");
        setPriority("MEDIUM");
        setStartDate("");
        setDeadline("");
        onClose();  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수항목 미입력 시
        if(!title||!content||!startDate||!deadline){
            alert("모든 필드를 입력해주세요")
            return;
        }
        
        const getDateOnly = (dateString, isDeadline = false) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            date.setHours(isDeadline ? 32 : 10); 
            return date.toISOString();
        };

        const newTodo = {
            title,
            content,
            priority,
            startDate: getDateOnly(startDate),
            deadline: getDateOnly(deadline, true),
        };
        console.log("보내는 데이터:", newTodo);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos`,{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo),
            });

            const result = await response.json();
            console.log("addtodo result :", result);

            if(result.success){
                alert("할 일 추가 완료 !");
                onAddTodo(result.data); //캘린더로 할 일 전달
                onClose();
            } else {
                alert("할 일 추가 실패");
                console.log("선택한 날짜들:", { startDate, deadline });

            }
        } catch(error) {
            console.log("할 일 추가 중 오류:",error);
            alert("할 일 추가 중 오류 발생");
        }
    };


    return (
        <Backdrop isOpen={isOpen}>
            <Wrapper isOpen={isOpen}>
                <CloseButton onClick={handleClose}>
                    <span class="material-symbols-outlined">close</span>
                </CloseButton>
                <h2>할 일 추가</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        제목
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        내용
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} required/>
                    </label>
                    <label>
                        중요도
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="HIGH">높음</option>
                            <option value="MEDIUM">중간</option>
                            <option value="LOW">낮음</option>
                        </select>
                    </label>
                    <label>
                        시작일
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </label>
                    <label>
                        마감일
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </label>                    
                    <button type="submit">추가</button>
                </Form>
            </Wrapper>
        </Backdrop>

    );
};

export default TodoModal;
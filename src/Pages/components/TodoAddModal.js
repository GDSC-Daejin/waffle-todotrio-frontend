// TodoAddModal.js
// 할 일 추가 모달창

import { useEffect, useState } from "react";
import styled from "styled-components";
import useAPI from "../../Hooks/useAPI";

const Backdrop = styled.div`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index:50;
    background-color: rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
    position: fixed;
    top: 80px;
    left: 40%;
    transform: translateX(-50%);
    background-color: #3a4f76;
    color: white;
    border-radius: 8px;
    padding: 30px;
    z-index: 40;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
        font-size: 16px;
        font-weight: bold;
        p{
            display: block;
            paddding:0;
            margin:0;
        }
    }
    
    input, select, textarea {
        padding: 5px;
        margin-top: 5px;
        border-radius: 4px;
        font-size: 14px;
        background-color: #4A5568;
        border: 1px solid #ccc;
        color:white;
        &:focus {
            outline:none;
            border-color: #4A90E2;
            box-shadow: 0 0 5px #4A90E2;
        }
    }

    input[type="text"], textarea{
        width:200px;
    }

`;
const SubmitButton = styled.button`
    width:50%;
    margin:auto;
    background-color:rgb(93, 110, 145);
    color: white;
    padding: 10px 10px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #2c3b5c;
        transform: scale(1.05);
    }
`;


const TodoModal = ({isOpen, onClose, onAddTodo}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const token = localStorage.getItem('token');
    const { data, fetchData } = useAPI();

    // 시작일 선택 시 마감일을 일치시킴
    useEffect(() => {
        if (startDate && !deadline) {
            setDeadline(startDate);
        }
    }, [startDate]);

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

        await fetchData("todos/${todo.id}", "PUT", newTodo, token, "일정 추가");
        if (data && data.success) {
            alert("일정 추가 완료 !");
            onAddTodo(data.data);
            onClose();
        } else {
            alert("일정 추가 실패")        
        }
    }

    return (
        <Backdrop isOpen={isOpen}>
            <Wrapper isOpen={isOpen}>
                <CloseButton onClick={handleClose}>
                    <span class="material-symbols-outlined">close</span>
                </CloseButton>
                <h2>할 일 추가</h2>
                <Form onSubmit={handleSubmit}>
                    <label>
                        <p>제목</p>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        <p>내용</p>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} required/>
                    </label>
                    <label>
                        <p>중요도</p>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="HIGH">높음</option>
                            <option value="MEDIUM">중간</option>
                            <option value="LOW">낮음</option>
                        </select>
                    </label>
                    <label>

                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        <p style={{display:'inline-block', margin:'0 10px'}}>-</p>
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </label>                    
                    <SubmitButton type="submit">추가</SubmitButton>
                </Form>
            </Wrapper>
        </Backdrop>

    );
};

export default TodoModal;
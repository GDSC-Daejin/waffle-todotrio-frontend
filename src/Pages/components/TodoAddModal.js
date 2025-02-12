// TodoAddModal.js

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
    left: 200px;
    width: 300px;
    height: 250px;
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
`;


const TodoModal = ({isOpen, onClose, onAddTodo}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    // const [category, setCategory] = useState("");
    const token = localStorage.getItem('token');


    // add todo 모달창 닫을 때 데이터 비우기
    const handleClose = () => {
        setTitle("");
        setContent("");
        setPriority("HIGH");
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

        const getDateOnly = (dateString) => {

            // ---------1---------//
            // const date = new Date(dateStr);
            //date.setHours(0, 0, 0, 0); // 시간을 00:00:00으로
            // date.setDate(date.getDate() + 1);
            // return date.toISOString();

            // ---------2---------//
            // const date = new Date(dateStr);
            // const offset = 9 * 60;  // KST는 UTC+9
            // date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + offset);
        
            // date.setHours(0, 0, 0, 0);
        
            // return date.toISOString();

            // ---------3---------//
            if (!dateString) return null; // 날짜가 없을 경우 예외 처리
            const date = new Date(dateString)
            date.setHours(0, 0, 0, 0);
            return date;
        };

        const newTodo = {
            title,
            content,
            priority,
            startDate: getDateOnly(startDate),
            deadline: getDateOnly(deadline),
            // category,
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
                        제목:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        내용:
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                    </label>
                    <label>
                        우선순위:
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="HIGH">높음</option>
                            <option value="MEDIUM">중간</option>
                            <option value="LOW">낮음</option>
                        </select>
                    </label>
                    <label>
                        시작일:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </label>
                    <label>
                        마감 기한:
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </label>
                    {/* <label>
                        카테고리 :
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="hobby">취미</option>
                            <option value="housework">가사</option>
                            <option value="study">공부</option>
                            <option value="meeting">모임</option>
                        </select>
                    </label> */}
                    <button type="submit">추가</button>
                </Form>
            </Wrapper>
        </Backdrop>

    );
};

export default TodoModal;
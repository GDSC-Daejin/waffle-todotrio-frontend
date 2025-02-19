//TodoDetailModal.js

import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: auto;
    width: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:50;
    background-color: #3a4f76;
    border-radius: 8px;
    padding: 20px;
    padding-top:60px;
`;

const Form = styled.form`
    display:block;
    label {
        display: block;
        margin-bottom:20px;
    }
    input, select, textarea {
        // position: absolute;
        left:150px;
        
    }
    select {
        transform: translate(0,5px);
    }
`;
const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 40
`;
const SaveButton = styled.button`
    background-color: pink;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: pink;
    }
`;
const DeleteButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: darkred;
    }
`;
const CompleteButton = styled.button`
    background-color: green;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: darkgreen;
    }

    &:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
`;

const TodoDetailModal = ({isOpen, onClose, todo, onDelete}) => {
    const [editedTodo, setEditedTodo] = useState({
        title: "",
        content: "",
        priority: "",
        status: "",
        startDate: "",
        deadline: "",
    });
    const token = localStorage.getItem("token");

    useEffect(() => {

        if (todo) {
            const addNineHours = (dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                date.setHours(date.getHours() + 9);
                return date.toISOString().split("T")[0];
            };

            setEditedTodo({
                title: todo.title,
                content: todo.extendedProps?.content || "",
                priority: todo.extendedProps.priority,
                status: todo.extendedProps.status,
                startDate: addNineHours(todo.startDate),
                deadline: addNineHours(todo.deadline),
            });

        }
    }, [todo]);

    if (!isOpen || !todo) return null;    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value
        });
    };

    // 할 일 완료 처리
    const handleComplete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}/complete`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
            const result = await response.json();
            console.log("서버 응답:", result);
    
            if (result.success) {
                alert("할 일이 완료되었습니다!");
            } else {
                alert("완료 처리에 실패했습니다.");
            }
        } catch (error) {
            console.error("완료 처리 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    // 할 일 완료 취소 처리
    const handleProgress = async () => {
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}/restart`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
            const result = await response.json();
            console.log("서버 응답:", result);
    
            if (result.success) {
                alert("할 일이 완료되었습니다!");
            } else {
                alert("완료 처리에 실패했습니다.");
            }
        } catch (error) {
            console.error("완료 처리 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const addNineHours = (dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                date.setHours(date.getHours() + 9);
                return date.toISOString();
            };

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: editedTodo.title,
                    content: editedTodo.content,
                    priority: editedTodo.priority,
                    status: editedTodo.status,
                    startDate: addNineHours(editedTodo.startDate),
                    deadline: addNineHours(editedTodo.deadline)
                })
            });
            const result = await response.json();
            if (result.success) {
                alert("할 일이 수정되었습니다!");
                onClose();
            } else {
                alert("수정에 실패했습니다.");
                console.log("응답:", response);
            }
        } catch (error) {
            console.error("수정 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    return(
        <Wrapper>
            <div>
                <CloseButton onClick={onClose}>
                    <span class="material-symbols-outlined">close</span>
                </CloseButton>
                <Form onSubmit={handleSubmit}>
                    <label>
                        <h2>
                            {todo.extendedProps?.category ? `[${todo.extendedProps.category}]`: ""}
                            <input type="text" name="title"
                                value={editedTodo.title}
                                onChange={handleChange}
                                required

                            />                            
                        </h2>

                    </label>
                    <label>
                        <span class="material-symbols-outlined">notes</span>
                        <textarea name="content"
                            value={editedTodo.content}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span class="material-symbols-outlined">star</span>
                        <select name="priority"
                            value={editedTodo.priority}
                            onChange={handleChange}
                        >
                            <option value="HIGH">높음</option>
                            <option value="MEDIUM">중간</option>
                            <option value="LOW">낮음</option>
                        </select>
                    </label>
                    <label>
                        <input type="date" name="startDate"
                            value={editedTodo.startDate}
                            onChange={handleChange}
                            required
                        />
                        <span class="material-symbols-outlined">minimize</span>
                        <input type="date" name="deadline"
                            value={editedTodo.deadline}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <span class="material-symbols-outlined">progress_activity</span>
                        <select name="status"
                            value={editedTodo.status}
                            onChange={handleChange}
                        >
                            <option value="DELAYED">지연</option>
                            <option value="IN_PROGRESS">진행중</option>
                            <option value="COMPLETED">완료</option>
                        </select>
                    </label>
                    <label>
                        <CompleteButton onClick={handleComplete}>
                            완료 버튼
                        </CompleteButton>
                        <CompleteButton onClick={handleProgress}>
                            완료 취소 버튼
                        </CompleteButton>
                    </label>
                    <SaveButton type="submit">저장</SaveButton>
                </Form>
                <DeleteButton onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
            </div>
        </Wrapper>
    );
};

export default TodoDetailModal;
//TodoDetailModal.js

import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: auto;
    width: 250px;
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

const TodoContent = styled.div`

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

const TodoDetailModal = ({isOpen, onClose, todo, onDelete}) => {
    
    const [editedTodo, setEditedTodo] = useState({
        title: "",
        content: "",
        priority: "",
        startDate: "",
        deadline: "",
    });

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
            <TodoContent>
                <CloseButton onClick={onClose}>
                    <span class="material-symbols-outlined">close</span>
                </CloseButton>
                <Form onSubmit={handleSubmit}>
                    <label>
                        제목:
                        <input type="text" name="title"
                            value={editedTodo.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        내용:
                        <textarea name="content"
                            value={editedTodo.content}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        중요도:
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
                        시작일:
                        <input type="date" name="startDate"
                            value={editedTodo.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        마감일:
                        <input type="date" name="deadline"
                            value={editedTodo.deadline}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <SaveButton type="submit">저장</SaveButton>
                </Form>
                <DeleteButton onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
            </TodoContent>
        </Wrapper>
    );
};

export default TodoDetailModal;
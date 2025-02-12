//TodoDetailModal.js

import styled from "styled-components";

const Wrapper = styled.div`
    height: 300px;
    width: 300px;
    position: fixed;
    // top: 50%;
    // left: 50%;
    z-index:50;
    background-color: #3a4f76;
    border-radius: 8px;
    padding: 20px;
`;

const TodoContent = styled.div`

`;

const TodoDetailModal = ({isOpen, onClose, todo}) => {

    if (!isOpen || !todo) return null;

    return(
        <Wrapper>
            <TodoContent>
                <h2>{todo.title}</h2>
                <p>내용: {todo.content}</p>
                <p>시작일: {todo.startDate.toLocaleDateString()}</p>
                <p>마감일: {todo.deadline.toLocaleDateString()}</p>
                <p>우선순위: {todo.priority}</p>
                <p>상태: {todo.status}</p>
                <button onClick={onClose}>닫기</button>
            </TodoContent>
        </Wrapper>
    );
};

export default TodoDetailModal;
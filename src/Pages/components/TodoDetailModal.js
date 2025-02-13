//TodoDetailModal.js

import styled from "styled-components";

const Wrapper = styled.div`
    height: auto;
    width: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:50;
    background-color: #3a4f76;
    border-radius: 8px;
    padding: 20px;
`;

const TodoContent = styled.div`

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

    if (!isOpen || !todo) return null;

    return(
        <Wrapper>
            <TodoContent>
                <CloseButton onClick={onClose}>
                    <span class="material-symbols-outlined">close</span>
                </CloseButton>
                <h2>{todo.title}</h2>
                <p>내용: {todo.extendedProps?.content||"내용 없음"}</p>
                <p>시작일: {todo.startDate.toLocaleDateString()}</p>
                <p>마감일: {todo.deadline.toLocaleDateString()}</p>
                <p>중요도: {todo.extendedProps.priority}</p>
                <DeleteButton onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
            </TodoContent>
        </Wrapper>
    );
};

export default TodoDetailModal;
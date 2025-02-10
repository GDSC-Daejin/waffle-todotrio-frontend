// TodoModal.js

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
    left: 250px;
    width: 200px;
    height: 200px;
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


const TodoModal = ({isOpen, onClose}) => {
    return(
        <Backdrop isOpen={isOpen} onClick={onClose}>
            <Wrapper isOpen={isOpen}>
                <CloseButton onClick={onClose}>
                    <span class="material-symbols-outlined">close</span>
                </CloseButton>
                <h2>할 일 추가</h2>
            </Wrapper>
        </Backdrop>

    );
}

export default TodoModal;
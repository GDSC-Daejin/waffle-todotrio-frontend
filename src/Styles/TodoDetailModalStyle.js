/* TodoDetailModalStyle.js */

import styled from "styled-components";

export const Wrapper = styled.div`
    height: auto;
    width: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    background-color: #3a4f76;
    border-radius: 8px;
    padding: 20px;
    padding-top: 70px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const Form = styled.form`
    user-select: none;
    position: relative;

    label {
        display: block;
        margin-bottom: 20px;
        color: white;
    }

    input, textarea, select {
        padding: 5px;
        margin-left: 10px;
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
    }

    textarea {
        all: unset;
        field-sizing: content;
        cursor: text;
        box-sizing: border-box;
        word-wrap: break-word; 
        overflow-wrap: break-word; 
        width: 100%;
    }

    input[type="date"], select {
        cursor: pointer;
    }
    option {
        color:black;
    }

    .input-todotitle {
        display: inline-block;
        font-size: 20px;
    }

    input:disabled, textarea:disabled, select:disabled {
        cursor: default;
        opacity: 1;
    }

`;
export const CloseButton = styled.span`
    position: absolute;
    top: 15px;
    right: 15px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 40
`;
export const EditButton = styled.span`
    position: absolute;
    top: 15px;
    right: 60px;
    cursor: pointer;
    color: white;
`;
export const SaveButton = styled.button`
    background-color: rgb(93, 110, 145);
    color: white;
    border: none;
    padding: 8px 12px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #2c3b5c;
    }
`;
export const ShareButton = styled.span`
    position: absolute;
    bottom: 20px;
    right: 30px;
    cursor: pointer;
    color: white;
`;
export const DeleteButton = styled.button`
    background-color: #BE3C3C;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
    position: absolute;
    right: 30px;

    &:hover {
        background-color: darkred;
    }
`;
export const CompleteButton = styled.button`
    background-color:rgb(51, 143, 74);
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
export const Sharer = styled.span`
    background-color:#66B2FF;
    color: #fff;
    padding: 2px 5px;
    border-radius: 4px;
    position: absolute;
    top:-40px;
`;
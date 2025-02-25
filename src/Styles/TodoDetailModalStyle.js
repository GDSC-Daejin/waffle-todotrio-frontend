/* TodoDetailModalStyle.js */

import styled from "styled-components";

export const Wrapper = styled.div`
    height: auto;
    width: 280px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:50;
    background-color: #3a4f76;
    border-radius: 8px;
    padding: 20px;
    padding-top:50px;
`;
export const Form = styled.form`
    user-select: none;

    label {
        display: block;
        margin-bottom: 20px;
    }

    input, textarea, select {
        padding: 5px;
        margin-left: 10px;
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
    }

    input[type="text"], textarea {
        all: unset;
        field-sizing: content;
        cursor: text;
        margin-left: 15px;
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
`;
export const SaveButton = styled.button`
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
export const ShareButton = styled.span`
    position: absolute;
    bottom: 20px;
    right: 30px;
    cursor: pointer;
`;
export const DeleteButton = styled.button`
    background-color: red;
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
export const Sharer = styled.span`
    background-color: #346A3E;
    color: #CCFFCC;
    padding: 2px 5px;
    border-radius: 4px;
`;
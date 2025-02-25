// DashboardStyle.js

import styled from "styled-components";

export const TabBar = styled.div`
    width:70vw;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    position: relative;
    user-select: none;  
    border-bottom : 3px solid #474B60;
`;

export const Tab = styled.span`
    font-size: 20px;
    margin:10px;
    color: white;
    cursor: pointer;
    color: ${({isActive}) => (isActive ? "white" : "#a0a0a0")};
    transition: color 0.3s ease-in-out;
`;
export const Indicator = styled.div`
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100px;
    height: 10px;
    background-color: white;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    transform: ${({ selectedTab }) => (selectedTab === "sharedTab" ? "translateX(180px)" : "translateX(40px)")};
`;

export const TabWrapper = styled.div`
    display: flex;

    margin-left: auto;
    margin-right:auto;
    margin-top: 50px;
    padding: 10px;
    width: 90vw;

`;
export const PieContainer = styled.div `
    display:none;
    @media (min-width: 1000px){
        display: flex;
        width: 30%; 
        justify-content: center;
        align-items: center;
    }
`;
export const ProgressContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: min-content;
    gap: 10px;
    margin: auto;
    width: 100%; 
    @media (min-width: 1000px) {
        width:70%;
    }
`;
export const ProgressHeader = styled.div`
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    padding-left:40px;
    user-select: none;
    div {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: inline-block;
        margin-right : 10px;
        transform
    }
`;
export const TodoItem = styled.div`
    position: relative;
    background-color: white;
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 70%;
    margin: auto;

    span {
        display: block;
        text-align: left;
    }
`;

export const SharedTodoItem = styled.div`
    position: relative;
    background-color: white;
    padding: 10px;
    display: inline-block;
    margin:10px;
    border-radius: 5px;
    width: auto;
    min-width: 100px;
    padding-right: 100px;
    span {
        display: block;
        text-align: left;
    }
`;

export const Sharer = styled.span`
    background-color: #CCFFCC;
    color: #00BA34;
    display: inline-block !important;
    border-radius :5px;
    padding: 2px 5px;
    position: absolute;
    top:10px;
    right: 10px;
`;

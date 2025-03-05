// DashboardStyle.js
// 대쉬보드 css

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
    padding: 10px;
    width: 90vw;
`;
export const PieContainer = styled.div `
    display:none;
    @media (min-width: 1500px){
        position:fixed;
        left:150px;        
        display: flex;
        width: 30%; 
        justify-content: center;
        align-items: start;
        margin-top: 100px;
        transition: transform 0.5s ease-out;
    }
`;
export const HeaderTodoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px; 
    @media (min-width: 1500px){
        width: 70%;
        margin-left:580px; 
    }
    
`;
export const ProgressHeaderContainer = styled.div`
    display: grid;
    grid-auto-flow: column;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    color: white;
`;
export const ProgressHeader = styled.div`
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    color: white;
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
export const ProgressContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
    grid-auto-rows: min-content;
    gap: 10px;
    margin: auto;
    width:100%;
`;


export const Sharer = styled.span`
    background-color:#66B2FF;
    color:#fff;
    display: inline-block !important;
    border-radius :5px;
    padding: 0 5px;
    position: absolute;
    top:10px;
    right: 10px;
`;


export const TodoItemStyle = styled.div`
    background-color: #445573;
    color: white;
    padding: 20px;
    margin-bottom: 12px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease-in-out;
    position: relative;
    width: 70%;
    overflow: hidden;
    word-wrap: break-word;
    padding-top: ${props => props.hasSharer ? '40px' : '20px'};

    span {
        display: block;
        text-align: left;
    }

    @media (min-width: 1500px){
        min-width: 300px; 
    }
`;
export const SharedTodoItemStyle = styled.div`
    background-color: #445573;
    color: white;
    padding: 20px;
    margin-bottom: 12px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease-in-out;
    position: relative;
    height: auto;
    margin:10px;
    overflow: hidden;
    word-wrap: break-word;
    padding-top: 40px;

    span {
        display: block;
        text-align: left;
    }

    @media (min-width: 1500px){
        min-width: 300px; 
    }
`;

export const TodoTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
`;
export const TodoContent = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;

export const TodoPriority = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #8a8a8a;
  padding: 5px 8px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
`;

export const TodoStatus = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: ${props => {
    if (props.status === 'COMPLETED') {
      return '#34C759';  // 완료 상태 (초록색)
    } else if (props.status === 'DELAYED') {
      return '#FBBF24';  // 지연 상태 (노랑색)
    } else if (props.status === 'IN_PROGRESS') {
      return '#3B82F6';  // 진행 중 상태 (파랑색)
    }
  }};
  padding: 5px 8px;
  border-radius: 5px;
  display: inline-block;
`;

export const TodoDates = styled.div`
  font-size: 15px;
  margin-top: 10px;
  display: flex;
  padding: 5px 0;
`;

export const DateIcon = styled.span`
  margin-right: 5px;
`;
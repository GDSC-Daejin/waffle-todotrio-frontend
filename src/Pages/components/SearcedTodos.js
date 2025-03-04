// SearchedTodos.js

import styled from "styled-components";


const Backdrop = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background: rgba(0, 0, 0, 0.2);
`;
const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  background-color: #2c3b5c;
  border-radius: 12px;
  padding: 20px;
  z-index: 60;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  color: white;
  max-height: 70vh;
  overflow-y: scroll;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const CloseButton = styled.span`
  position: absolute;
  top: 12px;
  right: 15px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SearchedTodosList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SearchedTodoItem = styled.li`
  background-color: #445573;
  padding: 14px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease-in-out;
`;

const TodoTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
`;

const TodoContent = styled.div`
  font-size: 14px;
  color: #dcdcdc;
  margin-bottom: 15px;
`;

const TodoPriority = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #8a8a8a; 
  padding: 5px 8px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
`;

const TodoStatus = styled.div`
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

const TodoDates = styled.div`
  font-size: 13px;
  color:rgb(200, 213, 231);
  margin-top: 10px;
  display: flex;
  padding: 5px 0;
`;
const DateIcon = styled.span`
  margin-right: 5px;
`;


const SearchedTodos = ({ isOpen, onClose, searchedTodos }) => {

  const getStatusText = (status) => {
    if (status === 'COMPLETED') return '완료';
    if (status === 'DELAYED') return '지연';
    if (status === 'IN_PROGRESS') return '진행 중';
    return status;
  };

  return (
      <Backdrop isOpen={isOpen}>
        <Wrapper>
          <CloseButton onClick={onClose}>×</CloseButton>
          <h3>검색된 할 일 목록</h3>
          {searchedTodos.length === 0 ? (
            <p>검색된 할 일이 없습니다.</p>
          ) : (
            <SearchedTodosList>
              {searchedTodos.map((todo) => (
              <SearchedTodoItem key={todo.id}>
              <TodoTitle>[{todo.category}] {todo.title}</TodoTitle>
              <TodoContent>{todo.content}</TodoContent>
              <div>
                <TodoPriority>{todo.priority}</TodoPriority>
                <TodoStatus status={todo.status}>{getStatusText(todo.status)}</TodoStatus>
              </div>
              <TodoDates>
                <DateIcon>📅</DateIcon>
                시작일: {todo.startDate.split("T")[0]} ~ 마감일: {todo.deadline.split("T")[0]}
              </TodoDates>
            </SearchedTodoItem>
              ))}
            </SearchedTodosList>
          )}
        </Wrapper>
      </Backdrop>
    );
  };

export default SearchedTodos;
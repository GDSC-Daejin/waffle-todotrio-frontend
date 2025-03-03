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
`;
const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  background-color: #3A3D4A;
  border-radius: 12px;
  padding: 20px;
  z-index: 60;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;
const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000;
  font-size: 20px;
  cursor: pointer;
`;
const SearchedTodosContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #2d2f3c;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchedTodosList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SearchedTodoItem = styled.li`
  background-color: #444b5d;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #555c6d;
  }
`;

const TodoTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;


const SearchedTodos = ({ isOpen, onClose, searchedTodos }) => {

    return (
        <Backdrop isOpen={isOpen}>
          <Wrapper>
            <CloseButton onClick={onClose}>×</CloseButton>
            <h3>검색된 할 일 목록</h3>
            <SearchedTodosContainer>
              {searchedTodos.length === 0 ? (
                <p>검색된 할 일이 없습니다.</p>
              ) : (
                <SearchedTodosList>
                  {searchedTodos.map((todo) => (
                    <SearchedTodoItem key={todo.id}>
                      <TodoTitle>[{todo.category}]{todo.title}</TodoTitle>
                      <div>{todo.content}</div>
                      <div>우선순위: {todo.priority}</div>
                    </SearchedTodoItem>
                  ))}
                </SearchedTodosList>
              )}
            </SearchedTodosContainer>
          </Wrapper>
        </Backdrop>
      );
  };

export default SearchedTodos;
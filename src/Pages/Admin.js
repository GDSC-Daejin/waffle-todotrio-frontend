//Admin.js
//관리자 페이지

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TodoDetailModal from "./components/TodoDetailModal";
import useAPI from "../Hooks/useAPI";

const Container = styled.div`
    background-color: #2D2F3C;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 100px;
`;

const Card = styled.div`
    background-color: #2c3b5c;
    border-radius: 10px;
    padding: 20px;
    width: 80%;
    max-width: 800px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #3a4f76;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: #2c3b5c;
    }
`;
const BackButton = styled.button`
    color: white;
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 5px;
    position: absolute;
    left:10%;
    top:140px;
    span {
        font-size: 2rem;
        margin: 0;
    }
`;

const Table = styled.table`
  width: 800px;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #3a4f76;
  color: white;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const TodoTr = styled.tr`
    cursor: pointer;
    &:hover {
        background-color:rgb(60, 63, 80);
    }
`;

const Admin = () => {
    const [page, setPage] = useState("main");
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const token = localStorage.getItem("token");
    const { data, fetchData } = useAPI();

    useEffect(()=>{
        if (page === "users") {
            fetchData("admin/users", "GET", null, token, "모든 사용자 조회");
            if (data && data.success) {
                setUsers(data.data);
            } else {
                alert("모든 사용자 조회 실패");
            }                
        }
    },[page]);

    useEffect(()=>{
        if (page === "todos") {
            fetchData("admin/todos", "GET", null, token, "모든 일정 조회");
            if (data && data.success) {
                setTodos(data.data);
            } else {
                alert("모든 일정 조회 실패");
            }                
        }
    },[page]);

    const handleTodoClick = (todo) => {

        const priority = todo?.priority || "우선순위 없음";
        const status = todo?.status || "상태 없음";
        const category = todo?.category || "기타";
        const content = todo?.content || "내용 없음";
        const createdDate = todo?.createdDate || null;
        const completedDate = todo?.completedDate || null;
    
        setSelectedTodo({
            id: todo.id,
            title: todo.title,
            startDate: todo.startDate,
            deadline: todo.deadline,
            extendedProps: {
                category,
                status,
                content,
                priority,
                createdDate,
                completedDate
            }
        });
    };

    return (
        <>
            {/* 관리자 페이지 */}
            {page === "main" && (
                <Container>
                    <Card>
                        <h2>모든 사용자 조회</h2>
                        <Button onClick={() => setPage("users")}>조회하기</Button>
                    </Card>
                    <Card>
                        <h2>모든 Todo 조회</h2>
                        <Button onClick={() => setPage("todos")}>조회하기</Button>
                    </Card>
                </Container>
            )}

            {/* 사용자 조회 페이지 */}
            {page === "users" && (
                <Container>
                    <BackButton onClick={() => setPage("main")}>
                        <span class="material-symbols-outlined">
                            chevron_left
                        </span>
                    </BackButton>                    
                    <h2>모든 사용자 조회</h2>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Username</Th>
                                <Th>Email</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.username}>
                                    <Td>{user.username}</Td>
                                    <Td>{user.email}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            )}
            
            {/* todo 조회 페이지 */}
            {page === "todos" && (
                <Container>
                    <BackButton onClick={() => setPage("main")}>
                        <span class="material-symbols-outlined">
                            chevron_left
                        </span>
                    </BackButton>                    
                    <h2>모든 Todo 조회</h2>

                    <Table style={{width:'80%'
                    }}>
                        <thead>
                            <tr>
                                <Th>id</Th>
                                <Th>title</Th>
                                <Th>content</Th>
                                <Th>priority</Th>
                                <Th>date</Th>
                                <Th>status</Th>
                                <Th>category</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <TodoTr key={todo.id} onClick={() => handleTodoClick(todo)}>
                                    <Td>{todo.id}</Td>
                                    <Td>{todo.title}</Td>
                                    <Td>{todo.content}</Td>
                                    <Td>{todo.priority}</Td>
                                    <Td><span style={{display:'block'}}>{todo.startDate.split("T")[0]}</span>~{todo.deadline.split("T")[0]}</Td>
                                    <Td>{todo.status}</Td>
                                    <Td>{todo.category}</Td>
                                </TodoTr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            )}

            {selectedTodo && (
                <TodoDetailModal
                    isOpen={true}
                    onClose={() => setSelectedTodo(null)}
                    todo={selectedTodo}
                />
            )}
        </>
    );
};

export default Admin;
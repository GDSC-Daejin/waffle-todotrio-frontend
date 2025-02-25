// Dashboard.js
// 대쉬보드 페이지

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {TabBar, Tab, Indicator, TabWrapper, ProgressContainer, ProgressHeader, TodoItem, SharedTodoItem, Sharer} from "../Styles/DashboardStyle";



const Dashboard = () => {
    const location = useLocation();

    const todos = location.state?.todos || [];
    const [selectedTab, setSelectedTab] = useState("progressTab");

    const [sharedTodos, setSharedTodos] = useState([]);
    const [sharedUser, setSharedUser] = useState({});
    const token = localStorage.getItem("token");


    // 진행상황별로 todo 그룹화
    const inProgressTodos = todos.filter(todo => todo.extendedProps.status === "IN_PROGRESS");
    const completedTodos = todos.filter(todo => todo.extendedProps.status === "COMPLETED");
    const delayedTodos = todos.filter(todo => todo.extendedProps.status === "DELAYED");

    // 공유받은 Todo 가져오기
    useEffect(() => {
        const fetchSharedTodos = async () => {
            try {
                const sharedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/share/shared`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const result = await sharedResponse.json();
                console.log("공유받은 Todo 목록:", result);
                setSharedTodos(result.data);
            } catch (error) {
                console.error("공유된 Todo 목록 가져오기 실패:", error);
            }
        };

        fetchSharedTodos();
    }, [token]);

    // 공유자 정보 가져오기
    useEffect(() => {
        const fetchSharedUser = async (todoId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/share/${todoId}/sharer`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setSharedUser(prevState => ({
                        ...prevState,
                        [todoId]: responseData.data
                    }));
                } else {
                    console.error("공유자 목록 가져오기 실패:", response.status);
                }
            } catch (error) {
                console.error("공유자 목록 요청 오류:", error);
            }
        };

        // 진행 중, 완료, 지연된 Todo에 대해 공유자 정보 요청
        [...inProgressTodos, ...completedTodos, ...delayedTodos].forEach(todo => {
            if (!sharedUser[todo.id]) {
                fetchSharedUser(todo.id);
            }
        });
    }, [inProgressTodos, completedTodos, delayedTodos, sharedUser, token]);

    // 각 상태별 todo 출력 함수 
    const renderTodos = (todos, gridColumn) => {
        return todos.map(todo => {
            const sharedUserName = sharedUser[todo.id]; // 공유자 정보 가져오기
            return (
                <TodoItem key={todo.id} style={{ gridColumn }}>
                    <span>{todo.title}</span>
                    {todo.end && <span>~{todo.end.split('T')[0]}</span>}
                    <span>{todo.extendedProps.content}</span>
                    {sharedUserName && <Sharer>{sharedUserName}</Sharer>} {/* 공유자 이름 표시 */}
                </TodoItem>
            );
        });
    };


    return(
        <div style={{marginTop:'80px'}}>
            <TabBar>
                <Tab
                    isActive={selectedTab === "progressTab"}
                    onClick={() => setSelectedTab("progressTab")}>
                    To-do Progress
                </Tab>
                <Tab 
                    isActive={selectedTab === "sharedTab"}
                    onClick={() => setSelectedTab("sharedTab")}>
                    Shared To-do
                </Tab>
                <Indicator selectedTab={selectedTab}/>
            </TabBar>
            {selectedTab === "progressTab" && (
                <TabWrapper>
                    <ProgressContainer>
                        <ProgressHeader><div style={{backgroundColor:'#3B82F6'}}/>진행 중</ProgressHeader>
                        <ProgressHeader><div style={{backgroundColor:'#34C759'}}/>완료</ProgressHeader>
                        <ProgressHeader><div style={{backgroundColor:'#FBBF24'}}/>지연</ProgressHeader>    

                        {renderTodos(inProgressTodos, 1)}
                        {renderTodos(completedTodos, 2)}
                        {renderTodos(delayedTodos, 3)}

                    </ProgressContainer>
                </TabWrapper>
            )}
            {selectedTab === "sharedTab" && (
                <TabWrapper>
                    {sharedTodos.length > 0 ? (
                        sharedTodos.map(todo => {
                            const sharedUserName = sharedUser[todo.id];
                            return (
                                <SharedTodoItem key={todo.id}>
                                    <span>{todo.title}</span>
                                    <span>~{todo.deadline.split('T')[0]}</span>
                                    <span>{todo.content}</span>
                                    {sharedUserName && (
                                        <Sharer>{sharedUserName}</Sharer>
                                    )}
                                </SharedTodoItem>
                            );
                        })
                    ) : (
                        <p>공유된 할 일이 없습니다.</p>
                    )}
                </TabWrapper>
            )}
        </div>
    );
}

export default Dashboard;
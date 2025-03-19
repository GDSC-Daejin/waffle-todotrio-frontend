// Dashboard.js
// 대쉬보드 페이지
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {TabBar, Tab, Indicator, TabWrapper, ProgressContainer, ProgressHeader, Sharer, PieContainer, ProgressHeaderContainer, HeaderTodoBox, TodoItemStyle, SharedTodoItemStyle, TodoTitle, TodoContent, TodoPriority, TodoStatus, TodoDates, DateIcon} from "../Styles/DashboardStyle";
import ProgressPie from "./components/ProgressPie";
import useAPI from "../Hooks/useAPI";

const Dashboard = () => {
    const location = useLocation();

    const todos = location.state?.todos || [];
    const [selectedTab, setSelectedTab] = useState("progressTab");

    const [sharedTodos, setSharedTodos] = useState([]);
    const [sharedUser, setSharedUser] = useState({});
    const token = localStorage.getItem("token");
    const [scrollPosition, setScrollPosition] = useState(0);

    const {data, fetchData} = useAPI();

    // 스크롤 리스너 (파이차트 애니메이션 효과)
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const offset = scrollPosition * 0.2;


    // 진행상황별로 todo 그룹화
    const inProgressTodos = todos.filter(todo => todo.extendedProps.status === "IN_PROGRESS");
    const completedTodos = todos.filter(todo => todo.extendedProps.status === "COMPLETED");
    const delayedTodos = todos.filter(todo => todo.extendedProps.status === "DELAYED");

    // 진행상황별 todo 갯수 세기 
    const inProgressCount = inProgressTodos.length;
    const completedCount = completedTodos.length;
    const delayedCount = delayedTodos.length;

    useEffect(()=>{
        fetchData("todos/share/shared", "GET", null, token, "공유받은 일정 가져오기");
        if (data && data.success) {
            setSharedTodos(data.data);
        } else {
            alert("공유받은 일정 가져오기 실패");
        }            
    },[token]);

    useEffect(()=>{
        const fetchSharedUser = async (todoId)=> {
            await fetchData("todos/share/${todoId}/sharer", "GET", null, token, "공유자 가져오기");
            if (data && data.success) {
                setSharedUser(prevState => ({
                    ...prevState,
                    [todoId]: data.data
                }));
            } else {
                alert("공유자 가져오기 실패");
            }           
            // 진행 중, 완료, 지연된 Todo의 공유자 정보 요청
            [...inProgressTodos, ...completedTodos, ...delayedTodos].forEach(todo => {
                if (!sharedUser[todo.id]) {
                    fetchSharedUser(todo.id);
                }
            });
        }
    },[token]);

    const getStatusText = (status) => {
        if (status === 'COMPLETED') return '완료';
        if (status === 'DELAYED') return '지연';
        if (status === 'IN_PROGRESS') return '진행 중';
        return status;
      };


    // 각 상태별 todo 출력 함수 
    const renderTodos = (todos, gridColumn) => {
        return todos.map(todo => {
            const sharedUserName = sharedUser[todo.id];
            const startDate = typeof todo.start === 'string' ? todo.start.split("T")[0] : todo.start?.toString().split("T")[0] || '';
            const endDate = typeof todo.end === 'string' ? todo.end.split("T")[0] : todo.end?.toString().split("T")[0] || '';
            return (
                <TodoItemStyle key={todo.id} style={{gridColumn}} hasSharer={sharedUserName ? true : false}>
                    {sharedUserName && <Sharer>{sharedUserName}</Sharer>}
                    <TodoTitle>[{todo.extendedProps.category}] {todo.title}</TodoTitle>
                    <TodoContent>{todo.extendedProps.content}</TodoContent>
                    <div>
                        <TodoPriority>{todo.extendedProps.priority}</TodoPriority>
                    </div>
                    <TodoDates>
                        <DateIcon>📅</DateIcon>
                        {startDate} ~ {endDate}
                    </TodoDates>
                </TodoItemStyle>
            );
        });
    };


    console.log("sharedTodos:",sharedTodos);
    return(
        <div style={{marginTop:'120px'}}>

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
                    <PieContainer style={{ transform: `translateY(${offset}px)` }}>
                        <ProgressPie
                            inProgressCount={inProgressCount}
                            completedCount={completedCount}
                            delayedCount={delayedCount}
                        />                
                    </PieContainer>
                    <HeaderTodoBox>
                        <ProgressHeaderContainer>
                            <ProgressHeader><div style={{backgroundColor:'#3B82F6'}}/>진행 중</ProgressHeader>
                            <ProgressHeader><div style={{backgroundColor:'#34C759'}}/>완료</ProgressHeader>
                            <ProgressHeader><div style={{backgroundColor:'#FBBF24'}}/>지연</ProgressHeader>                     
                        </ProgressHeaderContainer>             
                        <ProgressContainer>
                            {renderTodos(inProgressTodos, 1)}
                            {renderTodos(completedTodos, 2)}
                            {renderTodos(delayedTodos, 3)}
                        </ProgressContainer>                        
                    </HeaderTodoBox>        

                </TabWrapper>
            )}
            {selectedTab === "sharedTab" && (
                <TabWrapper>
                    {sharedTodos.length > 0 ? (
                        sharedTodos.map(todo => {
                            const sharedUserName = sharedUser[todo.id];
                            const startDate = todo.startDate && typeof todo.startDate === 'string' ? todo.startDate.split("T")[0] : '';
                            const endDate = todo.deadline && typeof todo.deadline === 'string' ? todo.deadline.split("T")[0] : '';
                            return (
                                <SharedTodoItemStyle key={todo.id} hasSharer={sharedUserName ? true : false}>
                                    {sharedUserName && (
                                        <Sharer>{sharedUserName}</Sharer>
                                    )}                                    
                                    <TodoTitle>{todo.title}</TodoTitle>
                                    <TodoDates>
                                        <DateIcon>📅</DateIcon>
                                        {startDate} ~ {endDate}
                                    </TodoDates>
                                    <TodoContent>{todo.content}</TodoContent>
                                    <TodoStatus status={todo.status}>{getStatusText(todo.status)}</TodoStatus>
                                </SharedTodoItemStyle>
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
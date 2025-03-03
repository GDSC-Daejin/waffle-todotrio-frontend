// Calendar.js
// 캘린더 페이지

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Calendar.css"
import TodoAddModal from "./components/TodoAddModal";
import AccountDropdown from "./components/AccountDropdown";
import TodoDetailModal from "./components/TodoDetailModal";
import MiniCalendar from "./components/MiniCalendar";
import FromTodayTodo from "./components/FromTodayTodo";
import CategoryFilter from "./components/CategoryFilter";

const Calendar =() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTodoAddModalOpen, setIsTodoAddModalOpen] = useState(false);
    const [isTodoDetailModalOpen, setIsTodoDetailModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);


    const [events, setEvents] = useState([]);
    const token = localStorage.getItem("token");

    const [selectedCategories, setSelectedCategories] = useState(["전체"]);

    // 할 일 데이터 불러오기
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                // 개인 Todo 가져오기
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // 토큰 추가
                        "Content-Type": "application/json"
                    }
                }); // 백엔드 URL 확인
                const result = await response.json();

                console.log ("서버 응답 데이터", result);

                // 공유받은 Todo 가져오기
                const sharedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/share/shared`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const sharedResult = await sharedResponse.json();

                console.log ("공유todo 서버 응답 데이터", sharedResult);

                if (result.success && sharedResult.success) {
                    const allTodos = [...result.data, ...sharedResult.data];

                    console.log ("모든 투두", allTodos);

                    const formattedEvents = allTodos.map(todo => ({
                        id: todo.id,
                        title: todo.title,
                        start: todo.startDate,
                        end: todo.deadline,
                        extendedProps: {
                            category: todo.category,
                            status: todo.status,
                            content: todo.content,
                            priority: todo.priority,
                            createdDate: todo.createdDate,
                            completedDate: todo.completedDate
                        }
                    }));

                    console.log("캘린더에 등록될 이벤트:", formattedEvents);
                    setEvents(formattedEvents);
                }
            } catch (error) {
                console.error("할 일 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchTodos();
    }, []);

    // 할 일 선택 함수
    const handleEventClick = (info) => {
        const event = info.event;

        setSelectedTodo({
            id: event.id,
            title: event.title,
            startDate: event.start,
            deadline: event.end,
            extendedProps: {
                category: event.extendedProps?.category || "",
                status: event.extendedProps?.status || "상태 없음",
                content: event.extendedProps?.content || "내용 없음",
                priority: event.extendedProps?.priority || "우선순위 없음",
                createdDate: event.extendedProps?.createdDate || null,
                completedDate: event.extendedProps?.completedDate || null
            }
        });
        console.log("이벤트 구조:",info.event);
        console.log("이벤트 시작 시간:", event.start); // event.start
        console.log("이벤트 종료 시간:", event.end);

        setIsTodoDetailModalOpen(true);
    };

    // 선택된 할 일 삭제 함수
    const handleDeleteTodo = async (todoId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                alert("할 일이 삭제되었습니다.");
                setEvents((prevEvents) => prevEvents.filter(event => event.id !== todoId));
                setIsTodoDetailModalOpen(false);

            } else {
                console.error("삭제 실패:", await response.json());
                alert("삭제에 실패했습니다.");
            }
            
        } catch (error) {
            console.error("삭제 요청 중 오류 발생:", error);
            alert("오류가 발생했습니다.");
        }

    };

    const filteredEvents = selectedCategories.includes("전체")
        ? events
        : events.filter(event => selectedCategories.includes(event.extendedProps.category));

    return(
        <div className="calendar-tab-flexbox">

            {/* 왼쪽 사이드바 */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-grid">
                    <MiniCalendar/>
                    <FromTodayTodo events={events}/>
                    <div className="side-navs">
                        <Link 
                            to="/Dashboard"
                            state={{ todos: events }}
                        >
                            <span class="material-symbols-outlined icon-dashboard">
                                space_dashboard
                            </span>
                        </Link>
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                        />
                    </div>
                </div>
            </div>
    
            {/* 캘린더 컨테이너 */}
            <div className={`calendar-container ${isSidebarOpen ? "shrink" : ""}`}>
                {/* 사이드바 토글 버튼 */}
                <button
                    className={`sidebar-button ${isSidebarOpen ? "rotated" : ""}`}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <span class="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
                {/* 할 일 추가 버튼 */}
                <span class="material-symbols-outlined todoAddModal-button"
                onClick={()=> setIsTodoAddModalOpen(true)}>
                    add
                </span>

                <TodoAddModal
                    isOpen={isTodoAddModalOpen}
                    onClose={()=>{setIsTodoAddModalOpen(false)}}
                    onAddTodo={(newTodo) => setEvents([...events, {
                        id: newTodo.id,
                        title: newTodo.title,
                        start: new Date(newTodo.startDate),
                        end: new Date(newTodo.deadline),
                        extendedProps: {
                            status: newTodo.status,
                            content: newTodo.content,
                            createdDate: newTodo.createdDate,
                            completedDate: newTodo.completedDate,
                            priority: newTodo.priority,
                        }
                    }])}                
                />
                <AccountDropdown/>


        
                {/* 캘린더 */}
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale={koLocale}
                    initialView="dayGridMonth"
                    dayCellContent={(info) => info.date.getDate()} //날짜에 숫자만
                    editable={true} 
                    height="95vh"
                    timeZone="local"
                    titleFormat={{month:"long"}}
                    headerToolbar={{
                        left: "title today prev next",
                        center: "",
                        right: ""
                    }}
                    events={filteredEvents}
                    // eventClick={handleEventClick}
                    eventContent={(eventInfo) => {
                        const category = eventInfo.event.extendedProps.category;
                        const categoryClass = category ? `category-${category}` : "category-기타";

                        return (
                            <div className="event-item">
                                {/* <input type="checkbox" className="todo-checkbox"/> */}
                                <span className={`event-title ${categoryClass}`} onClick={()=>handleEventClick(eventInfo)}>{eventInfo.event.title}
                                </span>
                            </div>
                        );
                    }}
                /> 

                <TodoDetailModal
                    isOpen={isTodoDetailModalOpen}
                    onClose={()=>setIsTodoDetailModalOpen(false)}
                    todo={selectedTodo}
                    onDelete={handleDeleteTodo}
                />                     
            </div>
        </div> 
    );
}


export default Calendar;
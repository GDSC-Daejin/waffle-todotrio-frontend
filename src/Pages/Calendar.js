//Calendar.js

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Calendar.css"
import TodoAddModal from "./components/TodoAddModal";
import AccountDropdown from "./components/AccountDropdown";
import TodoDetailModal from "./components/TodoDetailModal";

const Calendar =() => {
    // const { user, isUserClicked, setIsUserClicked, logout } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTodoAddModalOpen, setIsTodoAddModalOpen] = useState(false);
    const [isTodoDetailModalOpen, setIsTodoDetailModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // 토큰 추가
                        "Content-Type": "application/json"
                    }
                }); // 백엔드 URL 확인
                const result = await response.json();

                console.log ("서버 응답 데이터", result);

                if (result.success) {
                    const formattedEvents = result.data.map(todo => ({
                        id: todo.id,
                        title: todo.title,
                        start: todo.startDate,
                        end: todo.deadline,
                        allDay: true,
                        extendedProps: {
                            content: todo.content,
                            priority: todo.priority,
                            status: todo.status,
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

    const handleEventClick = (info) => {
        const event = info.event;

        setSelectedTodo({
            title: event.title,
            content: event.content,
            startDate: event.start,
            deadline: event.end,
            priority: event.priority,
            status: event.status,
            createdDate: event.createdDate,
            completedDate: event.completedDate
        });

        setIsTodoDetailModalOpen(true);
    };


    return(
        <div className="calendar-tab-flexbox">
            {/* 왼쪽 사이드바 */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-grid">
                    <div>
                        Mini Calendar
                    </div>
                    <div>todolist</div>
                    <div className="side-navs">
                        <Link to="/Dashboard">
                            <span class="material-symbols-outlined icon-dashboard">
                                space_dashboard
                            </span>
                        </Link>
                        <Link to="/Teams">
                            <span class="material-symbols-outlined icon-group">
                                group
                            </span>
                        </Link>

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
                        id: newTodo.id.toString(),
                        title: newTodo.title,
                        start: new Date(newTodo.startDate),
                        end: new Date(newTodo.deadline),
                        allDay: true,
                        extendedProps: {
                            content: newTodo.content,
                            priority: newTodo.priority,
                            status: "IN_PROGRESS",
                            createdDate: newTodo.createdDate,
                            completedDate: newTodo.completedDate
                            // category: newTodo.category
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
                    timeZone="local" //날짜 UTC변환 방지
                    titleFormat={{month:"long"}}
                    headerToolbar={{
                        left: "title today prev next",
                        center: "",
                        right: ""
                    }}
                    events={events}
                    eventClick={handleEventClick}
                /> 

                <TodoDetailModal
                    isOpen={isTodoDetailModalOpen}
                    onClose={()=>setIsTodoDetailModalOpen(false)}
                    todo={selectedTodo}
                />                     
            </div>
        </div> 
    );
}


export default Calendar;
//Calendar.js

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Calendar.css"
import { useAuth } from "../Common/Authstate";
import TodoModal from "./components/TodoModal";
import AccountDropdown from "./components/AccountDropdown";

const Calendar =() => {
    // const { user, isUserClicked, setIsUserClicked, logout } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
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
                        start: todo.deadline, // 마감 기한을 이벤트 시작 날짜로 설정
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
        alert(`할 일: ${event.title}\n내용: ${event.extendedProps.content}\n 마감일: ${event.start.toISOString().split("T")[0]}\n 우선순위: ${event.extendedProps.priority}\n 상태: ${event.extendedProps.status}`);
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
                <span class="material-symbols-outlined todoModal-button"
                onClick={()=> setIsTodoModalOpen(true)}>
                    add
                </span>

                <TodoModal isOpen={isTodoModalOpen} onClose={()=>{setIsTodoModalOpen(false)}}/>

                <AccountDropdown
                    // isUserClicked={isUserClicked} 
                    // setIsUserClicked={setIsUserClicked} 
                    // user={user} 
                    // logout={logout} 
                />


        
                {/* 캘린더 */}
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale={koLocale}
                    initialView="dayGridMonth"
                    dayCellContent={(info) => info.date.getDate()} //날짜에 숫자만
                    editable={true} 
                    height="95vh"
                    titleFormat={{month:"long"}}
                    headerToolbar={{
                        left: "title today prev next",
                        center: "",
                        right: ""
                    }}
                    events={events}
                    eventClick={handleEventClick}
                />                      
            </div>
        </div> 
    );
}


export default Calendar;
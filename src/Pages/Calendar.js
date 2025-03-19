// Calendar.js
// 캘린더 페이지(메인페이지)

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
import SearchedTodos from "./components/SearcedTodos";
import useAPI from "../Hooks/useAPI";

const Calendar =() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTodoAddModalOpen, setIsTodoAddModalOpen] = useState(false);
    const [isTodoDetailModalOpen, setIsTodoDetailModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearchedOpen, setIsSearchedOpen] = useState(false);
    const [searchedTodos, setSearchedTodos] = useState([]);
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem("token");

    const [selectedCategories, setSelectedCategories] = useState(["전체"]);

    const { data, fetchData } = useAPI();

    const bringTodoSuccess = (result, sharedResult) => {
        const allTodos = [...result.data, ...sharedResult.data];

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
        setEvents(formattedEvents);
    };
    // 할 일 데이터 불러오기
    useEffect(()=>{
        const result = fetchData("todos", "GET", null, token, "일반일정 가져오기");
        const sharedResult = fetchData("todos/share/shared", "GET", null, token, "공유일정 가져오기")
        if (result.success && sharedResult.success) {
            bringTodoSuccess(result, sharedResult);
        } else {
            alert("공유자 가져오기 실패");
        }           
    },[]);



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
        console.log("이벤트 시작 시간:", event.start);
        console.log("이벤트 종료 시간:", event.end);

        setIsTodoDetailModalOpen(true);
    };

    const handleDeleteTodo = async (todoId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        await fetchData("todos/${todoId}", "DELETE", null, token, "일정 삭제");
        if (data && data.success) {
            alert("일정이 삭제되었습니다.");
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== todoId));
            setIsTodoDetailModalOpen(false);
        } else {
            alert("일정 삭제 실패");
        }
    }

    const filteredEvents = selectedCategories.includes("전체")
        ? events
        : events.filter(event => selectedCategories.includes(event.extendedProps.category));

    const handleSearch = async () => {
        if (searchKeyword.trim() === "") {

            await fetchData("todos/search?keyword=${searchKeyword}", "GET", null, token, "모든 일정 검색");
            if (data && data.success) {
                setSearchedTodos(data.data);
            } else {
                alert("모든 일정 검색 실패");
            }
        } else {
            await fetchData("admin/todos", "GET", null, token, "키워드 일정 검색");
            if (data && data.success) {
                setSearchedTodos(data.data);
            } else {
                alert("키워드 일정 검색 실패");
            }
        }
        setIsSearchedOpen(true);
    }

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
                    eventContent={(eventInfo) => {
                        const category = eventInfo.event.extendedProps.category;
                        const categoryClass = category ? `category-${category}` : "category-기타";

                        return (
                            <div className="event-item">
                                <span className={`event-title ${categoryClass}`} onClick={()=>handleEventClick(eventInfo)}>{eventInfo.event.title}
                                </span>
                            </div>
                        );
                    }}
                /> 
                {/* 검색창 */}
                {isSidebarOpen ? (<></>): (
                    <div className="search-box">
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Todo 검색"
                        />
                        <button onClick={() => handleSearch("검색 키워드")}>검색</button>
                    </div>                    
                )}

                {searchKeyword && (
                    <SearchedTodos
                    isOpen={isSearchedOpen}
                    onClose={() => {setIsSearchedOpen(false);setSearchKeyword('');}}
                    searchedTodos={searchedTodos}
                  />
                )}

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
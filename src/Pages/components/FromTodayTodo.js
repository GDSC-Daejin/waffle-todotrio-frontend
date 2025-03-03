// FromTodayTodo.js

import { useEffect, useState } from "react";
import styled from "styled-components";

const HeaderSpan = styled.span`
    font-size: 15px;
    text-align: center;
    display: block;
    border-radius: 10px;
`;

const TodoList = styled.ul`
    list-style-type: none;
    padding: 0;
    li {
        margin:10px 0;
        font-size: 13px;
    }
`;

const FromTodayTodo = ({events}) => {
    const [groupedTodos, setGroupedTodos] = useState([]);
    const [visibleTodos, setVisibleTodos] = useState([]);
    const [maxHeightReached, setMaxHeightReached] = useState(false);


    const addNineHours = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        date.setHours(date.getHours() + 9);
        return date.toISOString().split("T")[0];
    };

    useEffect(() => {
        if (!events || events.length === 0) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 14);

        const grouped = {};

        events.forEach(todo => {
            const start = addNineHours(todo.start);
            const end = addNineHours(todo.end);
            let currentDate = new Date(start);
            const endDate = new Date(end);

            // todo의 시작일부터 마감일까지 순회
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split("T")[0];

                if (!grouped[dateStr]) grouped[dateStr] = [];
                grouped[dateStr].push(todo);

                currentDate.setDate(currentDate.getDate()+1);
            }
        });

        // 오늘부터 2주 내의 일정들만 남기고 날짜 정렬
        const sortedGrouped = Object.keys(grouped)
            .filter(date => {
                const dateObj = new Date(date);
                return dateObj >= today && dateObj <= twoWeeksLater;
            })
            .sort()
            .map(date => ({ date, todos: grouped[date] }));

        setGroupedTodos(sortedGrouped);
    }, [events]);


    // 높이 계산
    useEffect(() => {
        const sidebarHeight = 470;
        let totalHeight = 0;
        let visible = [];

        // 날짜 그룹을 순회하며 높이를 계산
        for (let i = 0; i < groupedTodos.length; i++) {
            const groupElement = document.querySelector(`#group-${groupedTodos[i].date}`);
            const groupHeight = groupElement ? groupElement.offsetHeight : 0;
            totalHeight += groupHeight;

            // 총 높이가 사이드바 높이를 넘지 않으면 해당 날짜 그룹을 보여주고, 넘으면 멈춤
            if (totalHeight <= sidebarHeight) {
                visible.push(groupedTodos[i]);
            } else {
                setMaxHeightReached(true); // 높이를 넘으면 더 이상 추가하지 않음
                break;
            }
        }

        setVisibleTodos(visible);
    }, [groupedTodos]);



    const FormatHeaders = (date) => {
        const headerDate = new Date(date);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        if (headerDate.toDateString() === today.toDateString()) return "오늘";
        if (headerDate.toDateString() === tomorrow.toDateString()) return "내일";

        return headerDate.toLocaleDateString("ko-KR", { weekday: "long" }).toUpperCase();

    };

    const FormatHeaderColor = (date) => {
        return FormatHeaders(date) === "TODAY" ? "#BE3C3C" : "white";
    };


    return(
        <>
            <div style={{height:'100%', overflow:'hidden'}}>
                {visibleTodos.length === 0 ? (
                    <p>2주 내에 할 일이 없습니다.</p>
                ) : (
                    visibleTodos.map(({ date, todos }) => (
                        <div key={date} id={`group-${date}`}>
                            <HeaderSpan
                            style={{fontSize:'15px', color: FormatHeaderColor(date)}}>
                                <strong style={{marginRight:'7px'}}>
                                    {FormatHeaders(date)}
                                </strong>
                                {new Date(date).getDate()}일
                            </HeaderSpan>
                            <TodoList>
                                {todos.map(todo => (
                                    <li key={todo.id}>{todo.title}</li>
                                ))}
                            </TodoList>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default FromTodayTodo;
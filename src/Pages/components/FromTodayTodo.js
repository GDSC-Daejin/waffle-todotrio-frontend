// FromTodayTodo.js
// 사이드 바 오늘 기준 해야할 일 리스트

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
        return FormatHeaders(date) === "오늘" ? "#BE3C3C" : "white";
    };


    return(
        <>
            <div style={{height:'100%', overflow:'hidden'}}>
                {groupedTodos.length === 0 ? (
                    <p>2주 내에 할 일이 없습니다.</p>
                ) : (
                    groupedTodos.map(({ date, todos }) => (
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
// MiniCalendar.js
// 메인페이지 사이드 바 미니 캘린더

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
registerLocale("ko", ko);

const Wrapper = styled.div`
    font-family: "Noto Sans KR", serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    
    .react-datepicker {
        background-color: transparent;
        border: none;
        width:100%;
        margin-top: 25px;

        .react-datepicker__month-container {
            width: 100%;
        }

        .react-datepicker__current-month {
            color: white;
            font-size: 18px;
            font-weight: bold;
            transform: translate(0,-4px);
            margin-bottom: 10px;
        }

        .react-datepicker__header {
            background-color: transparent;
            border-bottom: none;
            border-radius: 0;
        }

        .react-datepicker__day-names {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 1.4rem;
        }  

        .react-datepicker__day-name {
            width: 1.6rem;
            height: 1.6rem;
            font-size: 13px;
            color: white; 
        }
        .react-datepicker__day:hover {
            background-color: #516791;
        }

        .react-datepicker__triangle {
            display: none;
        }

        .react-datepicker__month {
            margin: 0;
            .react-datepicker__day {
                width: 1.6rem;
                height: 1.6rem;
                font-size: 12px;
                color: white;
                
            }

            .react-datepicker__day--outside-month {
                color: #818181;
            }

            .react-datepicker__day--selected {
                border-radius: 50px;
                background-color: #BE3C3C;
                color: white;
                font-weight: 400;
            }
        }
    }
`; 



const MiniCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
      <Wrapper>
        <DatePicker
            dateFormat='yyyy.MM.dd'
            locale="ko"
            shouldCloseOnSelect={false}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline // input없이 캘린더만
        />
      </Wrapper>
    );
}

export default MiniCalendar;
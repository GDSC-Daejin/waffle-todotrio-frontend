// AccountDropdown.js

import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Common/Authstate";

const CalendarLink = styled(Link)`
    color: white;
    text-decoration: none;
    position: absolute;

    &:active,
    &:focus {
        color: white;
        text-decoration: none;
    }
    span{
        font-size:40px;
        margin:10px;
    }
`;
const Backdrop = styled.div`
    display: ${({ isUserClicked }) => (isUserClicked ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index:50;
`;

const Wrapper = styled.div`
    position: fixed;
    top:10px;
    right:10px;
    z-index:30;
    height:100px;
    width:200px;
`;

const UserButton = styled.div`
    cursor: pointer;
    color: white;
    user-select: none;
    position: absolute;
    z-index:20;
    top:5px;
    right:70px;
`;

const Dropdown = styled.div`
    display: ${({ isUserClicked }) => (isUserClicked ? "block" : "none")};
    overflow: ${({ isUserClicked }) => (isUserClicked ? "visible" : "hidden")};
    background-color: #516791;
    border-radius: 10px;
    padding: 15px;
    padding-top : 35px;
    position: absolute;
    overflow: hidden;
    top: 60px;
    right: 30px;
    height: auto;
    width: 180px;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const MenuItem = styled(Link)`
    display: block;
    text-align: center;
    padding: 5px;
    margin: 15px;
    background-color: #3a4f76;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    font-size: 14px;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #2d3e5f;
    }
`;

const AccountDropdown = () => {
    const { user, isUserClicked, setIsUserClicked, logout } = useAuth();
    const location = useLocation();
    const hideLink = location.pathname === "/Main";

    return(
        <>
            {!hideLink && 
            <CalendarLink to="/Main" className="calendarLink">
                <span class="material-symbols-outlined icon-calendar">
                    calendar_month
                </span>
            </CalendarLink>
            }

            <Wrapper>
                {/* user 테스트용 */}
                <span style={{position:"absolute", right:"120px", top:"12px", whiteSpace: "nowrap", color:'white'}}>{user ? `${user.username}님` : ""}</span>

                <UserButton>
                    <span class="material-symbols-outlined" style={{fontSize:"40px"}}
                    onClick={() => setIsUserClicked(!isUserClicked)}>
                        account_circle
                    </span>                
                </UserButton>

                <Backdrop isUserClicked={isUserClicked} onClick={()=> setIsUserClicked(false)}>
                    <Dropdown isUserClicked={isUserClicked}>
                        <CloseButton onClick={() => setIsUserClicked(false)}>
                            <span class="material-symbols-outlined">close</span>
                        </CloseButton>

                        {user == null ? (<></>) : (
                            <>
                                <MenuItem to="/User">계정 관리</MenuItem>
                                <MenuItem as="a" onClick={logout}>
                                로그아웃
                                </MenuItem>                    
                            </>
                        )}

                        {/* 임시 내비게이션 바 */}
                        <div style={{}}>
                            <Link to="/Signup" style={{color:"white",display:'block'}}>회원가입</Link>
                            <Link to="/Dashboard" style={{color:"white",display:'block'}}>대쉬보드</Link>
                            <Link to="/Teams" style={{color:"white",display:'block'}}>팀 정보</Link>
                            <Link to="/User" style={{color:"white",display:'block'}}>회원정보</Link>
                        </div>

                    </Dropdown>                    
                </Backdrop>
            </Wrapper>        
        </>

    );
}

export default AccountDropdown;
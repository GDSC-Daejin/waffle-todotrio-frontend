// AccountDropdown.js
// 계정관리 및 로그아웃 드롭다운

import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Common/Authstate";


const BigWrapper = styled.div`
    background-color: #2D2F3C;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    user-select: none;
`;
const CalendarLink = styled(Link)`
    color: white;
    text-decoration: none;
    position: absolute;
    top:15px;
    left:15px;

    &:active,
    &:focus {
        color: white;
        text-decoration: none;
    }
    span{
        font-size:45px;
        transform: translate(0, 4px);
    }
`;


const Wrapper = styled.div`
    position: absolute;
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

const Backdrop = styled.div`
    display: ${({ isUserClicked }) => (isUserClicked ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
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
    color: white;
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
        <BigWrapper>
            {!hideLink && 
            <div>

                <CalendarLink to="/Main" className="calendarLink">
                    <img src="/logo.png" alt="Todotrio Logo" style={{width:'80px', height:'auto', marginRight:'20px'}}/>
                </CalendarLink>
            </div>}

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
                                {user.username === "admin" ? (
                                    <MenuItem to="/Admin">관리자 페이지</MenuItem>
                                ) : (
                                    <MenuItem to="/User">계정 관리</MenuItem>
                                )}
                                <MenuItem as="a" onClick={logout}>
                                로그아웃
                                </MenuItem>                    
                            </>
                        )}

                    </Dropdown>                    
                </Backdrop>
            </Wrapper>       
        </BigWrapper> 
    );
}

export default AccountDropdown;
// AccountDropdown.js

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../Common/Authstate";


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
    const { user, isUserClicked, setIsUserClicked, logout } = useAuth()


    return(
            <Wrapper>
                
                {/* user 테스트용 */}
                <span style={{position:"absolute", right:"120px", top:"12px", whiteSpace: "nowrap"}}>{user ? `${user.username}님` : ""}</span>

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

                        {user == null ? (
                            <>
                                {/* <MenuItem to="/Login">로그인</MenuItem>
                                <MenuItem to="/Signup">회원가입</MenuItem> */}
                            </>
                        ) : (
                            <>
                                <MenuItem to="/User">계정 관리</MenuItem>
                                <MenuItem as="a" onClick={logout}>
                                로그아웃
                                </MenuItem>                    
                            </>
                        )}
                    </Dropdown>                    
                </Backdrop>

            </Wrapper>
    );
}

export default AccountDropdown;
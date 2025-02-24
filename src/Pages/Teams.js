// Teams.js
// 그룹 페이지

import { useState } from "react";
import styled from "styled-components";

const AddGroupForm = styled.form`
    display:block;
    position: absolute;
    top:100px;
    color: white;

    label {
        display: block;
        margin-bottom:20px;
    }
    input, select, textarea {
        position: absolute;
        left:100px;
    }
    select {
        transform: translate(0,5px);
    }
`;

const Teams = () => {

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGroup = {
            name : groupName,
            description: groupDescription
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newGroup)
            });

            const result = await response.json();
            console.log("서버응답:",result);

            if (response.ok) {
                alert("그룹이 생성되었습니다!");
                setGroupName("");
                setGroupDescription("");
            } else {
                alert(`그룹 생성 실패: ${result.message}`);
            }
        } catch (error) {
            console.error("그룹 생성 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    return(
        <div>
            <AddGroupForm onSubmit={handleSubmit}>
                <label>그룹 이름:
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </label>

                <label>설명:
                    <input
                        type="text"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">생성</button>
            </AddGroupForm>

        </div>
    );
}

export default Teams;
// TodoDetailModal.js
// 할 일 상세정보 모달창

import { useEffect, useState } from "react";
import { Wrapper, Form, CloseButton, EditButton, SaveButton, ShareButton, DeleteButton, CompleteButton, Sharer } from "../../Styles/TodoDetailModalStyle";
import TextareaAutosize from 'react-textarea-autosize';
import ShareTodoModal from "./ShareTodoModal";



const TodoDetailModal = ({isOpen, onClose, todo, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [successRate, setSuccessRate] = useState(null);
    const [sharedUser, setSharedUser] = useState([]);
    const [editedTodo, setEditedTodo] = useState({
        title: "",
        content: "",
        priority: "",
        status: "",
        startDate: "",
        deadline: "",
    });
    const token = localStorage.getItem("token");

    // 모달 열릴 때 편집모드 초기화
    useEffect(() => {
        if (isOpen) {
            setIsEditing(false);
            setIsSearching(false);
        }
    }, [isOpen]);

    // 공유자 정보 가져오기
    useEffect(() => {
        const fetchSharedUser = async () => {
            if (!todo) return;

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/share/${todo.id}/sharer`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setSharedUser(responseData.data || {});
                    console.log("공유자 데이터", responseData.data);

                } else {
                    const errorResponse = await response.json();

                    // console.error("공유자 목록 가져오기 실패:", response.status, errorResponse);
                }
            } catch (error) {
                console.error("공유자 목록 요청 오류:", error);
            }
        };
        fetchSharedUser();
    }, [todo, token, setSharedUser]);

    // 예상성공률 가져오기
    useEffect(() => {
        const fetchSuccessRate = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}/success-probability`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                    
                });
                // console.log("토큰:", token);
                // console.log("성공률API todo id:", todo.id);
    
                if (response.ok) {
                    // console.log("OK:", response);
                    const data = await response.json();
                    // console.log("성공률 data 객체:", data);
                    // console.log("성공률 객체 중 data:", data.data);
                    setSuccessRate(data.data);
                    
                    
                } else {
                    console.error("성공률을 가져오기 실패");
                }
            } catch (error) {
                console.error("성공률api 호출 오류:", error);
            }
        };
    
        if (todo) {
            fetchSuccessRate();
        }
    }, [todo, token]);
    

    useEffect(() => {
        if (todo) {
            const addNineHours = (dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                date.setHours(date.getHours() + 9);
                return date.toISOString().split("T")[0];
            };

            setEditedTodo({
                title: todo.title,
                content: todo.extendedProps?.content || "",
                priority: todo.extendedProps.priority,
                status: todo.extendedProps.status,
                startDate: addNineHours(todo.startDate),
                deadline: addNineHours(todo.deadline)
            });

        }
    }, [todo]);

    // 코드 삭제할지 검토
    if (!isOpen || !todo) return null;   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value
        });
    };

    // 할 일 완료 처리
    const handleComplete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}/complete`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
    
            if (result.success) {
                alert("진행상황 수정 완료!");
            } else {
                alert("진행상황 수정 실패");
                return;
            }
        } catch (error) {
            console.error("진행상황 수정 처리 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    //버튼 1개로 취소까지 정상작동하는거 확인되고나면 handleProgress 삭제 
    // 할 일 완료 취소 처리
    // const handleProgress = async () => {
    
    //     try {
    //         const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}/restart`, {
    //             method: "PUT",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 "Content-Type": "application/json"
    //             }
    //         });
    
    //         const result = await response.json();
    //         console.log("서버 응답:", result);
    
    //         if (result.success) {
    //             alert("할 일이 완료되었습니다!");
    //         } else {
    //             alert("완료 처리에 실패했습니다.");
    //         }
    //     } catch (error) {
    //         console.error("완료 처리 오류:", error);
    //         alert("네트워크 오류가 발생했습니다.");
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const addNineHours = (dateString) => {
                if (!dateString) return null;
                const date = new Date(dateString);
                date.setHours(date.getHours() + 9);
                return date.toISOString();
            };

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: editedTodo.title,
                    content: editedTodo.content,
                    priority: editedTodo.priority,
                    status: editedTodo.status,
                    startDate: addNineHours(editedTodo.startDate),
                    deadline: addNineHours(editedTodo.deadline)
                })
            });
            const result = await response.json();
            if (result.success) {
                alert("할 일이 수정되었습니다!");
                onClose();
            } else {
                alert("수정에 실패했습니다.");
                console.log("응답:", response);
            }
        } catch (error) {
            console.error("수정 오류:", error);
            alert("네트워크 오류가 발생했습니다.");
        }
    };

    return(
        <Wrapper>
            <div>
                <CloseButton onClick={onClose}>
                    <span class="material-symbols-outlined"
                    style={{fontSize:'30px'}}>close</span>
                </CloseButton>
                {!isEditing &&
                <EditButton onClick={()=>setIsEditing(true)}>
                    <span class="material-symbols-outlined"
                    style={{fontSize:'30px'}}>edit</span>
                </EditButton>}
                <Form onSubmit={handleSubmit}>
                    <label style={{color:'#B266FF'}}>
                        <span class="material-symbols-outlined"
                        style={{fontSize:'25px', transform:'translate(0,5px)',marginRight:'7px'}}>orbit</span>
                        <strong>할 일 예상 성공률 : {successRate ? `${successRate}` : "예측 불가"}</strong>
                    </label>
                    {sharedUser.length > 0 && (
                        <label>
                            <Sharer>{sharedUser}</Sharer>
                        </label>
                    )}
                    <label>
                        <h3>
                            <span style={{position:'absolute',top:'50px'}}>
                                {todo.extendedProps?.category ? `[${todo.extendedProps.category}]`: ""}                                
                            </span>

                            <TextareaAutosize name="title"
                                value={editedTodo.title}
                                onChange={handleChange}
                                required
                                className="input-todotitle"
                                disabled={!isEditing}
                                style={{marginLeft:'60px'}}
                            />                            
                        </h3>
                    </label>
                    <label>
                        <input type="date" name="startDate"
                            value={editedTodo.startDate}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                        />
                        <span class="material-symbols-outlined" style={{margin:'0'}}>minimize</span>
                        <input type="date" name="deadline"
                            value={editedTodo.deadline}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                        />
                    </label>
                    <label>
                        <span class="material-symbols-outlined"
                        style={{position:'absolute'}}>notes</span>
                        <TextareaAutosize name="content"
                            value={editedTodo.content}
                            onChange={handleChange}
                            disabled={!isEditing}
                            style={{position:'relative', marginLeft:'40px'}}
                        />
                    </label>
                    <label>
                        <span class="material-symbols-outlined">star</span>
                        <select name="priority"
                            value={editedTodo.priority}
                            onChange={handleChange}
                            disabled={!isEditing}
                        >
                            <option value="HIGH">높음</option>
                            <option value="MEDIUM">중간</option>
                            <option value="LOW">낮음</option>
                        </select>
                    </label>
                    <label>
                        <span class="material-symbols-outlined">progress_activity</span>
                        <select name="status"
                            value={editedTodo.status}
                            onChange={handleChange}
                            disabled={!isEditing}
                        >
                            <option value="DELAYED">지연</option>
                            <option value="IN_PROGRESS">진행중</option>
                            <option value="COMPLETED">완료</option>
                        </select>
                    </label>
                    {isEditing && <SaveButton type="submit">수정내용 저장</SaveButton>}
                </Form>
                <CompleteButton onClick={handleComplete}>
                    {editedTodo.status === "COMPLETED" ? "완료 취소 버튼" : "완료 버튼"}
                </CompleteButton>
                {/* <CompleteButton onClick={handleProgress}>
                    완료 취소 버튼
                </CompleteButton> */}
                {!isEditing &&
                    <ShareButton onClick={()=>setIsSearching(true)}>
                        <span class="material-symbols-outlined"
                        style={{fontSize:'40px'}}>
                            ios_share
                        </span>                        
                    </ShareButton>
                }
                {isEditing && <DeleteButton onClick={() => onDelete(todo.id)}>할 일 삭제</DeleteButton>}
                {isSearching &&
                    <ShareTodoModal
                        todo={todo}
                        onClose={()=>setIsSearching(false)}
                />}
            </div>
        </Wrapper>
    );
};

export default TodoDetailModal;
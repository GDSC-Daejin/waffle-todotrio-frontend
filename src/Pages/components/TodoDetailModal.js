// TodoDetailModal.js
// 할 일 상세정보 모달창

import { useEffect, useState } from "react";
import { Wrapper, Form, CloseButton, EditButton, SaveButton, ShareButton, DeleteButton, CompleteButton, Sharer } from "../../Styles/TodoDetailModalStyle";
import TextareaAutosize from 'react-textarea-autosize';
import ShareTodoModal from "./ShareTodoModal";
import useAPI from "../../Hooks/useAPI";


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
    const { data, fetchData } = useAPI();

    // todo 상세 모달 열릴 때 편집모드 초기화
    useEffect(() => {
        if (isOpen) {
            setIsEditing(false);
            setIsSearching(false);
        }
    }, [isOpen]);

    useEffect(()=>{
        if (!todo) return;
        fetchData("todos/share/${todo.id}/sharer", "GET", null, token, "공유자 조회");
        if (data && data.success) {
            setSharedUser(data.data || {});
        } else {
            alert("공유자 조회 실패");
        }                
    },[todo, token, setSharedUser]);

    useEffect(()=>{
        if (!todo) return;
        fetchData("todos/${todo.id}/success-probability", "GET", null, token, "성공률 가져오기");
        if (data && data.success) {
            setSuccessRate(data.data);
        } else {
            alert("성공률 가져오기 실패");
        }                
    },[todo, token]);

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

    if (!isOpen || !todo) return null;   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value
        });
    };

    const handleComplete = async (e) => {
        e.preventDefault();

        await fetchData("auth/signup", "POST", null, null, "일정 완료 처리");
        if (data && data.success) {
            alert("일정 완료 처리 완료!");
        } else {
            alert("일정 완료 처리 실패")        
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addNineHours = (dateString) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 9);
            return date.toISOString();
        };
        await fetchData(
            "todos/${todo.id}",
            "PUT",
            {
                title: editedTodo.title,
                content: editedTodo.content,
                priority: editedTodo.priority,
                category: editedTodo.category,
                status: editedTodo.status,
                startDate: addNineHours(editedTodo.startDate),
                deadline: addNineHours(editedTodo.deadline)
            },
            null,
            "일정 수정"
        );
        if (data && data.success) {
            alert("일정이 수정되었습니다!");
            onClose();
        } else {
            alert("일정 수정 실패")        
        }
    }

    const statusMap = {
        DELAYED: "지연",
        IN_PROGRESS: "진행중",
        COMPLETED: "완료"
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
                                style={{marginLeft:'60px', width:'220px'}}
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
                            style={{position:'relative', marginLeft:'40px', width:'220px'}}
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
                        <span style={{marginLeft:'15px', transform:'translate(50%, 0)'}}>{statusMap[editedTodo.status]}</span>
                    </label>
                    {isEditing && <SaveButton type="submit">수정내용 저장</SaveButton>}
                </Form>
                <CompleteButton onClick={handleComplete} disabled={editedTodo.status === "COMPLETED"}>
                    완료 버튼
                </CompleteButton>
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
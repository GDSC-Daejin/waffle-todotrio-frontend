// useAPI.js

import { useState } from "react";

function useAPI () {
    const [data, setData] = useState(null);

    const fetchData = async (endpoint, method ,body=null, token, catchError="API 작업실패") => {

        // 헤더와 본문 설정
        const options = {
            method: method,
            headers: {
                ...(token ? {"Authorization": `Bearer ${token}`} : {}),
                "Content-Type": "application/json"
            },
        };
        if(body) {
            options.body = JSON.stringify(body);
        }

        // API 요청 실행
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/${endpoint}`, options);
            const serverResult = await response.json();

            if(response.ok) {
                setData(serverResult);
                return serverResult;
            }
            else {
                console.error(`${catchError} - 실패`)
                throw new Error(serverResult.message || "api요청실패");
            }
        }
        catch(error) {
            console.error(`${catchError} - 오류 발생`, error);
        }
    };
    return {data, fetchData};
}

export default useAPI;
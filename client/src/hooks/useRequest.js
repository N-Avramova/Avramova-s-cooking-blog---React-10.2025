import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const baseUrlToDataStorage = 'http://localhost:3030/'


export default function useRequest(url, initialState) {
    
    const { user, isAuthenticated } = useContext(UserContext);
    const [data, setData] = useState(initialState);
    const requestData = async (url, method, data, config = {}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken,
            }
        }
        
        if(user?.isAdmin){
            options.headers = {
                ...options.headers,
                'X-Admin': true,
            }
        }

        const response = await fetch(`${baseUrlToDataStorage}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        const result = await response.json();

        return result;
    }

      useEffect(() => {
        if (!url) return;

        requestData(url)
            .then(result => setData(result))
            .catch(err => alert(err));
    }, [url]);

    return {
        requestData,
        data,
        setData
    }
}

import axios from 'axios';
import { useState } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);

    const request = async ({
        url, 
        method = 'GET', 
        body = null, 
        headers = { 'Content-Type': 'application/json' }
    }) => {
        setLoading(true);
        return await axios.get(url)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
                console.log(`Could not fetch ${url}, status:${error.response.status} `);
                throw error;
            })
            .finally(function () {
                setLoading(false);
            });
    }

    return { request, loading, setLoading };
}




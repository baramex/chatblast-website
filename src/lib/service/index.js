import axios from 'axios';
import { resetSession } from './authentification';

export function api(endpoint, method, data = undefined, customHeader = undefined) {
    return new Promise((res, rej) => {
        // -> axios clear data
        const copyData = data ? { ...data } : undefined;
        const copyHeader = customHeader ? { ...customHeader } : undefined;

        axios({
            method,
            url: "http://localhost:5000" + endpoint,
            data,
            headers: customHeader,
            withCredentials: true
        }).then(response => {
            res(response.data);
        }).catch(err => {
            const response = err.response;
            if (!response) return rej(new Error());
            const status = response.status;
            const time = err.response.headers["retry-after"];
            if (status === 429 && time && time * 1000 < 10000) {
                setTimeout(() => {
                    api(endpoint, method, copyData, copyHeader).then(res).catch(rej);
                }, time * 1000);
            }
            else if (status === 401) {
                resetSession();
                if (response.data === "refresh") document.location.reload();
                rej(new Error(response.data));
            }
            else {
                const message = response.data;
                rej(new Error(message));
            }
        });
    });
}
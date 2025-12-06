const baseUrlToDataStorage = 'http://localhost:3030/'

export default function useRequest() {
    const requestData = async (url, method, data) => {
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

        const response = await fetch(`${baseUrlToDataStorage}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        const result = await response.json();

        return result;
    }

    return {
        requestData
    }
}

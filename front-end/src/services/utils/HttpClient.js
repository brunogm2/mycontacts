import delay from "../../utils/delay";
import APIError from "../../errors/APIError";

class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(path, options) {
        return this.makeRequest(path, { 
            method: 'GET',
            headers: options?.headers
        });
    }

    post(path, options) { 
        return this.makeRequest(path, {
            method: 'POST',
            body: options?.body, 
            headers: options?.headers
        })
    }

    put(path, options) { 
        return this.makeRequest(path, {
            method: 'PUT',
            body: options?.body, 
            headers: options?.headers
        })
    }

    delete(path, options) { 
        // await delay(5000);

        return this.makeRequest(path, {
            method: 'delete',
            headers: options?.headers
        })
    }

    async makeRequest(path, options) {
        await delay(1000);

        const headers = new Headers();

        if (options.body) {
            headers.append('Content-Type', 'application/json')
        }

        if (options.headers) {
            Object.entries(options.headers).forEach(([name, value]) => {
                headers.append(name, value)
            });
        }

        const response = await fetch(`${this.baseUrl}${path}`, {
            method: options.method,
            body: JSON.stringify(options.body),
            headers
        });

        let responseBody = null;
        const contentType = response.headers.get('Content-Type');

        if (contentType?.includes('application/json')) {
            responseBody = await response.json();
        }
        
        if (response.ok) {
            return responseBody;
        }

        throw new APIError(response, responseBody);
    }
}

export default HttpClient;
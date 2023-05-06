import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3002/api'
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
}

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
}

export const put = async (path, data, options = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
}

export const deleteAPI = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
}

export default request;
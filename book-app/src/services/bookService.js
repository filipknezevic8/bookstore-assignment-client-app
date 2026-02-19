import AxiosConfig from './axiosConfig';

const RESOURCE = '/Books';

export const getAllBooks = async () => {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export const deleteBook = async (id) => {
    const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
    return response.data;
}

export const getBookById = async (id) => {
    const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
    return response.data;
}

export const createBook = async (book) => {
    const response = await AxiosConfig.post(RESOURCE, book);
    return response.data;
}

export const updateBook = async (id, book) => {
    const response = await AxiosConfig.put(`${RESOURCE}/${id}`, book);
    return response.data;
}
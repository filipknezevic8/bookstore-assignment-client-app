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

export const fetchSortedBooks = async (sortType) => {
    let response = null;

    if (sortType !== undefined && sortType !== null && sortType !== '') {
        response = await AxiosConfig.get(`${RESOURCE}/sort?sortType=${sortType}`);
    } else {
        response = await AxiosConfig.get(`${RESOURCE}/sort`);
    }

    return response.data;
}

export const fetchSortTypes = async () => {
    const response = await AxiosConfig.get(`${RESOURCE}/sortTypes`);
    return response.data;
}

export const fetchFilteredAndSortedBooks = async (data, sortType) => {
    let response = null;

    if (sortType !== undefined && sortType !== null && sortType !== '') {
        response = await AxiosConfig.post('/Books/filterAndSort?sortType=' + sortType, data);
    } else {
        response = await AxiosConfig.post('/Books/filterAndSort', data);
    }

    return response.data;
}
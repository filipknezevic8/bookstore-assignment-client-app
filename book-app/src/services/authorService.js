import AxiosConfig from './axiosConfig';

const RESOURCE = '/Authors';

export const getAllAuthors = async () => {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export const fetchAuthorsPage = async (page) => {
    const response = await AxiosConfig.get('/Authors/paging?page=' + page);
    return response.data;
}
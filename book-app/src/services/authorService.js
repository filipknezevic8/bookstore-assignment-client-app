import AxiosConfig from './axiosConfig';

const RESOURCE = '/Authors';

export const getAllAuthors = async () => {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}
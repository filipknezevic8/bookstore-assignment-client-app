import AxiosConfig from './axiosConfig';

const RESOURCE = '/Publishers';

export const getAllPublishers = async () => {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export const fetchSortedPublishers = async (sortType) => {
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
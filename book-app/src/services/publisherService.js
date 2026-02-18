import AxiosConfig from './axiosConfig';

const RESOURCE = '/Publishers';

export const getAllPublishers = async () => {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}
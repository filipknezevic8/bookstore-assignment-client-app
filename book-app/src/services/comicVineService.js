import AxiosConfig from './axiosConfig';

export const searchVolumesByName = async (filter) => {
    const response = await AxiosConfig.get(`/Volumes/search?filter=${encodeURIComponent(filter)}`);
    return response.data;
};

export const searchIssuesByVolumeId = async (volumeId) => {
    const response = await AxiosConfig.get(`/Issues/search?volumeId=${volumeId}`);
    return response.data;
};

export const createIssue = async (data) => {
    const response = await AxiosConfig.post('/Issues', data);
    return response.data;
};
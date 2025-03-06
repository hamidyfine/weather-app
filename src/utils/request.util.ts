import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Sends an HTTP request using axios.
 * @param config - The configuration object for the request.
 * @returns - A promise that resolves with the response data.
 */
export const request = async ({
    data,
    headers,
    method,
    params,
    url,
    ...props
}: AxiosRequestConfig): Promise<AxiosResponse> => {
    const _method = method || 'GET';
    const _url = url;

    if (!_url) {
        throw new Error('url is required');
    }

    const response = await axiosInstance({
        data,
        headers,
        method: _method,
        params,
        url: _url,
        ...props,
    });

    return response;
};

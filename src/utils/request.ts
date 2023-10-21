import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Sends an HTTP request using axios.
 * @param {AxiosRequestConfig} config - The configuration object for the request.
 * @returns {Promise<AxiosResponse>} - A promise that resolves with the response data.
 * @throws {Error} - If the url is not provided.
 */
export const request = async ({
    method,
    url,
    data,
    params,
    headers,
    ...props
}: AxiosRequestConfig): Promise<AxiosResponse> => {
    const _method = method || 'GET';
    const _url = url;

    if (!_url) {
        throw new Error('url is required');
    }

    const response = await axiosInstance({
        method: _method,
        url: _url,
        data,
        params,
        headers,
        ...props,
    });

    return response;
};

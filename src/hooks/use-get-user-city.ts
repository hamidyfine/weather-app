import { useEffect, useState } from 'react';
import { request } from '../utils/request';

/**
 * Hook to get the user's geo data based on their IP address using the Geoapify API.
 * @returns An object containing the user's city, geographic information, loading state, error state, and a function to refetch the data.
 */
const useGetUserCity = () => {
    const [geo, setGeo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | unknown | null>(null);

    /**
     * Fetches the user's geographic information based on their IP address using the Geoapify API.
     */
    const fetch = () => {
        setLoading(true);
        request({
            method: 'GET',
            url: 'https://api.geoapify.com/v1/ipinfo?apiKey=a81065d3495e4ad1b65fc2aae4cede23',
        }).then((response) => {
            setGeo(() => response.data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        /**
         * Indicates whether the data is currently being fetched.
         */
        is_loading: loading,
        /**
         * An error object if the fetch fails, otherwise null.
         */
        error,
        /**
         * The user's geographic information.
         */
        user_geo: geo,
        /**
         * The user's city name, extracted from their geographic information.
         */
        user_city: geo?.city.name,
        /**
         * A function to refetch the user's geographic information.
         */
        fetch,
    };
};

export default useGetUserCity;

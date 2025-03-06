import { useEffect, useState } from 'react';

import { request } from '@/utils/request.util';

/**
 * Hook to get the user's geo data based on their IP address using the Geoapify API.
 * @returns An object containing the user's city, geographic information, loading state, error state, and a function to refetch the data.
 */
export const useGetUserCity = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [geo, setGeo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null | unknown>(null);
    const key = import.meta.env.VITE_GEO_API_KEY;

    /**
     * Fetches the user's geographic information based on their IP address using the Geoapify API.
     */
    const fetch = () => {
        setLoading(true);
        request({
            method: 'GET',
            url: `https://api.geoapify.com/v1/ipinfo?apiKey=${key}}`,
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
    }, []);

    return {
        /**
         * An error object if the fetch fails, otherwise null.
         */
        error,
        /**
         * A function to refetch the user's geographic information.
         */
        fetch,
        /**
         * Indicates whether the data is currently being fetched.
         */
        is_loading: loading,
        /**
         * The user's city name, extracted from their geographic information.
         */
        user_city: geo?.city.name,
        /**
         * The user's geographic information.
         */
        user_geo: geo,
    };
};

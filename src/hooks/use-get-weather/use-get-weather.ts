import { useState } from 'react';

import { request } from '@/utils/request.util';

/**
 * Hook to fetch weather data from the Weather API for given city
 * @returns An object containing the weather data, loading state, error message, and a fetch function.
 */
export const useGetWeather = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const key = import.meta.env.VITE_WEATHER_API_KEY;

    /**
     * Fetches weather data from the Weather API for a given city.
     * @param city - The name of the city to fetch weather data for.
     */
    const fetch = (city: string) => {
        setLoading(true);
        request({
            method: 'GET',
            url: `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=4&aqi=yes&alerts=no`,
        }).then((response) => {
            setWeather(() => response.data);
        }).catch((error) => {
            setError(error?.response.data.error.message);
        }).finally(() => {
            setLoading(false);
        });
    };

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
         * The city's weather data.
         */
        weather,
    };
};

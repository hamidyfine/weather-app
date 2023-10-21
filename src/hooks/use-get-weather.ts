import { useState } from 'react';
import { request } from '../utils/request';

/**
 * Hook to fetch weather data from the Weather API for given city
 * @returns An object containing the weather data, loading state, error message, and a fetch function.
 */
const useGetWeather = () => {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches weather data from the Weather API for a given city.
     * @param city - The name of the city to fetch weather data for.
     */
    const fetch = (city: string) => {
        setLoading(true);
        request({
            method: 'GET',
            url: `http://api.weatherapi.com/v1/forecast.json?key=0f26f32448a24b37808130258232010&q=${city}&days=4&aqi=yes&alerts=no`,
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
         * Indicates whether the data is currently being fetched.
         */
        is_loading: loading,
        /**
         * An error object if the fetch fails, otherwise null.
         */
        error,
        /**
         * The city's weather data.
         */
        weather,
        /**
         * A function to refetch the user's geographic information.
         */
        fetch,
    };
};

export default useGetWeather;

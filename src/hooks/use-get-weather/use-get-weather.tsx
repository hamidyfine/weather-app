import { useQuery } from '@tanstack/react-query';

import { useWeatherStore } from '@/stores';

export const useGetWeather = () => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const { city } = useWeatherStore();

    const { data, error, isLoading, refetch } = useQuery({
        enabled: false,
        queryFn: async () => {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${key}&days=7`,
            );
            return await response.json();
        },
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: [`get-${city}-weather`],
        retry: false,
    });

    return {
        error,
        getWeather: refetch,
        is_loading: isLoading,
        weather: data,
    };
};

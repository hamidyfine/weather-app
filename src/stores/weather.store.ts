/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

import type { Weather } from '@/types';

interface WeatherState {
    city: null | string;
    error: string;
    setCity: (city: null | string, is_user_location?: boolean) => void;
    setError: (error: string) => void;
    setUnit: (unit: string) => void;
    setWeather: (data: null | Weather) => void;
    unit: {
        slug: string;
        title: string;
    };
    w: {
        current: any;
        forecast: any;
    };
    weather: null | Weather;
}

export const useWeatherStore = create<WeatherState>((set) => ({
    city: '',
    error: '',
    setCity: (city, is_user_location = false) => {
        if (!is_user_location) {
            const history = JSON.parse(localStorage.getItem('history') || '[]');
            if (!history.includes(city)) {
                history.push(city);
            } else {
                const index = history.indexOf(city);
                history.splice(index, 1);
                history.push(city);
            }
            localStorage.setItem('history', JSON.stringify(history));
        }
        set(() => ({ city }));
    },
    setError: (error) =>
        set(() => ({ error })),
    setUnit: (unit) =>
        set(() => ({
            unit: {
                slug: unit,
                title: unit === 'cen' ? '°C' : '°F',
            } })),
    setWeather: (weather) =>
        set(() => ({ weather })),
    unit: {
        slug: 'cen',
        title: '°C',
    },
    w: {
        current: '',
        forecast: '',
    },
    weather: null,
}));

export default useWeatherStore;

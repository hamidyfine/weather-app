/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface WeatherState {
    city: string;
    data: any;
    error: string;
    setCity: (city: string) => void;
    setError: (error: string) => void;
    setUnit: (unit: string) => void;
    setWeather: (data: any) => void;
    unit: string;
    unit_title: string;
}

export const useWeatherStore = create<WeatherState>((set) => ({
    city: '',
    data: null,
    error: '',
    setCity: (city) => {
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        if (!history.includes(city)) {
            history.push(city);
        } else {
            const index = history.indexOf(city);
            history.splice(index, 1);
            history.push(city);
        }
        localStorage.setItem('history', JSON.stringify(history));
        set(() => ({ city }));
    },
    setError: (error) =>
        set(() => ({ error })),
    setUnit: (unit) =>
        set(() => ({ unit, unit_title: unit === 'cen' ? '°C' : '°F' })),
    setWeather: (data) =>
        set(() => ({ data })),
    unit: 'cen',
    unit_title: '°C',
}));

export default useWeatherStore;

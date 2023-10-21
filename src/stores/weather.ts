import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface WeatherStates {
    data: any;
    unit: string;
    city: string;
    unit_title: string;
    error: string;
}

const initialState: WeatherStates = {
    data: null,
    unit: 'cen',
    unit_title: '°C',
    city: '',
    error: '',
};

/**
 * Weather slice for managing weather data and settings.
 */
export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        /**
         * Sets the unit of temperature measurement and updates the unit title.
         * @param state - The current state of the weather slice.
         * @param action - The payload action containing the new unit value.
         */
        setUnit: (state, action: PayloadAction<string>) => {
            state.unit = action.payload;
            state.unit_title = action.payload === 'cen' ? '°C' : '°F';
        },
        /**
         * Sets the weather data for the current city.
         * @param state - The current state of the weather slice.
         * @param action - The payload action containing the new weather data.
         */
        setWeather: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        },
        /**
         * Sets the current city and updates the search history.
         * @param state - The current state of the weather slice.
         * @param action - The payload action containing the new city value.
         */
        setCity: (state, action: PayloadAction<string>) => {
            localStorage.getItem('history');
            const _history = JSON.parse(localStorage.getItem('history') || '[]');
            if (!_history.includes(action.payload)) {
                _history.push(action.payload);
                localStorage.setItem('history', JSON.stringify(_history));
            } else {
                const _index = _history.indexOf(action.payload);
                _history.splice(_index, 1);
                _history.push(action.payload);
                localStorage.setItem('history', JSON.stringify(_history));
            }
            state.city = action.payload;
        },
        /**
         * Sets the error message for the weather slice.
         * @param state - The current state of the weather slice.
         * @param action - The payload action containing the new error message.
         */
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export type { WeatherStates };
export const { setUnit, setWeather, setCity, setError } = weatherSlice.actions;
export default weatherSlice.reducer;

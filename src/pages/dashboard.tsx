import { Container } from '@mantine/core';
import { useEffect } from 'react';

import { WeatherForecast } from '@/components';
import { createFileRoute, useNavigate } from '@/router';
import { useWeatherStore } from '@/stores';

export const Route = createFileRoute('/dashboard')({
    component: Dashboard,
});

function Dashboard() {
    const { weather } = useWeatherStore();
    const navigate = useNavigate();

    /**
     * Return to home page if there is no weather data.
     */
    useEffect(() => {
        if (!weather) {
            navigate({
                to: '/',
            });
        }
    }, [navigate, weather]);

    return (
        <Container className="w-full">
            <WeatherForecast />
        </Container>
    );
}

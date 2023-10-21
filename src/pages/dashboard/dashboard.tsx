import { Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Weather } from '../../components';
import { RootState } from '../../stores';

const Dashboard = () => {
    const weather = useSelector((state: RootState) => state.weather);
    const navigate = useNavigate();

    /**
     * Return to home page if there is no weather data.
     */
    useEffect(() => {
        if (!weather.data) {
            navigate('/');
        }
    }, [navigate, weather.data]);

    return (
        <Container className="w-full">
            <Weather weather={weather?.data} />
        </Container>
    );
};

export default Dashboard;

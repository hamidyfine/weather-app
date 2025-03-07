import { Button, Stack } from '@mantine/core';
import { LocateFixed } from 'lucide-react';
import { useEffect } from 'react';

import HomeSvg from '@/assets/home.svg';
import { HistoryList, SearchForm } from '@/components';
import { useGetUserGeoByIp } from '@/hooks';
import { createFileRoute, useNavigate } from '@/router';
import { useWeatherStore } from '@/stores';

export const Route = createFileRoute('/')({
    component: Home,
});

function Home() {
    const { setCity, weather } = useWeatherStore();
    const { geo } = useGetUserGeoByIp();
    const navigate = useNavigate();

    useEffect(() => {
        if (weather) {
            navigate({
                to: '/dashboard',
            });
        } else {
            navigate({
                to: '/',
            });
        }
    }, [weather]);

    return (
        <Stack
            align="center"
            className="w-full"
            gap="md"
            justify="center"
        >
            <img
                className="h-[350px]"
                src={HomeSvg}
            />
            <SearchForm />

            <Button
                color="gray"
                disabled={!geo}
                leftSection={<LocateFixed size={14} />}
                radius="xl"
                size="xs"
                variant="outline"
                onClick={() => setCity(`${geo?.lat},${geo?.lon}`, true)}
            >
                {`Use my current location (${geo?.city})`}
            </Button>

            <HistoryList />
        </Stack>
    );
}

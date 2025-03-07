import { Button, Flex, Grid, Group, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect } from 'react';

import { useGetWeather } from '@/hooks';
import { useNavigate } from '@/router';
import { useWeatherStore } from '@/stores';
import type { Forecastday } from '@/types';

import { WeatherCurrentForecast } from './current.weather';

export const WeatherForecast = () => {
    const getIconUrl = (url: string) => url.replace('//cdn.weatherapi.com/', '/');
    const { setCity, setUnit, setWeather, unit, weather } = useWeatherStore();
    const navigate = useNavigate();
    const { getWeather, weather: refreshed_data } = useGetWeather();

    useEffect(() => {
        if (refreshed_data) setWeather(refreshed_data);
    }, [refreshed_data]);

    if (!weather) return null;

    const forecast = JSON.parse(JSON.stringify(weather.forecast.forecastday));

    const onBackClicked = () => {
        setWeather(null);
        setCity(null);
        navigate({
            to: '/',
        });
    };

    return (
        <div>
            <Flex
                align="center"
                gap="md"
                justify="space-between"
            >
                <Title
                    order={1}
                    size="h3"
                >
                    Current Weather
                </Title>

                <Flex
                    align="center"
                    gap="sm"
                    justify="flex-end"
                >
                    <SegmentedControl
                        value={unit.slug}
                        data={[
                            { label: '°C', value: 'cen' },
                            { label: '°F', value: 'far' },
                        ]}
                        onChange={(value) => setUnit(value)}
                    />
                    <Button onClick={() => getWeather()}>
                        Refresh
                    </Button>
                    <Button
                        color="red"
                        variant="light"
                        onClick={() => onBackClicked()}
                    >
                        Back
                    </Button>
                </Flex>
            </Flex>

            <WeatherCurrentForecast
                location={weather.location}
                weather={weather.current}
            />

            <Grid gutter="md">
                {forecast.map((day: Forecastday, index: number) => (
                    <Grid.Col
                        key={index}
                        span={{ base: 12, md: 4 }}
                    >
                        <Stack
                            key={index}
                            align="flex-start"
                            className="gap-2 bg-gray-50 rounded-lg border-solid border-gray-200"
                            justify="flex-start"
                            p={12}
                        >
                            <Group
                                align="center"
                                className="w-full flex-grow"
                                gap="sm"
                                justify="space-between"
                            >
                                <Text
                                    fw={500}
                                    size="lg"
                                >
                                    {dayjs(day.date).format('dddd')}
                                </Text>
                                <Text
                                    fw={400}
                                    size="sm"
                                >
                                    {dayjs(day.date).format('MM/DD')}
                                </Text>
                            </Group>

                            <Group
                                align="flex-end"
                                className="w-full flex-grow"
                                gap="sm"
                                justify="space-between"
                            >
                                <Stack
                                    gap={4}
                                    justify="flex-start"
                                >
                                    <Group
                                        align="center"
                                        gap={2}
                                        justify="flex-start"
                                    >
                                        <ArrowUp size={18} />
                                        <Text
                                            fw={400}
                                            size="sm"
                                        >
                                            {unit.slug === 'cen' ? day.day.maxtemp_c : day.day.maxtemp_f}{unit.title}
                                        </Text>
                                    </Group>
                                    <Group
                                        align="center"
                                        gap={2}
                                        justify="flex-start"
                                    >
                                        <ArrowDown size={18} />
                                        <Text
                                            fw={400}
                                            size="sm"
                                        >
                                            {unit.slug === 'cen' ? day.day.mintemp_c : day.day.mintemp_f}{unit.title}
                                        </Text>
                                    </Group>
                                </Stack>

                                <Stack
                                    align="center"
                                    gap={4}
                                    justify="center"
                                >
                                    <img
                                        alt={day.day.condition.text}
                                        src={getIconUrl(day.day.condition.icon)}
                                        width={32}
                                    />
                                    <Text
                                        className="text-center"
                                        size="sm"
                                    >
                                        {day.day.condition.text}
                                    </Text>
                                </Stack>
                            </Group>
                        </Stack>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
};

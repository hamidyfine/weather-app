import { Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { Thermometer } from 'lucide-react';

import { conditions } from '@/configs';
import { useWeatherStore } from '@/stores';
import type { Current, Location } from '@/types';

interface IProps {
    location: Location;
    weather: Current | null;
}

export const WeatherCurrentForecast = ({ location, weather }: IProps) => {
    const { unit } = useWeatherStore();

    if (!weather) return null;

    const getIconUrl = (url: string) => url.replace('//cdn.weatherapi.com/', '/');
    const today_condition = conditions.find((condition) => condition.code === weather.condition.code);

    return (
        <Group
            align="center"
            className={`rounded-md ${today_condition?.bg}`}
            gap={8}
            justify="space-between"
            my={12}
            p={24}
            style={{
                borderRadius: '6px',
            }}
        >
            <Stack gap={0}>
                <Title
                    fw="bold"
                    order={1}
                >
                    {location.name}
                </Title>
                <Title
                    fw="lighter"
                    order={4}
                >
                    {location.country}
                </Title>
                <Text
                    c="dimmed"
                    size="sm"
                >
                    {dayjs(location.localtime).format('dddd, MMM DD YYYY hh:mm A')}
                </Text>
            </Stack>

            <Stack
                gap={0}
                justify="flex-end"
            >
                <Group
                    align="center"
                    gap={4}
                    justify="flex-end"
                >
                    <img
                        alt={weather.condition.text}
                        src={getIconUrl(weather.condition.icon)}
                        width={48}
                    />
                    <Text
                        fw="bold"
                        size="lg"
                    >
                        {weather.condition.text}
                    </Text>
                </Group>
                <span className="text-6xl font-bold">
                    {unit.slug === 'cen' ? weather.temp_c : weather.temp_f}{unit.title}
                </span>
                <Group
                    align="center"
                    gap={2}
                    justify="flex-end"
                >
                    <Thermometer size={18} />
                    <Text
                        fw={400}
                        size="md"
                        style={{ textAlign: 'right', textTransform: 'capitalize' }}
                    >
                        Feels like {unit.slug === 'cen' ? weather.feelslike_c : weather.feelslike_f}{unit.title}
                    </Text>
                </Group>
            </Stack>
        </Group>
    );
};

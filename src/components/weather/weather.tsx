import dayjs from 'dayjs';
import { Button, Flex, Grid, SegmentedControl } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '..';
import { RootState } from '../../stores';
import { setUnit } from '../../stores/weather';
import { conditions } from '../../config';

interface IProps {
    weather: any;
    user_city?: string;
}

const Weather = ({ weather, user_city }: IProps) => {
    const getIconUrl = (url: string) => url.replace('//cdn.weatherapi.com/', '/');
    const unit = useSelector((state: any) => state.weather.unit);
    const unit_title = useSelector((state: any) => state.weather.unit_title);
    const weather_unit = useSelector((state: RootState) => state.weather.unit);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!weather) return null;

    const forecast = JSON.parse(JSON.stringify(weather.forecast.forecastday));
    forecast.shift();

    const today_condition = conditions.find((condition) => condition.code === weather.current.condition.code);

    const onBackClicked = () => {
        navigate('/');
    };

    return (
        <div>
            <Flex
                align="center"
                gap="md"
                justify="space-between"
            >
                <span className="text-2xl font-medium uppercase">Today's Weather</span>

                <Flex
                    align="center"
                    gap="sm"
                    justify="flex-end"
                >
                    <SegmentedControl
                        data={[
                            { label: '°C', value: 'cen' },
                            { label: '°F', value: 'far' },
                        ]}
                        value={weather_unit}
                        onChange={(value) => dispatch(setUnit(value))}
                    />
                    <Button onClick={() => onBackClicked()}>
                        Back
                    </Button>
                </Flex>
            </Flex>

            <Flex
                align="center"
                className={`p-10 rounded-lg border border-gray-200 border-solid mb-10 mt-4 ${today_condition?.bg}`}
                direction={{ base: 'column', sm: 'row' }}
                gap="md"
                justify="space-between"
            >
                <Flex
                    className="gap-1"
                    direction="column"
                >
                    {user_city?.toLowerCase() === weather.location.name.toLowerCase() && (
                        <Flex
                            align="center"
                            className="bg-gray-100 rounded-lg px-2 py-1 w-fit"
                            gap="xs"
                            justify="flex-start"
                        >
                            <Icon
                                icon="IconCurrentLocation"
                                size="18px"
                            />
                            <span className="text-xs">Current Location</span>
                        </Flex>
                    )}
                    <h1 className="m-0">
                        {weather.location.name}
                    </h1>
                    <span className="text-lg font-medium">{weather.location.country}</span>
                    <span className="text-xs font-light">
                        {dayjs(weather.location.localtime).format('dddd, MMM DD YYYY hh:mm A')}
                    </span>
                </Flex>

                <Flex
                    align="flex-center"
                    className="gap-4"
                    direction="column"
                    justify="center"
                >
                    <span className="text-6xl font-bold">{unit === 'cen' ? weather.current.temp_c : weather.current.temp_f}{unit_title}</span>
                    <Flex
                        align="center"
                        className="gap-4"
                        justify="start"
                    >
                        <img
                            alt={weather.current.condition.text}
                            src={getIconUrl(weather.current.condition.icon)}
                        />
                        <Flex
                            align="flex-start"
                            className="gap-1"
                            direction="column"
                            justify="flex-start"
                        >
                            <span className="text-lg font-light">{weather.current.condition.text}</span>
                            <span className="text-sm font-medium">Feels like {unit === 'cen' ? weather.current.feelslike_c : weather.current.feelslike_f}{unit_title}</span>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Grid gutter="md">
                {forecast.map((day: any, index: number) => (
                    <Grid.Col
                        key={index}
                        span={{ base: 12, md: 4 }}
                    >
                        <Flex
                            key={index}
                            align="flex-start"
                            className="gap-2 bg-gray-50 rounded-lg border-solid border-gray-200 p-2"
                            direction="column"
                            justify="flex-start"
                        >
                            <Flex
                                align="center"
                                className="w-full flex-grow"
                                gap="sm"
                                justify="space-between"
                            >
                                <span className="text-2xl font-light">
                                    {dayjs(day.date).format('dddd')}
                                </span>
                                <span className="text-sm font-extralight">
                                    {dayjs(day.date).format('MM/DD')}
                                </span>
                            </Flex>

                            <Flex
                                align="flex-end"
                                className="w-full flex-grow"
                                gap="sm"
                                justify="space-between"
                            >
                                <Flex
                                    align="flex-start"
                                    className="gap-1"
                                    direction="column"
                                    justify="flex-start"
                                >
                                    <Flex
                                        align="center"
                                        gap="xs"
                                        justify="flex-start"
                                    >
                                        <Icon
                                            icon="IconArrowUp"
                                            size="18px"
                                        />
                                        <span className="text-base font-normal">
                                            {unit === 'cen' ? day.day.maxtemp_c : day.day.maxtemp_f}{unit_title}
                                        </span>
                                    </Flex>
                                    <Flex
                                        align="center"
                                        gap="xs"
                                        justify="flex-start"
                                    >
                                        <Icon
                                            icon="IconArrowDown"
                                            size="18px"
                                        />
                                        <span className="text-base font-normal">
                                            {unit === 'cen' ? day.day.mintemp_c : day.day.mintemp_f}{unit_title}
                                        </span>
                                    </Flex>
                                </Flex>

                                <Flex
                                    align="flex-end"
                                    direction="column"
                                    justify="flex-end"
                                >
                                    <img
                                        alt={day.day.condition.text}
                                        src={getIconUrl(day.day.condition.icon)}
                                    />
                                    <span className="text-sm font-normal">{day.day.condition.text}</span>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
};

export default Weather;

import { ActionIcon, Button, Flex, TextInput } from '@mantine/core';
import { MapPin, Search } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { useGetWeather } from '@/hooks';
import { useWeatherStore } from '@/stores';

import errorSvg from '../../assets/error.svg';


const SearchForm = () => {
    const [query, setQuery] = useState<string>('');
    const [error_is_reset, setErrorIsReset] = useState<boolean>(false);
    const { city, setCity, setError, setWeather } = useWeatherStore();
    const { error, getWeather, is_loading, weather } = useGetWeather();

    useEffect(() => {
        if (city) {
            getWeather();
        }
    }, [city, getWeather]);

    useEffect(() => {
        if (weather) {
            setWeather(weather);
        }
        if (error) {
            setWeather(null);
            setCity('');
        }
    }, [error, weather]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const alphabeticRegex = /^[A-Za-z]+$/;
        const value = e.target.value;
        if (value.match(alphabeticRegex) || value === '') {
            setQuery(e.target.value);
        }
    };

    if (error && !error_is_reset) {
        return (
            <Flex
                align="center"
                className="w-full absolute inset-0 bg-white z-50"
                direction="column"
                gap="md"
                justify="center"
            >
                <img
                    alt="Weather Vibe"
                    className="w-96 mx-auto"
                    src={errorSvg}
                />
                <Button
                    onClick={() => {
                        setError('');
                        setCity('');
                        setErrorIsReset(true);
                    }}
                >
                    Search Again
                </Button>
            </Flex>
        );
    }

    return (
        <form
            className="w-full"
            onSubmit={(e) => {
                e.preventDefault();
                if (query) {
                    setCity(query);
                }
            }}
        >
            <TextInput
                className="mx-auto"
                disabled={is_loading}
                inputMode="text"
                leftSection={<MapPin size={24} />}
                leftSectionPointerEvents="none"
                placeholder="Search city..."
                radius="xl"
                size="xl"
                value={query}
                variant="filled"
                w={{ base: '100%', sm: '400px' }}
                rightSection={(
                    <ActionIcon
                        aria-label="Search City"
                        color="blue"
                        loading={is_loading}
                        radius="xl"
                        size="xl"
                        variant="filled"
                        onClick={() => {
                            if (query) {
                                setCity(query);
                            }
                        }}
                    >
                        <Search size={20} />
                    </ActionIcon>
                )}
                onChange={(e) => onInputChange(e)}
            />
        </form>
    );
};

export default SearchForm;

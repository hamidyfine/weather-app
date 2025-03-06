import { ActionIcon, Button, Flex, TextInput } from '@mantine/core';
import { MapPin, Search } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { useGetWeather } from '@/hooks/use-get-weather';
import { useNavigate } from '@/router';
import { useWeatherStore } from '@/stores';

import errorSvg from '../../assets/error.svg';
import { TransMacro } from '..';

interface IProps {
    city: string;
}

const SearchForm = ({ city }: IProps) => {
    const [query, setQuery] = useState<string>('');
    const {error, fetch, is_loading, weather} = useGetWeather();
    const [error_is_reset, setErrorIsReset] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setCity, setError, setWeather } = useWeatherStore();

    useEffect(() => {
        if (city) {
            setQuery(city);
            setCity(city);
            fetch(city);
        }
    }, [city, fetch]);

    useEffect(() => {
        setErrorIsReset(false);
        if (weather) {
            setWeather(weather);
            setQuery('');
            navigate({
                to: '/dashboard',
            });
        }
        if (error) {
            setWeather(null);
            setCity('');
            setError(error);
        }
    }, [error, navigate, setQuery, weather]);

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

                <span className="text-2xl font-semibold capitalize p-4">{error}</span>
                <Button
                    onClick={() => {
                        setError('');
                        setCity('');
                        setErrorIsReset(true);
                    }}
                >
                    <TransMacro id="search_again">
                        Search Again
                    </TransMacro>
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
                    fetch(query);
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
                                fetch(query);
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

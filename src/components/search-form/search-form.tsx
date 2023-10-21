import { ActionIcon, Button, Flex, TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetWeather from '../../hooks/use-get-weather';
import { setWeather, setCity, setError } from '../../stores/weather';
import { Icon, Loading } from '..';
import errorSvg from '../../assets/error.svg';

interface IProps {
    city: string;
}

const SearchForm = ({ city }: IProps) => {
    const [query, setQuery] = useState<string>('');
    const {is_loading, error, weather, fetch} = useGetWeather();
    const [error_is_reset, setErrorIsReset] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (city) {
            setQuery(city);
            dispatch(setCity(city));
            fetch(city);
        }
    }, [city, dispatch, fetch]);

    useEffect(() => {
        setErrorIsReset(false);
        if (weather) {
            dispatch(setWeather(weather));
            setQuery('');
            navigate('/dashboard');
        }
        if (error) {
            dispatch(setWeather(null));
            dispatch(setCity(''));
            dispatch(setError(error));
        }
    }, [dispatch, error, navigate, setQuery, weather]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const alphabeticRegex = /^[A-Za-z]+$/;
        const value = e.target.value;
        if (value.match(alphabeticRegex) || value === '') {
            setQuery(e.target.value);
        }
    };

    const InputPrefixIcon = () => {
        return (
            <Icon icon="IconCompass" />
        );
    };

    const InputSuffixIcon = () => {
        return (
            <ActionIcon
                aria-label="Search City"
                color="blue"
                radius="xl"
                size="xl"
                variant="filled"
                onClick={() => {
                    if (query) {
                        dispatch(setCity(query));
                        fetch(query);
                    }
                }}
            >
                <Icon
                    icon="IconSearch"
                    size="20px"
                />
            </ActionIcon>
        );
    };

    if (is_loading) {
        return <Loading />;
    }

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
                        dispatch(setError(''));
                        dispatch(setCity(''));
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
                    dispatch(setCity(query));
                    fetch(query);
                }
            }}
        >
            <TextInput
                className="mx-auto"
                disabled={is_loading}
                inputMode="text"
                leftSection={<InputPrefixIcon />}
                leftSectionPointerEvents="none"
                placeholder="Search city..."
                radius="xl"
                rightSection={<InputSuffixIcon />}
                size="xl"
                value={query}
                variant="filled"
                w={{ base: '100%', sm: '400px' }}
                onChange={(e) => onInputChange(e)}
            />
        </form>
    );
};

export default SearchForm;

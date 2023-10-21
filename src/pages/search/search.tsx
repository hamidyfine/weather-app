import { Flex } from '@mantine/core';
import { useState } from 'react';
import { HistoryList, Icon, SearchForm } from '../../components';
import useGetUserCity from '../../hooks/use-get-user-city';

const Search = () => {
    const [city, setCity] = useState<string>('');
    const { user_city } = useGetUserCity();

    return (
        <Flex
            align="center"
            className="w-full"
            direction="column"
            gap="md"
            justify="center"
        >
            <SearchForm city={city} />

            <Flex
                align="center"
                className="text-xs text-neutral-500 rounded-full border border-zinc-200 border-solid px-2 py-1 capitalize cursor-pointer hover:border-blue-500 hover:text-blue-500"
                gap="xs"
                justify="center"
                onClick={() => setCity(user_city)}
            >
                <Icon
                    icon="IconCurrentLocation"
                    size="14px"
                />
                <span>
                    Use my current location
                </span>
            </Flex>

            <HistoryList setHistoryCity={setCity} />
        </Flex>
    );
};

export default Search;

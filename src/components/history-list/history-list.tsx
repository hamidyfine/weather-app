import { ActionIcon, Button, Flex } from '@mantine/core';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { TransMacro } from '..';

interface IProps {
    setHistoryCity: (city: string) => void;
}

const HistoryList = ({ setHistoryCity }: IProps) => {
    const [history, setHistory] = useState<string[]>(JSON.parse(localStorage.getItem('history') || '[]'));
    const [last_cities, setLastCities] = useState<string[]>([]);

    useEffect(() => {
        /**
         * Set the last 3 cities from the history
         */
        setLastCities(() => history.slice(-3));
    }, [history]);

    const onHistoryItemDelete = (city: string) => {
        const newHistory = history.filter((c) => c !== city).filter(Boolean);
        localStorage.setItem('history', JSON.stringify(newHistory));
        setHistory(newHistory);
    };

    return (
        <Flex
            direction="column"
            gap="sm"
            w={{ base: '100%', sm: '400px' }}
        >
            <Flex
                align="center"
                gap="md"
                justify="space-between"
            >
                <span>
                    <TransMacro id="history">
                        History
                    </TransMacro>
                </span>

                <Button
                    size="compact-xs"
                    onClick={() => {
                        localStorage.removeItem('history');
                        setHistory([]);
                    }}
                >
                    <TransMacro id="clear_history">
                        Search Again
                    </TransMacro>
                </Button>
            </Flex>

            {history && history.length > 0 && (
                <ul className="m-0 p-0 list-none">
                    {last_cities && last_cities.length > 0 && last_cities.reverse().map((city: string, index: number) => (
                        <li
                            key={index}
                            className="capitalize mb-2 cursor-pointer hover:border-blue-500 rounded-lg hover:text-blue-500 block p-2 text-xs font-semibold border border-solid border-gray-200"
                        >
                            <Flex
                                align="center"
                                gap="sm"
                                justify="space-between"
                            >
                                <span
                                    className="flex-grow"
                                    onClick={() => setHistoryCity(city)}
                                >
                                    {city}
                                </span>

                                <ActionIcon
                                    color="red"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onHistoryItemDelete(city);
                                    }}
                                >
                                    <Trash2 size={14} />
                                </ActionIcon>
                            </Flex>
                        </li>
                    ))}
                </ul>
            )}

            {history && history.length === 0 && (
                <span className="text-xs rounded-lg border border-gray-200 border-solid p-4 text-center">
                    <TransMacro id="no_history">
                        No history found.
                    </TransMacro>
                </span>
            )}
        </Flex>
    );
};

export default HistoryList;

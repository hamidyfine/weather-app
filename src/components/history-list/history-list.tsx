import { ActionIcon, Button, Group, ScrollArea, Stack, Text } from '@mantine/core';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useWeatherStore } from '@/stores';

const HistoryList = () => {
    const [history, setHistory] = useState<string[]>(JSON.parse(localStorage.getItem('history') || '[]'));
    const { setCity } = useWeatherStore();

    const onHistoryItemDelete = (city: string) => {
        const newHistory = history.filter((c) => c !== city).filter(Boolean);
        localStorage.setItem('history', JSON.stringify(newHistory));
        setHistory(newHistory);
    };

    return (
        <Stack
            gap="sm"
            w={{ base: '100%', sm: '400px' }}
        >
            <Group
                align="center"
                gap="md"
                justify="space-between"
            >
                <span>
                    History
                </span>

                <Button
                    size="compact-xs"
                    onClick={() => {
                        localStorage.removeItem('history');
                        setHistory([]);
                    }}
                >
                    Clear History
                </Button>
            </Group>

            {history && history.length > 0 && (
                <ScrollArea h="200px">
                    <ul className="m-0 p-0 list-none">
                        {history && history.length > 0 && history.reverse().map((city: string, index: number) => {
                            if (!city) {
                                return null;
                            }
                            return (
                                <li
                                    key={index}
                                    className="capitalize mb-2 cursor-pointer hover:border-blue-500 rounded-lg hover:text-blue-500 block p-2 text-xs font-semibold border border-solid border-gray-200"
                                >
                                    <Group
                                        align="center"
                                        gap="sm"
                                        justify="space-between"
                                        onClick={() => setCity(city)}
                                    >
                                        <Text
                                            fw="bold"
                                            size="xs"
                                        >
                                            {city}
                                        </Text>

                                        <ActionIcon
                                            color="red"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onHistoryItemDelete(city);
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </ActionIcon>
                                    </Group>
                                </li>
                            );
                        })}
                    </ul>
                </ScrollArea>
            )}

            {history && history.length === 0 && (
                <span className="text-xs rounded-lg border border-gray-200 border-solid p-4 text-center">
                    No history found.
                </span>
            )}
        </Stack>
    );
};

export default HistoryList;

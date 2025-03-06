import { Flex } from '@mantine/core';
import { LocateFixed } from 'lucide-react';
import { useState } from 'react';

import { TransMacro } from '@/components';
import { useGetUserCity } from '@/hooks';
import { createFileRoute } from '@/router';

export const Route = createFileRoute('/_index/_index/')({
    component: Home,
});

function Home() {
    const [city, setCity] = useState<string>('');
    const { user_city } = useGetUserCity();
    console.log('🚀 ~ _index.index.tsx:15 ~ city:', city);

    return (
        <Flex
            align="center"
            className="w-full"
            direction="column"
            gap="md"
            justify="center"
        >
            {/* <SearchForm city={city} /> */}

            <Flex
                align="center"
                className="text-xs text-neutral-500 rounded-full border border-zinc-200 border-solid px-2 py-1 capitalize cursor-pointer hover:border-blue-500 hover:text-blue-500"
                gap="xs"
                justify="center"
                onClick={() => setCity(user_city)}
            >
                <LocateFixed size={14} />
                <span>
                    <TransMacro id="use_current_location">
                        Use my current location
                    </TransMacro>
                </span>
            </Flex>

            {/* <HistoryList setHistoryCity={setCity} /> */}
        </Flex>
    );
}

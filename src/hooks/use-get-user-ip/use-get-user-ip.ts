import { useEffect, useState } from 'react';

import { request } from '@/utils/request.util';

export interface IpLookup {
    ip: string;
}

export const useGetUserIp = () => {
    const [ip, setIp] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null | unknown>(null);

    const fetch = () => {
        setLoading(true);
        request({
            method: 'GET',
            url: 'https://api64.ipify.org?format=json',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).then((response: any) => {
            setIp(() => response.data.ip);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetch();
    }, []);

    return {
        /**
         * An error object if the fetch fails, otherwise null.
         */
        error,
        /**
         * A function to refetch the user's geographic information.
         */
        fetch,
        /**
         * The user's city name, extracted from their geographic information.
         */
        ip,
        /**
         * Indicates whether the data is currently being fetched.
         */
        is_loading: loading,
    };
};

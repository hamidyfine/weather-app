import { useEffect, useState } from 'react';
import { request } from '../utils/request';

/**
 * Hook to get the user's geo data based on their IP address using the Geoapify API.
 * @returns An object containing the user's city, geographic information, loading state, error state, and a function to refetch the data.
 */
const useGetUserLocation = () => {
    const [location, setLocation] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | unknown | null>(null);
    const APIkey = '62f3b506edd1443eb7bbef4167bd8fbf';

    const getLocationInfo = (latitude: any, longitude: any) => {
        setLoading(true);
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('🚀 ~ file: use-get-user-city.ts:19 ~ getLocationInfo:', data);
                if (data.status.code === 200) {
                    setLocation(data.results[0].components);
                } else {
                    setError('Reverse geolocation request failed.');
                }
            })
            .catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            });
    };

    const getByIp = () => {
        setLoading(true);
        request({
            method: 'GET',
            url: 'https://ipapi.co/json/',
        }).then((response) => {
            console.log('🚀 ~ file: use-get-user-city.ts:18 ~ getByIp:', response.data);
            setLocation(response);
        }).catch((error: any) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const getByUserLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.permissions
                .query({ name: 'geolocation' })
                .then(function (result) {
                    if (result.state === 'granted' || result.state === 'prompt') {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => {
                                console.log('🚀 ~ file: use-get-user-city.ts:71 ~ getByUserLocation:', pos);
                                setLocation(() => pos);
                                getLocationInfo(pos.coords.latitude, pos.coords.longitude);
                            },
                            (err) => {
                                setError(err);
                                getByIp();
                            },
                            {
                                enableHighAccuracy: true,
                                timeout: 5000,
                                maximumAge: 0,
                            },
                        );
                    } else if (result.state === 'denied') {
                        getByIp();
                    }
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getByUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        /**
         * Indicates whether the data is currently being fetched.
         */
        is_loading: loading,
        /**
         * An error object if the fetch fails, otherwise null.
         */
        error,
        /**
         * The user's geographic information.
         */
        location,
        /**
         * A function to refetch the user's geographic information.
         */
        getByIp,
        getByUserLocation,
    };
};

export default useGetUserLocation;

import { Flex, Loader } from '@mantine/core';

const Loading = () => {
    return (
        <Flex
            align="center"
            className="w-full absolute inset-0 bg-white z-50"
            justify="center"
        >
            <Loader
                color="blue"
                size="xl"
            />
        </Flex>
    );
};

export default Loading;

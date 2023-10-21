import { Flex, Title } from '@mantine/core';

const Header = () => {
    return (
        <header>
            <Flex
                align="center"
                gap="xl"
                justify="center"
                p="lg"
            >
                <Title
                    className="text-black"
                    order={1}
                    size="h2"
                >
                    Weather Vibe
                </Title>
            </Flex>
        </header>
    );
};

export default Header;

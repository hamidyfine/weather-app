import { Group, Title } from '@mantine/core';

const Header = () => {
    return (
        <header>
            <Group
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
                    Weather Forecast
                </Title>
            </Group>
        </header>
    );
};

export default Header;

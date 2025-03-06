import { Flex, Title } from '@mantine/core';

import { TransMacro } from '..';

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
                    <TransMacro id="app_name">
                        Weather Forecast
                    </TransMacro>
                </Title>
            </Flex>
        </header>
    );
};

export default Header;

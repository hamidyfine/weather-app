import { Flex, Text, Tooltip } from '@mantine/core';
import { Icon } from '..';

const Footer = () => {
    return (
        <Flex
            align="center"
            direction={{ base: 'column', md: 'row' }}
            gap="md"
            justify="space-between"
            p="sm"
        >
            <Text size="xs">
                    Developed by Hamid. All rights reserved &#169; 2023.
            </Text>

            <Flex
                align="center"
                gap="sm"
                justify="flex-end"
            >
                <Tooltip label="Website">
                    <a href="https://itshamid.me/">
                        <Icon
                            icon="IconWorld"
                            size="18"
                        />
                    </a>
                </Tooltip>
                <Tooltip label="GitHub">
                    <a href="https://github.com/hamidyfine">
                        <Icon
                            icon="IconBrandGithub"
                            size="18"
                        />
                    </a>
                </Tooltip>
                <Tooltip label="Linkedin">
                    <a href="https://www.linkedin.com/in/hamidyaftian/">
                        <Icon
                            icon="IconBrandLinkedin"
                            size="18"
                        />
                    </a>
                </Tooltip>
            </Flex>
        </Flex>
    );
};

export default Footer;

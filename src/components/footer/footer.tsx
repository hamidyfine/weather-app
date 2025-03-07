import { Flex, Group, Text, Tooltip } from '@mantine/core';
import { Github, Globe, Linkedin } from 'lucide-react';

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

            <Group
                align="center"
                gap="sm"
                justify="flex-end"
            >
                <Tooltip label="Website">
                    <a href="https://itshamid.me/">
                        <Globe size={18} />
                    </a>
                </Tooltip>
                <Tooltip label="GitHub">
                    <a href="https://github.com/hamidyfine">
                        <Github size={18} />
                    </a>
                </Tooltip>
                <Tooltip label="Linkedin">
                    <a href="https://www.linkedin.com/in/hamidyaftian/">
                        <Linkedin size={18} />
                    </a>
                </Tooltip>
            </Group>
        </Flex>
    );
};

export default Footer;

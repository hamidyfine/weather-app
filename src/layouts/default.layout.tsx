import { AppShell } from '@mantine/core';
import { useMediaQuery } from '@react-hook/media-query';
import { Footer, Header } from '../components';

/**
 * Default layout component for the pages.
 * @param children - The child components to be rendered within the layout.
 * @returns The default layout component.
 */
const DefaultLayout = ({ children }: React.PropsWithChildren<unknown>) => {
    const is_mobile = useMediaQuery('only screen and (max-width: 768px)');

    return (
        <AppShell
            footer={{ height: is_mobile ? 82 : 48 }}
            header={{ height: 82 }}
            padding="md"
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main className="flex">
                {children}
            </AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};

export default DefaultLayout;

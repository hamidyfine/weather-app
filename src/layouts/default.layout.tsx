import { AppShell } from '@mantine/core';
import { Footer, Header } from '../components';

/**
 * Default layout component for the pages.
 * @param children - The child components to be rendered within the layout.
 * @returns The default layout component.
 */
const DefaultLayout = ({ children }: React.PropsWithChildren<unknown>) => {
    return (
        <AppShell
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

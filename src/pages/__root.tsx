import { AppShell } from '@mantine/core';
import { useMediaQuery } from '@react-hook/media-query';

import { Footer, Header } from '@/components';
import { createRootRoute, Outlet } from '@/router';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const is_mobile = useMediaQuery('only screen and (max-width: 768px)');

    return (
        <AppShell
            footer={{ height: is_mobile ? 75 : 48 }}
            header={{ height: 75 }}
            padding="md"
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main className="flex">
                <Outlet />
            </AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}

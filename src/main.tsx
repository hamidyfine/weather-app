import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryProvider, RouterProvider, ThemeProvider } from './providers';

const rootElement = document.getElementById('root') as HTMLElement;

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(
        <StrictMode>
            <ThemeProvider>
                <QueryProvider>
                    <RouterProvider />
                </QueryProvider>
            </ThemeProvider>
        </StrictMode>,
    );
}

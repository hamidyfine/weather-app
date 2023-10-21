import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './stores';
import { theme } from './config';
import AppRoutes from './routes/Routes';
import '@mantine/core/styles.css';
import '@fontsource-variable/inter'; // Body Font
import '@fontsource-variable/comfortaa'; // Header Font
import './main.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <MantineProvider theme={theme}>
                <AppRoutes />
            </MantineProvider>
        </ReduxProvider>
    </StrictMode>,
);

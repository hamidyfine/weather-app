import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { theme } from './config';
import App from './App';
import '@mantine/core/styles.css';
import '@fontsource-variable/inter';
import './main.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider
            defaultColorScheme="dark"
            theme={theme}
        >
            <App />
        </MantineProvider>
    </StrictMode>,
);

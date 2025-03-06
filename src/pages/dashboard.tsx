import { createFileRoute } from '@/router';

export const Route = createFileRoute('/dashboard')({
    component: Dashboard,
});

function Dashboard() {}

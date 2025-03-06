import { createFileRoute, Outlet } from '@/router';

export const Route = createFileRoute('/_index/_index')({
    component: IndexLayout,
});

function IndexLayout() {
    return (<Outlet />);
}

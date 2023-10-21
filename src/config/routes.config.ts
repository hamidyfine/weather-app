import { ElementType, lazy } from 'react';

type TRoute = {
    name: string;
    path: string;
    layout: ElementType;
    component: ElementType;
    children: TRoute[];
}

type TRoutesList = {
    [key: string]: TRoute;
}

const routes_list: TRoutesList = {
    search: {
        name: 'Search',
        path: '/',
        layout: 'DefaultLayout' as ElementType,
        component: lazy(() => import(/*webpackChunkName: "search" */ '../pages/search')),
        children: [],
    },
    dashboard: {
        name: 'Dashboard',
        path: '/dashboard',
        layout: 'DefaultLayout' as ElementType,
        component: lazy(() => import(/*webpackChunkName: "dashboard" */ '../pages/dashboard')),
        children: [],
    },
};

export type { TRoute };
export default routes_list;

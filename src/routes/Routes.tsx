import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { TRoute } from '../config/routes.config';
import { Loading } from '../components';
import routes from './index';

/**
 * Props for the RouteComponent component.
 */
type TRouteComponentProps = {
    route: TRoute;
}

/**
 * Component that renders a route with its layout if specified.
 * @param route - The route to render.
 * @returns The rendered route.
 */
const RouteComponent = ({ route }: TRouteComponentProps) => {
    if (route.layout) {
        return (
            <route.layout>
                <route.component />
            </route.layout>
        );
    }

    return <route.component />;
};

/**
 * Component that renders all the routes of the application.
 * @returns The rendered routes.
 */
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                element={<RouteComponent route={route} />}
                                path={route.path}
                            >
                                {route.children?.length && route.children.map((child: TRoute, i) => {
                                    return (
                                        <Route
                                            key={i}
                                            element={<RouteComponent route={child} />}
                                            path={`${route.path}${child.path}`}
                                        />
                                    );
                                })}
                            </Route>
                        );
                    })}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;

import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})

function RootComponent() {
    return <Outlet />
}

function NotFoundComponent() {
    return <p>Страница не найдена</p>
}
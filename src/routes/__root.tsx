import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GameContext } from "@/context";

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})

function RootComponent() {
    return (
        <GameContext>
            <Outlet />
        </GameContext>
    )
}

function NotFoundComponent() {
    return <p>Страница не найдена</p>
}
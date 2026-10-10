import { createFileRoute } from '@tanstack/react-router'

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "../styles/splash.module.css";


export const Route = createFileRoute('/')({
    component: SplashScreen,
})

function SplashScreen() {
    const navigate = Route.useNavigate()

    return (
        <main className={classes.main}>
            <img src={x} className={classes.bgIconX} />
            <img src={o} className={classes.bgIconO} />
            <img
                onClick={() => navigate({ to: '/settings' })}
                className={classes.logo}
                src={logo}
                alt="logo"
            />
        </main>
    );
}

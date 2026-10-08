import type { Dispatch, SetStateAction } from "react";
import type { AppState } from "@/types";

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "./splash.module.css";

type SplashScreenProps = {
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SplashScreen({ updateAppState }: SplashScreenProps) {
  if (localStorage.getItem("xo__game")) {
    return (
      <>
        <button onClick={() => updateAppState("settings")}>start new game</button>
        <button onClick={() => updateAppState("game")}>continue</button>
      </>
    );
  }

  return (
    <main className={classes.main}>
      <img src={x} className={classes.bgIconX} />
      <img src={o} className={classes.bgIconO} />
      <img
        onClick={() => updateAppState("settings")}
        className={classes.logo}
        src={logo}
        alt="logo"
      />
    </main>
  );
}

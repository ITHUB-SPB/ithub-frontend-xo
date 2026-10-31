import type { Dispatch, SetStateAction } from "react";

import { useBoundStore } from "@/store";
import type { AppState } from "@/types";

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "./splash.module.css";

export default function SplashScreen() {
  const updateAppState = useBoundStore(store => store.updateAppState)

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

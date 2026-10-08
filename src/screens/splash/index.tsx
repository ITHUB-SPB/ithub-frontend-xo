import type { Dispatch, SetStateAction } from "react";
import type { AppState } from "@/types";

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "./splash.module.css";

type SplashScreenProps = {
  updateAppState: Dispatch<SetStateAction<AppState>>;
  hasSavedGame: boolean;
  continueGame: () => void;
  startNewGame: () => void;
};

export default function SplashScreen({
  updateAppState,
  hasSavedGame,
  continueGame,
  startNewGame,
}: SplashScreenProps) {
  return (
    <main className={classes.main}>
      <img src={x} className={classes.bgIconX} alt="" />
      <img src={o} className={classes.bgIconO} alt="" />
      <button
        className={classes.logoButton}
        onClick={() => !hasSavedGame && updateAppState("settings")}
        aria-label="Открыть игру"
      >
        <img className={classes.logo} src={logo} alt="Крестики-нолики" />
        <span>Нажмите, чтобы начать</span>
      </button>

      {hasSavedGame && (
        <div className="dialogBackdrop" role="presentation">
          <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="continue-title">
            <span className="dialogMark">↻</span>
            <h2 id="continue-title">Продолжить игру?</h2>
            <p>Найдена незавершённая партия. Можно вернуться к ней или начать заново.</p>
            <div className="dialogActions">
              <button className="button buttonSecondary" onClick={startNewGame}>Новая игра</button>
              <button className="button" onClick={continueGame}>Продолжить</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

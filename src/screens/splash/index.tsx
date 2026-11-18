import { useContext } from "react";

import { gameContext } from "@/context";
import Dialog from "@/components/dialog";
import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";
import classes from "./splash.module.css";

export default function SplashScreen() {
  const { savedGame, dispatch } = useContext(gameContext);

  return (
    <main className={classes.main}>
      <img src={x} className={classes.bgIconX} alt="" />
      <img src={o} className={classes.bgIconO} alt="" />
      <p className="eyebrow">Два игрока · одно поле · три в ряд</p>
      <h1 className={classes.heading}>
        <button
          onClick={() => dispatch({ type: "settings" })}
          className={classes.start}
          aria-label="Крестики-нолики — начать игру"
        >
          <img className={classes.logo} src={logo} alt="Tic Tac Toe" />
          <span className={classes.caption}>Нажмите на название, чтобы играть</span>
        </button>
      </h1>
      <p className={classes.note}>Классика, которая никогда не надоест.</p>
      {savedGame && (
        <Dialog
          title="Продолжим игру?"
          confirmText="Новая игра"
          cancelText="Продолжить"
          onConfirm={() => dispatch({ type: "settings" })}
          onCancel={() => dispatch({ type: "continue" })}
        >
          Нашлась незавершённая партия. Можно продолжить с того же хода или начать новую.
        </Dialog>
      )}
    </main>
  );
}

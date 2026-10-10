import classes from "./legend.module.css";

export default function Legend() {
  const players = JSON.parse(localStorage.getItem("xo__players")!);

  function handleNameImput(figure: string) {
    const name = players[figure].name;
    return name;
  }

  function handleColorChange(figure: string) {
    let playerColor = players[figure].color;
    return playerColor;
  }
  return (
    <section className={classes.legend}>
      <section
        className={classes.legend__item}
      >
        <h1 style={{ color: handleColorChange("x"), textShadow: `0px 4px 15px ${handleColorChange("x")}` }} className={classes.text}>
          {handleNameImput("x")}
        </h1>
      </section>

      <section
        className={classes.legend__item}
      >
        <h1 style={{ color: handleColorChange("o"), textShadow: `0px 4px 15px ${handleColorChange("o")}` }} className={classes.text}>
          {handleNameImput("o")}
        </h1>
      </section>
    </section>
  );
}

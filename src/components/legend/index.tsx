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
        style={{ border: `2px solid ${handleColorChange("x")}` }}
        className={classes.legend__item}
      >
        <h1 style={{ color: handleColorChange("x") }} className={classes.text}>
          {handleNameImput("x")}
        </h1>
      </section>

      <section
        style={{ border: `2px solid ${handleColorChange("o")}` }}
        className={classes.legend__item}
      >
        <h1 style={{ color: handleColorChange("o") }} className={classes.text}>
          {handleNameImput("o")}
        </h1>
      </section>
    </section>
  );
}

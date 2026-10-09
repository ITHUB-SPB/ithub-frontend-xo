import classes from "./legend.module.css";

function handleNameImput(figure: string) {
  let players = JSON.parse(localStorage.getItem("xo__players")!);
  const name = players[figure].name;
  console.log(name);
  return name;
}

function handleColorChange(figure: string) {
  let players = JSON.parse(localStorage.getItem("xo__players")!);
  let playerColor = players[figure].color;
  return playerColor;
}

export default function Legend() {
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

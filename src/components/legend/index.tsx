import classes from "./legend.module.css";

function handleNameImput(figure: string) {
    let players = JSON.parse(localStorage.getItem("xo__players")!);
    const name = players[figure].name
    console.log(name) 
    return name
  }

export default function Legend() {
  return (
    <section className={classes.legend}>
      <section className={classes.legend__item}>
        <h1>{handleNameImput("x")}</h1>
      </section>

      <section className={classes.legend__item}>
        <h1>{handleNameImput("o")}</h1>
      </section>
    </section>
  );
}

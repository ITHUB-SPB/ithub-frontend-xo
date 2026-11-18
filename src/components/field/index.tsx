import type { MouseEventHandler } from "react";
import type { Move } from "@/types";
import Icon from "@/components/icon";
import classes from "./field.module.css";

type FieldProps = {
  value: Move | null;
  index: number;
  color?: string;
  winning: boolean;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Field({ value, index, color, winning, disabled, onClick }: FieldProps) {
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;

  return (
    <button
      className={`${classes.field} ${winning ? classes.winning : ""}`}
      disabled={disabled || value !== null}
      onClick={onClick}
      aria-label={`Ряд ${row}, столбец ${column}: ${value === null ? "пусто" : value === "x" ? "крестик" : "нолик"}${winning ? ", победная клетка" : ""}`}
    >
      {value && <Icon mark={value} color={color} />}
    </button>
  );
}

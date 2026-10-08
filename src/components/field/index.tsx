import type { MouseEventHandler } from "react";
import { type Move } from "../../types";
import classes from "./field.module.css";

type FieldProps = {
  value: Move | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  isWinning?: boolean;
  readOnly?: boolean;
};

export default function Field({ value, onClick, color, isWinning = false, readOnly = false }: FieldProps) {
  return (
    <button
      className={`${classes.field} ${isWinning ? classes.winning : ""}`}
      disabled={value !== null || readOnly}
      onClick={onClick}
      style={{ color: color ?? "inherit" }}
      aria-label={value ? `Клетка ${value.toUpperCase()}` : "Свободная клетка"}
    >
      {value?.toUpperCase() ?? ""}
    </button>
  );
}

import type { CSSProperties, MouseEventHandler } from "react";

import { getReadableColor } from "@/game";
import type { Move } from "@/types";
import classes from "./field.module.css";

type FieldProps = {
  value: Move | null;
  color?: string;
  highlighted?: boolean;
  locked?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Field({
  value,
  color,
  highlighted = false,
  locked = false,
  onClick,
}: FieldProps) {
  const style = color
    ? ({ "--player-color": color, "--player-ink": getReadableColor(color) } as CSSProperties)
    : undefined;

  const className = [
    classes.field,
    value !== null ? classes.filled : "",
    highlighted ? classes.win : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={className}
      style={style}
      disabled={value !== null || locked}
      onClick={onClick}
    >
      {value ?? ""}
    </button>
  );
}

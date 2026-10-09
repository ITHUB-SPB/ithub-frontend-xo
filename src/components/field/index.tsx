import type { MouseEventHandler } from "react";
import { type Move } from "../../types";
import classes from "./field.module.css";

type FieldProps = {
    value: Move | null;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
};

export default function Field({
    value,
    onClick,
    disabled = false,
}: FieldProps) {
    return (
        <button
            className={classes.field}
            disabled={value !== null || disabled}
            onClick={onClick}
            aria-label={value ? `Клетка ${value}` : `Пустая клетка`}
        >
            {value ?? ""}
        </button>
    );
}

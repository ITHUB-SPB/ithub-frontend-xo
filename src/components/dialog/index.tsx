import { useEffect, useRef } from "react";

import classes from "./dialog.module.css";

type DialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  closeOnEscape?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Dialog({
  title,
  description,
  confirmLabel,
  cancelLabel,
  closeOnEscape = true,
  onConfirm,
  onCancel,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={classes.dialog}
      onCancel={(event) => {
        event.preventDefault();

        if (closeOnEscape) {
          onCancel();
        }
      }}
    >
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
      <div className={classes.actions}>
        <button type="button" className="btn" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className="btn btn--accent" autoFocus onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}

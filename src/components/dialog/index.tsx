import { useEffect, useId, useRef, type PropsWithChildren } from "react";

type DialogProps = PropsWithChildren<{
  title: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}>;

export default function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onCancel();
        }
      }}
    >
      <p className="eyebrow">Крестики-нолики</p>
      <h2 id={titleId}>{title}</h2>
      <p id={descriptionId}>{children}</p>
      <div className="dialog-actions">
        <button className="button" onClick={onCancel} autoFocus>
          {cancelText}
        </button>
        <button className="button button-secondary" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </dialog>
  );
}

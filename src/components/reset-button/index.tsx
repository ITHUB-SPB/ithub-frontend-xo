type ResetButtonProps = {
  onClick: () => void;
};

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button className="button button-secondary" onClick={onClick}>
      <span aria-hidden="true">↻ </span>
      Начать заново
    </button>
  );
}

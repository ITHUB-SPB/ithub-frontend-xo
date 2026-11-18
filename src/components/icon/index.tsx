import type { Move } from "@/types";

type IconProps = {
  mark: Move;
  color?: string;
  className?: string;
};

export default function Icon({ mark, color, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="11"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      style={{ color }}
    >
      {mark === "x" ? <path d="M14 14 50 50M50 14 14 50" /> : <circle cx="32" cy="32" r="21" />}
    </svg>
  );
}

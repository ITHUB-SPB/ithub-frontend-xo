import { useEffect, useState } from "react";

type TimerProps = {
  turnKey: number;
  onTimeout: () => void;
};

export default function Timer({ turnKey, onTimeout }: TimerProps) {
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    setRemaining(10);
    const interval = window.setInterval(() => {
      setRemaining((value) => value - 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [turnKey]);

  useEffect(() => {
    if (remaining <= 0) onTimeout();
  }, [remaining, onTimeout]);

  return <span aria-live="polite">00:{remaining.toString().padStart(2, "0")}</span>;
}

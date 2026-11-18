import { useEffect, useRef, useState } from "react";

type TimerProps = {
  paused: boolean;
  onExpire: () => void;
};

export default function Timer({ paused, onExpire }: TimerProps) {
  const timeLeft = useRef(10_000);
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    if (paused) return;

    const deadline = Date.now() + timeLeft.current;
    const interval = window.setInterval(() => {
      timeLeft.current = Math.max(0, deadline - Date.now());
      setRemaining(Math.ceil(timeLeft.current / 1000));

      if (timeLeft.current === 0) {
        window.clearInterval(interval);
        onExpire();
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
      timeLeft.current = Math.max(0, deadline - Date.now());
    };
  }, [paused, onExpire]);

  return (
    <div
      className={`timer ${remaining <= 3 ? "timer-urgent" : ""}`}
      role="timer"
      aria-label="Время на ход"
    >
      <span>{paused ? "Пауза" : "Время на ход"}</span>
      <strong>{remaining.toString().padStart(2, "0")} сек</strong>
      <progress value={remaining} max={10} aria-label="Осталось времени" />
    </div>
  );
}

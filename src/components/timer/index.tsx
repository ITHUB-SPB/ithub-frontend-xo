import { useEffect, useState } from "react";

type TimerProps = {
  onTimeEnd: () => void;
  currentMove: string;
};

export default function Timer({ onTimeEnd, currentMove }: TimerProps) {
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    setRemaining(10);

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      onTimeEnd();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentMove, onTimeEnd]);

  return <span>{remaining}</span>;
}

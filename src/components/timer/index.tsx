import { useEffect, useRef, useState } from "react";

type TimerProps = {
  onTimeEnd: () => void;
  currentMove: string;
};

export default function Timer({ onTimeEnd, currentMove }: TimerProps) {
  const [remaining, setRemaining] = useState(10);
  const intervalRef = useRef<number>(undefined!);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((value) => {
        if (value <= 0) {
          clearInterval(intervalRef.current);
          onTimeEnd();
          return 10;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [currentMove, onTimeEnd]);

  return remaining;
}

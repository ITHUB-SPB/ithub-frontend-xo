import { useEffect, useRef, useState } from "react";

import { TURN_MS } from "@/game";
import classes from "./timer.module.css";

type TimerProps = {
  paused?: boolean;
  onExpire: () => void;
};

export default function Timer({ paused = false, onExpire }: TimerProps) {
  const [remaining, setRemaining] = useState(TURN_MS);
  const leftRef = useRef(TURN_MS);
  const expireRef = useRef(onExpire);

  useEffect(() => {
    expireRef.current = onExpire;
  });

  useEffect(() => {
    if (paused) {
      return;
    }

    const deadline = Date.now() + leftRef.current;

    const intervalId = setInterval(() => {
      const left = Math.max(0, deadline - Date.now());
      leftRef.current = left;
      setRemaining(left);

      if (left === 0) {
        clearInterval(intervalId);
        expireRef.current();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [paused]);

  const seconds = Math.ceil(remaining / 1000);
  const isDanger = seconds <= 3;

  return (
    <div className={classes.timer}>
      <div className={classes.track}>
        <div
          className={`${classes.bar} ${isDanger ? classes.danger : ""}`}
          style={{ width: `${(remaining / TURN_MS) * 100}%` }}
        />
      </div>
      <span className={`${classes.value} ${isDanger ? classes.dangerText : ""}`}>{seconds}</span>
    </div>
  );
}

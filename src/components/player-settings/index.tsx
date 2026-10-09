import oIcon from "@/assets/o.svg";
import xIcon from "@/assets/x.svg";
import { NAME_MAX_LENGTH } from "@/game";
import type { Move, Player } from "@/types";
import classes from "./player-settings.module.css";

type PlayerSettingsProps = {
  move: Move;
  player: Player;
  autoFocus?: boolean;
  onChange: (player: Player) => void;
};

const ICONS: Record<Move, string> = { x: xIcon, o: oIcon };
const TITLES: Record<Move, string> = { x: "Играет за крестики", o: "Играет за нолики" };

export default function PlayerSettings({
  move,
  player,
  autoFocus = false,
  onChange,
}: PlayerSettingsProps) {
  return (
    <section className={classes.player}>
      <img src={ICONS[move]} className={classes.icon} alt={move} />
      <div className={classes.fields}>
        <span className={classes.title}>{TITLES[move]}</span>
        <div className={classes.row}>
          <input
            className={classes.name}
            type="text"
            name={`name-${move}`}
            value={player.name}
            maxLength={NAME_MAX_LENGTH}
            autoFocus={autoFocus}
            required
            onChange={(event) => onChange({ ...player, name: event.target.value })}
          />
          <input
            className={classes.color}
            type="color"
            name={`color-${move}`}
            value={player.color}
            onChange={(event) => onChange({ ...player, color: event.target.value })}
          />
        </div>
      </div>
    </section>
  );
}

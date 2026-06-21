import { formatMoney } from "../format";

export type Segment = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  segments: Segment[];
  /** Подпись в центре (верхняя строка). */
  centerLabel: string;
  /** Значение в центре (нижняя строка). */
  centerValue: string;
};

const SIZE = 220;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ segments, centerLabel, centerValue }: Props) {
  const total = segments.reduce((s, seg) => s + Math.max(seg.value, 0), 0);
  let offset = 0;

  return (
    <div className="donut">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Распределение бюджета">
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth={STROKE}
          />
          {total > 0 &&
            segments.map((seg) => {
              const fraction = Math.max(seg.value, 0) / total;
              const length = fraction * CIRCUMFERENCE;
              const dash = `${length} ${CIRCUMFERENCE - length}`;
              const circle = (
                <circle
                  key={seg.label}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={STROKE}
                  strokeDasharray={dash}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                >
                  <title>{`${seg.label}: ${formatMoney(seg.value)}`}</title>
                </circle>
              );
              offset += length;
              return circle;
            })}
        </g>
        <text className="donut-center-label" x="50%" y="44%" textAnchor="middle">
          {centerLabel}
        </text>
        <text className="donut-center-value" x="50%" y="56%" textAnchor="middle">
          {centerValue}
        </text>
      </svg>
    </div>
  );
}

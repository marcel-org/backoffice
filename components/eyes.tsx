interface EyesProps {
  blink?: boolean;
  x1?: number;
  x2?: number;
  yRect?: number;
  yCircleTop?: number;
  yCircleBottom?: number;
}

export function Eyes({
  blink = false,
  x1 = 140,
  x2 = 197,
  yRect = 171.5,
  yCircleTop = 171.5,
  yCircleBottom = 220.689,
}: EyesProps) {
  return (
    <g className={blink ? "animate-blink" : ""}>
      <rect x={x1} y={yRect} width="19" height="49.1889" fill="black" />
      <circle cx={x1 + 9.5} cy={yCircleBottom} r="9.5" fill="black" />
      <circle cx={x1 + 9.5} cy={yCircleTop} r="9.5" fill="black" />
      <rect x={x2} y={yRect} width="19" height="49.1889" fill="black" />
      <circle cx={x2 + 9.5} cy={yCircleBottom} r="9.5" fill="black" />
      <circle cx={x2 + 9.5} cy={yCircleTop} r="9.5" fill="black" />
    </g>
  );
}

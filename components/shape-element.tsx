import { Eyes } from "./eyes";

interface ShapeElementProps {
  shape?: string;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  blink?: boolean;
}

export function ShapeElement({
  shape = "pentagon",
  color = "#FF9500",
  width = 40,
  height = 40,
  className = "",
  blink = false,
}: ShapeElementProps) {
  const eyePositions: Record<
    string,
    {
      x1: number;
      x2: number;
      yRect: number;
      yCircleTop: number;
      yCircleBottom: number;
    }
  > = {
    square: {
      x1: 51,
      x2: 108,
      yRect: 150.5,
      yCircleTop: 150.5,
      yCircleBottom: 199.689,
    },
    triangle: {
      x1: 140,
      x2: 197,
      yRect: 137.5,
      yCircleTop: 137.5,
      yCircleBottom: 186.689,
    },
    diamond: {
      x1: 102,
      x2: 159,
      yRect: 137.5,
      yCircleTop: 137.5,
      yCircleBottom: 186.689,
    },
    hexagon: {
      x1: 140,
      x2: 197,
      yRect: 151.5,
      yCircleTop: 151.5,
      yCircleBottom: 200.689,
    },
    pentagon: {
      x1: 140,
      x2: 197,
      yRect: 171.5,
      yCircleTop: 171.5,
      yCircleBottom: 220.689,
    },
    circle: {
      x1: 74,
      x2: 131,
      yRect: 156.5,
      yCircleTop: 156.5,
      yCircleBottom: 205.689,
    },
  };

  const currentEyePos = eyePositions[shape] || eyePositions.pentagon;
  const shapes = {
    square: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 260 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="260" height="250" rx="10" fill={color} />
        <Eyes blink={blink} {...currentEyePos} />
      </svg>
    ),
    triangle: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M141.34 15C145.189 8.33333 154.811 8.33333 158.66 15L271.244 210C275.093 216.667 270.281 225 262.583 225H37.4167C29.7187 225 24.9074 216.667 28.7564 210L141.34 15Z"
          fill={color}
        />
        <Eyes blink={blink} {...currentEyePos} />
      </svg>
    ),
    diamond: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 250 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M117.318 9.21865C121.316 4.42111 128.684 4.42111 132.682 9.21866L244.665 143.598C247.756 147.307 247.756 152.693 244.665 156.402L132.682 290.781C128.684 295.579 121.316 295.579 117.318 290.781L5.33486 156.402C2.24448 152.693 2.24449 147.307 5.33487 143.598L117.318 9.21865Z"
          fill={color}
        />
        <Eyes blink={blink} {...currentEyePos} />
      </svg>
    ),
    hexagon: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M145 2.88675C148.094 1.10042 151.906 1.10042 155 2.88675L274.904 72.1133C277.998 73.8996 279.904 77.2008 279.904 80.7735V219.227C279.904 222.799 277.998 226.1 274.904 227.887L155 297.113C151.906 298.9 148.094 298.9 145 297.113L25.0962 227.887C22.0022 226.1 20.0962 222.799 20.0962 219.226V80.7735C20.0962 77.2008 22.0022 73.8996 25.0962 72.1132L145 2.88675Z"
          fill={color}
        />
        <Eyes blink={blink} {...currentEyePos} />
      </svg>
    ),
    pentagon: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M144.122 4.27051C147.627 1.72407 152.373 1.72407 155.878 4.27051L286.781 99.3769C290.285 101.923 291.752 106.437 290.413 110.557L240.413 264.443C239.074 268.563 235.235 271.353 230.902 271.353H69.0976C64.7654 271.353 60.9258 268.563 59.5871 264.443L9.58666 110.557C8.24792 106.437 9.7145 101.923 13.2194 99.3769L144.122 4.27051Z"
          fill={color}
        />
        <Eyes blink={blink} {...currentEyePos} />
      </svg>
    ),
    circle: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="150" cy="150" r="150" fill={color} />
        <Eyes blink={blink} {...currentEyePos} />
      </svg>
    ),
  };

  return shapes[shape as keyof typeof shapes] || shapes.pentagon;
}

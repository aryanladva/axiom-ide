import { type ComponentProps } from "solid-js"

export function WordmarkV2(props: Pick<ComponentProps<"svg">, "class">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 90"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <defs>
        <linearGradient id="wordmark-v2-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--v2-gradient-start, #00A8FF)" />
          <stop offset="50%" stop-color="var(--v2-gradient-middle, #0066FF)" />
          <stop offset="100%" stop-color="var(--v2-gradient-end, #6C3BFF)" />
        </linearGradient>
        <style>{`
          @keyframes wordmark-v2-entrance {
            0% {
              opacity: 0;
              transform: translateY(4px) scale(0.98);
              letter-spacing: 2px;
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              letter-spacing: 7px;
            }
          }
          .wordmark-v2-text {
            animation: wordmark-v2-entrance 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            transform-origin: center;
          }
        `}</style>
      </defs>
      <text
        class="wordmark-v2-text"
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        fill="url(#wordmark-v2-gradient)"
        font-family="var(--font-family-sans, system-ui, -apple-system, sans-serif)"
        font-size="64"
        font-weight="800"
        letter-spacing="7"
      >
        AXIOM
      </text>
    </svg>
  )
}

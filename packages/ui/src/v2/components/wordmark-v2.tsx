import { type ComponentProps } from "solid-js"

export function WordmarkV2(props: Pick<ComponentProps<"svg">, "class">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 90"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        fill="var(--color-primary, currentColor)"
        font-family="var(--font-family-sans, system-ui, -apple-system, sans-serif)"
        font-size="64"
        font-weight="800"
        letter-spacing="6"
      >
        AXIOM
      </text>
    </svg>
  )
}

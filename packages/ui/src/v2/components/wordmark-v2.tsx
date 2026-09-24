import { type ComponentProps } from "solid-js"

export function AxiomLogoPeak(props: Pick<ComponentProps<"svg">, "class">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <defs>
        <linearGradient id="axiom-logo-orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFB36A" />
          <stop offset="50%" stop-color="#FF7A2F" />
          <stop offset="100%" stop-color="#C95D21" />
        </linearGradient>
      </defs>
      {/* Outer Chevron / Mountain Peak */}
      <path
        d="M 50 12 L 88 84 L 70 84 L 50 44 L 30 84 L 12 84 Z"
        fill="url(#axiom-logo-orange-gradient)"
      />
      {/* Inner Cutout Triangle Line */}
      <path
        d="M 50 56 L 62 80 L 38 80 Z"
        fill="#070B0F"
        opacity="0.9"
      />
    </svg>
  )
}

export function AxiomAppIcon(props?: Pick<ComponentProps<"div">, "class">) {
  return (
    <div
      class="flex size-7 shrink-0 items-center justify-center rounded-[8px] overflow-hidden select-none"
      style={{
        background: "linear-gradient(135deg, #FFB36A 0%, #FF7A2F 50%, #C95D21 100%)",
        "box-shadow": "0 1px 4px rgba(255, 122, 47, 0.25)",
      }}
      classList={{ [props?.class ?? ""]: !!props?.class }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 12 4 L 20 20 L 16.5 20 L 12 11 L 7.5 20 L 4 20 Z"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

export function WordmarkV2(props?: Pick<ComponentProps<"div">, "class">) {
  return (
    <div
      class="flex items-center justify-center gap-3.5 select-none"
      classList={{ [props?.class ?? ""]: !!props?.class }}
    >
      <AxiomLogoPeak class="h-14 w-14 sm:h-16 sm:w-16 shrink-0" />
      <span
        class="text-[52px] sm:text-[62px] font-[650] tracking-[7px] leading-none uppercase"
        style={{
          background: "linear-gradient(90deg, #FF8A3D 0%, #F5F2ED 18%, #E9E6E1 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          color: "transparent",
        }}
      >
    XIOM
      </span>
    </div>
  )
}

export function TaglineV2() {
  return (
    <div class="flex items-center justify-center text-[15px] leading-none uppercase tracking-[8px] font-medium select-none">
      <span style={{ color: "#929598" }}>SMALL STEPS</span>
      <span class="mx-3 tracking-normal" style={{ color: "#737678" }}>/</span>
      <span class="font-semibold" style={{ color: "#D97935" }}>BIGGER THINGS</span>
    </div>
  )
}

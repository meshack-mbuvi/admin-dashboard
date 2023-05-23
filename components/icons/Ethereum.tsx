import { SvgProps } from "@/types/Svg"

export default function Ethereum(props: SvgProps) {
  const { className = "w-5" } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          fill="#627EEA"
          d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"
        />
        <path
          fill="#fff"
          fillOpacity=".602"
          d="M9.999 2v5.913l4.997 2.234L10 2Z"
        />
        <path fill="#fff" d="M9.999 2 5 10.147l4.999-2.234V2Z" />
        <path
          fill="#fff"
          fillOpacity=".602"
          d="M9.999 13.979v4.018l5-6.92-5 2.902Z"
        />
        <path fill="#fff" d="M9.999 17.997v-4.02L5 11.078l4.999 6.92Z" />
        <path
          fill="#fff"
          fillOpacity=".2"
          d="m9.999 13.049 4.997-2.902L10 7.915v5.134Z"
        />
        <path
          fill="#fff"
          fillOpacity=".602"
          d="m5 10.147 4.999 2.902V7.915L5 10.147Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

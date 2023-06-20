import { SvgProps } from "@/types/Svg"

export default function CaretDown(props: SvgProps) {
  const { className } = props

  return (
    <svg
      className={className}
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83634 5.19424L10.043 1.36997C10.3812 1.06255 10.1637 0.5 9.7067 0.5H1.2933C0.836287 0.5 0.618803 1.06255 0.956967 1.36997L5.16366 5.19424C5.35437 5.36761 5.64563 5.36761 5.83634 5.19424Z"
        fill="currentColor"
      />
    </svg>
  )
}

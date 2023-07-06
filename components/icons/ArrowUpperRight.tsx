import { SvgProps } from "@/types/Svg"

export default function ArrowUpperRight(props: SvgProps) {
  const { className } = props
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.657 2.34318C13.5054 2.19159 13.2989 2.11914 13.0619 2.12578L4.99634 2.15103C4.75928 2.15767 4.57677 2.23104 4.43055 2.37726C4.13202 2.67579 4.1127 3.13168 4.41588 3.43486C4.5614 3.58039 4.76176 3.67108 4.9502 3.66456L7.6974 3.68234L11.6121 3.4907L10.0468 4.87412L2.33979 12.5811C2.02298 12.8979 2.028 13.3416 2.34331 13.6569C2.65861 13.9722 3.10229 13.9772 3.4191 13.6604L11.1261 5.95344L12.5034 4.3942L12.3179 8.30279L12.3356 11.05C12.3352 11.2445 12.4198 11.4388 12.5653 11.5843C12.8685 11.8875 13.3244 11.8682 13.6229 11.5696C13.7692 11.4234 13.8486 11.247 13.8492 10.9795L13.8744 2.9383C13.881 2.70125 13.8086 2.49477 13.657 2.34318Z"
        fill="currentColor"
      />
    </svg>
  )
}

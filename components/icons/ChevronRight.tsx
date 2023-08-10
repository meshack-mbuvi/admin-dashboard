import { SvgProps } from "@/types/Svg"

export default function ChevronRight(props: SvgProps) {
  const { className } = props

  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 7.99655C11.5 7.82383 11.4386 7.65112 11.3221 7.53368L6.45705 2.18653C6.35276 2.06909 6.21779 2 6.06442 2C5.7454 2 5.5 2.26943 5.5 2.62867C5.5 2.80138 5.56135 2.96028 5.65951 3.07772L10.1258 7.99655L5.65951 12.9223C5.56135 13.0328 5.5 13.1917 5.5 13.3713C5.5 13.7306 5.7454 14 6.06442 14C6.21779 14 6.35276 13.9309 6.46319 13.8135L11.3221 8.46632C11.4386 8.33506 11.5 8.17617 11.5 7.99655Z"
        fill="currentColor"
      />
    </svg>
  )
}

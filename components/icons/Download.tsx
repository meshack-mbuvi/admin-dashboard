import { SvgProps } from "@/types/Svg"

export default function DownloadIcon(props: SvgProps) {
  const { className } = props
  return (
    <svg
      className={className}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="15.9136"
        y="14.6238"
        width="1.37622"
        height="14.8274"
        rx="0.68811"
        transform="rotate(90 15.9136 14.6238)"
        fill="black"
      />
      <path
        d="M8.5 12.9373C8.71438 12.9373 8.91161 12.8425 9.07454 12.6702L13.7599 7.9491C13.9228 7.77678 14 7.59585 14 7.38906C14 6.96687 13.6913 6.63085 13.2625 6.63085C13.0567 6.63085 12.8509 6.70839 12.7223 6.84625L11.7672 7.77624L9.13456 10.6799L9.26319 8.59477V0.758202C9.26319 0.310167 8.94591 -1.04904e-05 8.5 -1.04904e-05C8.05409 -1.04904e-05 7.73681 0.310167 7.73681 0.758202L7.73681 8.59477L7.86544 10.6712L5.23285 7.77624L4.2777 6.84625C4.1405 6.70839 3.94327 6.63085 3.73747 6.63085C3.30871 6.63085 3 6.96687 3 7.38906C3 7.59585 3.0686 7.77678 3.25726 7.96634L7.92546 12.6702C8.08839 12.8425 8.28562 12.9373 8.5 12.9373Z"
        fill="currentColor"
      />
    </svg>
  )
}
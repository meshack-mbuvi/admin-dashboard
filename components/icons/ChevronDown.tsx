import { SvgProps } from "./interface"

export default function ChevronDown(props: SvgProps) {
  const { className } = props

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M8.003 11a.661.661 0 0 0 .463-.178l5.348-4.865A.52.52 0 0 0 14 5.564c0-.319-.27-.564-.629-.564a.702.702 0 0 0-.449.16L8.003 9.626 3.078 5.16a.675.675 0 0 0-.45-.16C2.27 5 2 5.245 2 5.564c0 .154.07.289.187.4l5.347 4.858a.69.69 0 0 0 .47.178Z"
      />
    </svg>
  )
}

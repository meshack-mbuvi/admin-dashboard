import { SvgProps } from "./interface"

export default function RightArrow(props: SvgProps) {
  const { className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 17 14"
      className={className}
    >
      <path
        fill="currentColor"
        d="M16.5 7a.785.785 0 0 0-.267-.575L10.512.74a.787.787 0 0 0-.56-.24c-.422 0-.758.309-.758.737 0 .206.077.412.215.54l1.93 1.956 2.904 2.632-2.085-.128h-10.9C.81 6.237.5 6.554.5 7s.31.763.758.763h10.9l2.076-.128-2.895 2.632-1.93 1.955a.763.763 0 0 0-.215.54c0 .43.336.738.758.738.207 0 .387-.069.577-.257l5.704-5.668A.785.785 0 0 0 16.5 7Z"
      />
    </svg>
  )
}

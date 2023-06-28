import { SvgProps } from "@/types/Svg"

export default function Add(props: SvgProps) {
  const { className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill="currentColor"
        d="M8 16c4.377 0 8-3.631 8-8 0-4.376-3.631-8-8.008-8C3.624 0 0 3.624 0 8c0 4.369 3.631 8 8 8Zm0-1.333A6.634 6.634 0 0 1 1.341 8a6.628 6.628 0 0 1 6.651-6.667A6.653 6.653 0 0 1 14.667 8 6.636 6.636 0 0 1 8 14.667ZM5.012 8.659h2.321v2.337c0 .392.267.659.651.659.392 0 .667-.267.667-.659V8.66h2.337c.392 0 .66-.267.66-.651 0-.392-.268-.667-.66-.667H8.651V5.02c0-.408-.275-.675-.667-.675-.384 0-.65.275-.65.675v2.32H5.011c-.408 0-.675.275-.675.667 0 .384.275.65.675.65Z"
      />
    </svg>
  )
}

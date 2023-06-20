import { SvgProps } from "@/types/Svg"

export default function ArrowLeft(props: SvgProps) {
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
        d="M0 8C0 8.21438 0.0947765 8.41161 0.267097 8.57454L5.98815 14.2599C6.16047 14.4228 6.34141 14.5 6.5482 14.5C6.97038 14.5 7.30641 14.1913 7.30641 13.7625C7.30641 13.5567 7.22886 13.3509 7.09101 13.2223L5.16101 11.2672L2.2574 8.63456L4.34249 8.76319H15.2418C15.6898 8.76319 16 8.44591 16 8C16 7.55409 15.6898 7.23681 15.2418 7.23681H4.34249L2.26602 7.36544L5.16101 4.73285L7.09101 2.7777C7.22886 2.6405 7.30641 2.44327 7.30641 2.23747C7.30641 1.80871 6.97038 1.5 6.5482 1.5C6.34141 1.5 6.16047 1.5686 5.97092 1.75726L0.267097 7.42546C0.0947765 7.58839 0 7.78562 0 8Z"
      />
    </svg>
  )
}
import { SvgProps } from "@/types/Svg"

export default function ContractIcon(props: SvgProps) {
  const { className } = props

  return (
    <svg
      className={className}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.53906 17.457C0.867188 17.457 0 16.582 0 14.8945V3.10547C0 1.42578 0.867188 0.542969 2.53906 0.542969H6.30469C7.28125 0.542969 7.82031 0.699219 8.47656 1.36328L12.5781 5.53516C13.2578 6.22266 13.3984 6.72266 13.3984 7.80859V14.8945C13.3984 16.5742 12.5312 17.457 10.8594 17.457H2.53906ZM2.66406 15.9258H10.7266C11.4844 15.9258 11.8672 15.5273 11.8672 14.8008V8.01172H7.65625C6.54688 8.01172 5.99219 7.47266 5.99219 6.35547V2.07422H2.66406C1.90625 2.07422 1.53125 2.48047 1.53125 3.19922V14.8008C1.53125 15.5273 1.90625 15.9258 2.66406 15.9258ZM7.79688 6.66797H11.6562L7.34375 2.28516V6.20703C7.34375 6.52734 7.47656 6.66797 7.79688 6.66797ZM9.48438 10.0664C9.76562 10.0664 9.97656 10.2852 9.97656 10.5586C9.97656 10.8398 9.76562 11.0586 9.48438 11.0586H3.76562C3.46875 11.0586 3.25781 10.8398 3.25781 10.5586C3.25781 10.2852 3.46875 10.0664 3.76562 10.0664H9.48438ZM9.48438 12.6914C9.76562 12.6914 9.97656 12.9102 9.97656 13.1914C9.97656 13.4648 9.76562 13.6758 9.48438 13.6758H3.76562C3.46875 13.6758 3.25781 13.4648 3.25781 13.1914C3.25781 12.9102 3.46875 12.6914 3.76562 12.6914H9.48438Z"
        fill="currentColor"
      />
      <circle cx="16.5" cy="5.54297" r="1" stroke="currentColor" />
      <circle cx="16.5" cy="15.543" r="1" stroke="currentColor" />
      <circle cx="17.5" cy="10.543" r="1" stroke="currentColor" />
      <path d="M13 10.543H16.5" stroke="currentColor" />
      <path d="M13 7.54297H14.5L15.5 6.54297" stroke="currentColor" />
      <path d="M13 14.543H14.5L15.5 15.543" stroke="currentColor" />
    </svg>
  )
}

interface UserProps {
  className?: string
}

export default function User(props: UserProps) {
  const { className } = props

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        fill="#90949E"
        d="M6.004 5.82c1.525 0 2.852-1.282 2.852-2.95A2.852 2.852 0 0 0 6.004 0a2.872 2.872 0 0 0-2.852 2.883c0 1.655 1.319 2.937 2.852 2.937ZM1.519 12h8.955c1.127 0 1.526-.3 1.526-.888 0-1.722-2.303-4.098-6.004-4.098C2.303 7.014 0 9.39 0 11.112 0 11.7.4 12 1.519 12Z"
      />
    </svg>
  )
}

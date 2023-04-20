interface LogoProps {
  className?: string
}

export default function Logo(props: LogoProps) {
  const { className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m26.926 22.044 14.529-14.53-.97-.969L25.95 21.081l7.867-18.993-1.267-.525-7.865 18.99V0h-1.372v20.552L15.447 1.563l-1.267.525 7.864 18.986L7.514 6.545l-.969.97 14.53 14.53L2.087 14.18l-.525 1.267 18.99 7.865H0v1.372h20.552L1.563 32.549l.525 1.267 18.993-7.867L6.545 40.485l.97.97 14.53-14.53-7.865 18.987 1.267.525 7.865-18.99V48h1.372V27.448l7.865 18.989 1.267-.525-7.867-18.993 14.536 14.536.97-.97L26.919 25.95l18.993 7.867.525-1.267-18.99-7.865H48v-1.372H27.448l18.989-7.865-.525-1.267-18.986 7.864Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

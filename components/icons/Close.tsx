interface CloseProps {
  className?: string
}

export default function Close(props: CloseProps) {
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
        d="M.261 14.465a.904.904 0 0 0 0 1.271.926.926 0 0 0 1.281 0L8 9.28l6.457 6.457c.344.343.939.354 1.282 0a.914.914 0 0 0 0-1.27L9.28 7.996l6.46-6.456a.904.904 0 0 0 0-1.271.907.907 0 0 0-1.282 0L8 6.726 1.543.27C1.199-.084.604-.095.26.269a.914.914 0 0 0 0 1.271l6.46 6.457-6.46 6.468Z"
      />
    </svg>
  )
}

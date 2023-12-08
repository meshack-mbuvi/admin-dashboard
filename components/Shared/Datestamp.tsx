import React from "react"

interface Props {
  date: string
  showTime: boolean
}

const DateTimestamp: React.FC<Props> = ({ date, showTime }) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...(showTime && {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "UTC",
    }),
  }

  return <span>{new Date(date).toLocaleString("en-GB", dateOptions)}</span>
}

export default DateTimestamp

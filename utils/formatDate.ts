export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZoneName: "short",
}
export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", dateOptions).toLocaleString()
}

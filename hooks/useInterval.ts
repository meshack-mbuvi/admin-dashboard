import { useState } from "react"

type IntervalProps = {
  callback: () => void
  delay: number
}
export default function useInterval(props: IntervalProps) {
  const { callback, delay } = props
  const [intervalId, setIntervalId] = useState<any>(null)

  const clear = () => {
    if (!intervalId) return
    clearInterval(intervalId)
    setIntervalId(null)
  }

  const start = () => {
    if (!intervalId) return
    const _intervalId = setInterval(() => {
      callback()
    }, delay)
    setIntervalId(_intervalId)
  }

  return { clear, start, intervalId }
}

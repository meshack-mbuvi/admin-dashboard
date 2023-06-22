import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
import fromUnixTime from "date-fns/fromUnixTime"
import format from "date-fns/format"
import { Tooltip } from "react-tooltip"

interface TimestampProps {
  transactionId: string
  timeStamp: string | null
}

const TransactionTimeStamp = (props: TimestampProps) => {
  const { timeStamp, transactionId } = props

  const timestampAsDate = fromUnixTime(Number(timeStamp))

  return (
    <div className="">
      {!timeStamp ? (
        <span className="text-gray-6 font-mono">•••</span>
      ) : (
        <span
          className="text-gray-3"
          data-tooltip-id={`timeTooltip-${transactionId}`}
          data-tooltip-content={format(
            timestampAsDate,
            "MMMM do yyyy, h:mm:ss a"
          )}
          data-tooltip-place="bottom"
        >
          <Tooltip id={`timeTooltip-${transactionId}`} className="" />
          {formatDistanceToNowStrict(timestampAsDate, {
            addSuffix: true,
          })}
        </span>
      )}
    </div>
  )
}

export default TransactionTimeStamp

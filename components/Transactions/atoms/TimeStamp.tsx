import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
import format from "date-fns/format"
import { Tooltip } from "react-tooltip"

interface TimestampProps {
  transactionId: string
  timeStamp: string | null
}

const TransactionTimeStamp = (props: TimestampProps) => {
  const { timeStamp, transactionId } = props

  return (
    <div>
      {!timeStamp ? (
        <span className="text-gray-6 font-mono">•••</span>
      ) : (
        <span
          className="text-gray-3"
          data-tooltip-id={`timeTooltip-${transactionId}`}
          data-tooltip-content={format(
            new Date(timeStamp),
            "MMMM do yyyy, h:mm:ss a"
          )}
          data-tooltip-place="bottom"
        >
          <Tooltip id={`timeTooltip-${transactionId}`} />
          {formatDistanceToNowStrict(new Date(timeStamp), {
            addSuffix: true,
          })}
        </span>
      )}
    </div>
  )
}

export default TransactionTimeStamp

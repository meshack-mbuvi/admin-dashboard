import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
import format from "date-fns/format"
import { Tooltip } from "react-tooltip"

interface TableTimeStampCellProps {
  id: string
  timeStamp: string | null
}

const TableTimeStampCell = (props: TableTimeStampCellProps) => {
  const { timeStamp, id } = props

  return (
    <div>
      {!timeStamp ? (
        <span className="text-gray-4 font-mono">…</span>
      ) : (
        <span
          className="text-gray-1"
          data-tooltip-id={`timeTooltip-${id}`}
          data-tooltip-content={format(
            new Date(timeStamp),
            "MMMM do yyyy, h:mm:ss a"
          )}
          data-tooltip-place="bottom"
        >
          <Tooltip id={`timeTooltip-${id}`} />
          {formatDistanceToNowStrict(new Date(timeStamp), {
            addSuffix: true,
          })}
        </span>
      )}
    </div>
  )
}

export default TableTimeStampCell

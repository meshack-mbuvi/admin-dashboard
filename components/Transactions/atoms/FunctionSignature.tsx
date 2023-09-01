import { Tooltip } from "react-tooltip"

interface FunctionSignatureProps {
  requestId: string
  functionSignature: string
}

const FunctionSignature = (props: FunctionSignatureProps) => {
  const { requestId, functionSignature } = props

  return (
    <div>
      <span
        className="overflow-x-hidden text-ellipsis"
        data-tooltip-id={`funcSig-${requestId}`}
        data-tooltip-content={functionSignature}
        data-tooltip-place="bottom"
      >
        {functionSignature ? functionSignature.split("(")[0] : "-"}

        <Tooltip id={`funcSig-${requestId}`} />
      </span>
    </div>
  )
}

export default FunctionSignature

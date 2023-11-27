import Section from "../Section"
import Hex from "../Shared/Hex"
import ResourceID from "../Shared/ResourceID"
import TableTimeStampCell from "../Table/TableTimeStampCell"
import WarningOctagon from "../icons/WarningOctagon"

import { RequestsDataType } from "@/hooks/useGetRequests"
import { getNetworkIcon } from "@/utils/getNetworkIcon"

interface RequestCardProps {
  request: RequestsDataType
  onShowRequestDetails: (request: RequestsDataType) => void
}

export default function RequestCard(props: RequestCardProps) {
  const { request, onShowRequestDetails } = props

  return (
    <Section className="py-2 px-4 w-full flex flex-col">
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex gap-2 items-end">
          <div className="h-[1.625rem] w-10 rounded-[1.875rem] px-[0.625rem] py-[0.125rem] flex justify-center items-center border text-red border-red/[.12] bg-red/[.12]">
            <WarningOctagon className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-xs text-gray-4 mb-1">ID</p>
            <ResourceID
              id={request.transactionId}
              fullView
              truncate
              context="Request"
              className="text-gray-1 font-mono overflow-x-hidden text-ellipsis block text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Contract address</p>

          <Hex
            hexValue={request.contractAddress}
            hexType={"address"}
            chainId={request.chainId}
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Chain ID</p>
          <div className="flex items-center text-sm sm:text-base">
            {getNetworkIcon(request.chainId, "w-5 h-5")}
            <p className="text-gray-1 ml-2">{request.chainId}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Request age</p>
          <TableTimeStampCell
            id={request.transactionId}
            timeStamp={request.updatedAt}
            className="text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-xs text-gray-4 mb-1">Function request</p>

          <p className="text-gray-1 font-mono text-sm">
            <button
              className="text-blue-1 text-sm"
              onClick={() => {
                onShowRequestDetails(request)
              }}
            >
              {request.functionSignature}
            </button>
          </p>
        </div>
      </div>
    </Section>
  )
}

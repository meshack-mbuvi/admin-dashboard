import Section from "../Section"
import Hex from "../Shared/Hex"

import { TransactionDataType } from "@/hooks/useGetTransactions"
import TransactionStatus from "./atoms/Status"
import Block from "./atoms/Block"
import TableTimeStampCell from "../Table/TableTimeStampCell"
import NetworkIcon from "@/components/NetworkIcon"
import ResourceID from "../Shared/ResourceID"

interface TransactionCardProps {
  transaction: TransactionDataType
}

export default function TransactionCard(props: TransactionCardProps) {
  const { transaction } = props

  return (
    <Section className="p-4 w-full">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2 items-end">
          <TransactionStatus
            transactionId={transaction.transactionId}
            transactionStatus={transaction.status}
            reverted={transaction.reverted}
          />
          <div>
            <p className="text-xs text-gray-4 mb-1">ID</p>
            <ResourceID
              id={transaction.transactionId}
              fullView
              truncate
              context="Transaction"
              className="text-gray-1 font-mono overflow-x-hidden text-ellipsis block text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Tx hash</p>
          <Hex
            hexValue={transaction.hash}
            hexType={"tx"}
            chainId={transaction.chainId}
            className="text-sm sm:text-base"
          />
        </div>
        <div>
          <p className="text-xs text-gray-4 mb-1">Chain ID</p>
          <div className="flex items-center">
            <NetworkIcon networkId={transaction.chainId} className="w-5" />

            <p className="text-gray-1 ml-2 text-sm sm:text-base font-mono">
              {transaction.chainId}
            </p>
          </div>
        </div>

        <div className="min-w-[112px]">
          <p className="text-xs text-gray-4 mb-1"> Block No</p>
          <div className="text-gray-1 text-sm sm:text-base font-mono">
            <Block
              viewType="block"
              chainId={transaction.chainId}
              blockValue={transaction.block}
            />
          </div>
        </div>

        <div className="min-w-[100px]">
          <p className="text-xs text-gray-4 mb-1">Block age</p>
          <TableTimeStampCell
            id={transaction.transactionId}
            timeStamp={transaction.blockTimestamp}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
    </Section>
  )
}

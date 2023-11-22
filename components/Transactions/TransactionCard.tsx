import { format, formatDistanceToNowStrict } from "date-fns"

import Section from "../Section"
import Hex from "../Shared/Hex"

import { TransactionDataType } from "@/hooks/useGetTransactions"
import TransactionStatus from "./atoms/Status"
import Block from "./atoms/Block"
import TableTimeStampCell from "../Table/TableTimeStampCell"
import { getNetworkIcon } from "@/utils/getNetworkIcon"

interface TransactionCardProps {
  transaction: TransactionDataType
}

export default function TransactionCard(props: TransactionCardProps) {
  const { transaction } = props

  console.log(transaction)

  return (
    <Section className="py-2 px-4 w-full">
      <div className="flex gap-2 mb-6 items-center">
        <TransactionStatus
          transactionId={transaction.transactionId}
          transactionStatus={transaction.status}
          reverted={transaction.reverted}
        />
        <div>
          <p className="font-mono text-gray-1">{transaction.transactionId}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-xs text-gray-4 mb-1">Tx hash</p>
          <Hex
            hexValue={transaction.hash}
            hexType={"tx"}
            chainId={transaction.chainId}
          />
        </div>
        <div>
          <p className="text-xs text-gray-4 mb-1">Chain ID</p>
          <div className="flex items-center">
            {getNetworkIcon(transaction.chainId, "w-5 h-5")}
            <p className="text-gray-1 ml-2">{transaction.chainId}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1"> Block No</p>
          <p className="text-gray-1">
            <Block
              viewType="block"
              chainId={transaction.chainId}
              blockValue={transaction.block}
            />
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Block age</p>
          <TableTimeStampCell
            id={transaction.transactionId}
            timeStamp={transaction.blockTimestamp}
          />
        </div>
      </div>
    </Section>
  )
}

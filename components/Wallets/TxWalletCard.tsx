import { Tooltip } from "react-tooltip"

import Section from "../Section"
import Hex from "../Shared/Hex"
import ResourceID from "../Shared/ResourceID"
import Warning from "../icons/Warning"
import DateTimestamp from "../Shared/Datestamp"
import Toggle from "../Toggle"

import { isBalanceLow } from "@/utils/isBalanceLow"
import { formatNativeToken } from "@/utils/formatNativeToken"

import { Wallet } from "@/hooks/useGetProjectWallets"
import useToggleWalletEnabled from "@/hooks/useToggleWalletEnabled"
import useAuthToken from "@/hooks/useAuthToken"

interface TxWalletCardProps {
  wallet: Wallet
}

export default function TxWalletCard(props: TxWalletCardProps) {
  const { wallet } = props

  const { mutate, error, data } = useToggleWalletEnabled(wallet.projectId)

  const sessionToken = useAuthToken()

  const handleWalletToggle = () => {
    if (!wallet) return

    mutate({
      method: "POST",
      sessionToken,
      endpointPath: `/wallet/toggleIsActive`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress: wallet.walletId,
        projectId: wallet.projectId,
      }),
    })
  }

  return (
    <Section className="py-2 px-4 w-full flex flex-col">
      <div className="flex items-center flex-wrap gap-4 sm:mb-6 mb-4">
        <div className="flex items-center overflow-hidden">
          {isBalanceLow(wallet.balance, -18) && (
            <div
              className="mr-2"
              data-tooltip-id="t-low-bal"
              data-tooltip-content="Wallet has low balance"
              data-tooltip-place="top"
            >
              <Warning className="text-warning w-4" />
              <Tooltip
                id="t-low-bal"
                className="drop-shadow-2xl opacity-100"
                style={{
                  padding: "8px",
                }}
              />
            </div>
          )}
          <ResourceID id={wallet.walletId} context="wallet" className="mr-2" />

          <Hex
            hexValue={wallet.walletAddress}
            hexType={"address"}
            chainId={wallet.chainId}
            truncate={false}
            className="text-sm sm:text-base"
          />
        </div>

        <div className="ml-auto flex items-center">
          <Toggle
            enabled={wallet.isActive}
            setEnabled={() => handleWalletToggle()}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-xs text-gray-4 mb-1">Balance</p>
          <p className="text-gray-1 text-sm sm:text-base">
            {formatNativeToken(wallet.balance, -18)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Transactions</p>
          <p className="text-gray-1 text-sm sm:text-base">{wallet.txCount}</p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Date added</p>
          <p className="text-gray-1 text-sm sm:text-base">
            <DateTimestamp date={wallet.createdAt} showTime={true} />
          </p>
        </div>
      </div>
    </Section>
  )
}

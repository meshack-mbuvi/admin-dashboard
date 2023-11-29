import { useState } from "react"
import { Tooltip } from "react-tooltip"

import Section from "../Section"
import Hex from "../Shared/Hex"
import ResourceID from "../Shared/ResourceID"
import Warning from "../icons/Warning"
import DateTimestamp from "../Shared/Datestamp"
import Toggle from "../Toggle"
import Question from "../icons/Question"

import { isBalanceLow } from "@/utils/isBalanceLow"
import { formatNativeToken } from "@/utils/formatNativeToken"
import { isTestnetNetwork } from "@/utils/network"

import { Wallet } from "@/hooks/useGetProjectWallets"
import useToggleWalletEnabled from "@/hooks/useToggleWalletEnabled"
import useAuthToken from "@/hooks/useAuthToken"
import useFaucet from "@/hooks/useFaucet"

interface TxWalletCardProps {
  wallet: Wallet
}

export default function TxWalletCard(props: TxWalletCardProps) {
  const { wallet } = props

  const { mutate } = useToggleWalletEnabled(wallet.projectId)

  const {
    mutate: dripFaucet,
    isSuccess: isFaucetSuccess,
    isLoading: isFaucetLoading,
    isError: isFaucetError,
  } = useFaucet()

  const [isWalletEnabled, setIsWalletEnabled] = useState<boolean>(
    wallet.isActive
  )

  const sessionToken = useAuthToken()

  const handleWalletToggle = (enabled: boolean) => {
    if (!wallet) return

    setIsWalletEnabled(enabled)

    mutate({
      method: "POST",
      sessionToken,
      endpointPath: `/wallet/toggleIsActive`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress: wallet.walletAddress,
        projectId: wallet.projectId,
      }),
    })
  }

  const isLowBalance = isBalanceLow(wallet.balance, -18)

  return (
    <Section className="p-4 w-full flex flex-col">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="flex overflow-hidden">
          {isLowBalance && (
            <div
              className="mr-2 mt-5 sm:mt-6 "
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
          <div>
            <p className="text-xs text-gray-4 mb-1">Wallet address</p>

            <Hex
              hexValue={wallet.walletAddress}
              hexType={"address"}
              chainId={wallet.chainId}
              truncate
              className="text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">ID</p>
          <ResourceID id={wallet.walletId} context="wallet" truncate fullView />
        </div>

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
        {isTestnetNetwork(wallet.chainId) && isLowBalance && (
          <div>
            <div className="text-xs text-gray-4 mb-1 flex">
              Faucet
              <span
                className="self-center ml-1"
                data-tooltip-id="faucet-help"
                data-tooltip-content="You can request funds for this wallet every 24 hours."
              >
                <Tooltip
                  hidden={false}
                  id="faucet-help"
                  className="text-center font-sans text-xs rounded-md"
                  disableStyleInjection={true}
                />
                <Question className="w-3" />
              </span>
            </div>

            <button
              className="text-black text-xs rounded-full px-2 py-0.5 bg-white hover:bg-gray-2 transition-colors"
              disabled={isFaucetLoading || isFaucetSuccess}
              onClick={() =>
                dripFaucet({
                  projectId: wallet.projectId,
                  walletAddress: wallet.walletAddress,
                  chainId: wallet.chainId,
                })
              }
            >
              {isFaucetSuccess
                ? "Success"
                : isFaucetError
                ? "Error"
                : isFaucetLoading
                ? "Sending"
                : "Fund wallet"}
            </button>
          </div>
        )}

        <div>
          <p className="text-xs text-gray-4 mb-1">Enabled</p>

          <Toggle
            enabled={isWalletEnabled}
            setEnabled={(enabled) => handleWalletToggle(enabled)}
          />
        </div>
      </div>
    </Section>
  )
}

"use client"

import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

import { DarkButtonStyles } from "@/components/Buttons"
import Section from "@/components/Section"
import Text from "@/components/Text"
import ArrowUpperRight from "@/components/icons/ArrowUpperRight"
import NetworkWallets from "./NetworkWallets"

import PremiumPill from "@/components/Shared/PremiumPill"
import useFreePlan from "@/hooks/useFreePlan"
import useGetProjectWallets, { Wallet } from "@/hooks/useGetProjectWallets"
import getFirstOrString from "@/utils/getFirstOrString"
import { NetworkId } from "@/utils/network"

export default function Wallets() {
  const { projectId } = useParams()
  const { data: wallets } = useGetProjectWallets({
    projectId: getFirstOrString(projectId),
    withOnchainData: true,
  })

  const isFreePlan = useFreePlan()

  const networkWallets = wallets?.reduce((acc, wallet) => {
    if (!acc[wallet.chainId]) {
      acc[wallet.chainId] = []
    }
    acc[wallet.chainId].push(wallet as Wallet)
    return acc
  }, {} as { [key: number]: Wallet[] })

  return (
    <Section className="flex flex-col p-10 rounded-lg mr-10">
      <Text className="text-2xl pb-2">Secure Transaction Wallets</Text>
      <div className="flex flex-row pb-7 items-baseline justify-between">
        <p className="font-small text-gray-4 text-sm pr-2 max-w-prose">
          These wallets will be used to perform programmatic actions on your
          contract. Please add them as an allowed operator.
        </p>

        <div className="flex space-x-7">
          {isFreePlan && <PremiumPill />}

          <Link
            href="https://docs.syndicate.io/features/transaction-broadcasting"
            target="_blank"
            className={clsx(
              DarkButtonStyles,
              "border-yellow-secondary flex items-baseline shrink-0"
            )}
          >
            View Guide
            <ArrowUpperRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>

      {networkWallets && (
        <div>
          {Object.keys(networkWallets).map((key, index) => {
            const chainId = +key as NetworkId
            return (
              <NetworkWallets
                key={index}
                networkId={chainId}
                wallets={networkWallets[chainId]}
              />
            )
          })}
        </div>
      )}
    </Section>
  )
}

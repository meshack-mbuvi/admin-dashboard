"use client"

import { useParams } from "next/navigation"
import { useMemo } from "react"

import Section from "@/components/Section"
import Text from "@/components/Text"

import useGetProjectWallets, { Wallets } from "@/hooks/useGetProjectWallets"
import { NetworkId } from "@/utils/getNetwork"
import clsx from "clsx"
import Link from "next/link"
import { DarkButtonStyles } from "../Buttons"
import ArrowUpperRight from "../icons/ArrowUpperRight"
import ProjectWallets from "./projectWallets"

export default function Wallets() {
  const { projectId } = useParams()
  const { data: wallets } = useGetProjectWallets({
    projectId,
  })

  const networkWallets = useMemo(() => {
    const networkWallets: { [key: number]: Wallets[] } = {}

    wallets?.forEach((wallet) => {
      if (!networkWallets[wallet.chainId]) {
        networkWallets[wallet.chainId] = []
      }
      networkWallets[wallet.chainId].push(wallet)
    })

    return networkWallets
  }, [wallets])

  return (
    <Section className="flex flex-col p-10 rounded-lg mr-10">
      <Text className="text-2xl pb-2">Secure Transaction Wallets</Text>
      <div className="flex flex-row pb-7 items-baseline justify-between">
        <p className="font-small text-gray-4 text-sm pr-2">
          These wallets will be used to perform programmatic actions on your
          contract. Please add them as an allowed operator.
        </p>
        <Link
          // TODO: ADD URL here
          href="/#"
          target="_blank"
          className={clsx(
            DarkButtonStyles,
            "border-yellow-secondary flex items-baseline"
          )}
        >
          View Guide
          <ArrowUpperRight className="h-4 w-4 ml-2" />
        </Link>
      </div>

      <div>
        {Object.keys(networkWallets).map((key, index) => {
          return (
            <ProjectWallets
              key={index}
              networkId={+key as NetworkId}
              wallets={networkWallets[+key] || []}
            />
          )
        })}
      </div>
    </Section>
  )
}

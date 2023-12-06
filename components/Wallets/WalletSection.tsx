import { Route } from "next"
import { UrlObject } from "url"
import { cn } from "@/utils/cn"
import Link from "next/link"

import useFreePlan from "@/hooks/useFreePlan"
import Section from "../Section"
import PremiumPill from "../Shared/PremiumPill"
import Loading from "../Loading"
import ArrowUpperRight from "../icons/ArrowUpperRight"
import { DarkButtonStyles } from "../Buttons"
import Text from "@/components/Text"

interface WalletSelectionProps {
  title: string
  description: string
  children: React.ReactNode
  helperLink: UrlObject | Route<string>
  helperText: string
  isLoading?: boolean
}

export function WalletSection(props: WalletSelectionProps) {
  const { title, description, helperLink, helperText, children, isLoading } =
    props
  const isFreePlan = useFreePlan()
  return (
    <div className="flex flex-col">
      <Text className="text-2xl pb-2">{title}</Text>
      <div className="sm:flex flex-row pb-7 items-baseline justify-between">
        <p className="font-small text-gray-3 text-sm pr-2 max-w-prose">
          {description}
        </p>
        <div className="flex space-x-7 items-center mt-4 sm:mt-0">
          {isFreePlan && <PremiumPill />}
          <Link
            href={helperLink}
            target="_blank"
            className={cn(
              DarkButtonStyles,
              "border-yellow-secondary flex items-baseline shrink-0"
            )}
          >
            {helperText}
            <ArrowUpperRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
      {isLoading && (
        <div className="px-7 mt-6">
          <Loading className="h-8 my-4" />
          <Loading className="h-8 my-4" />
          <Loading className="h-8" />
        </div>
      )}
      {!isLoading && children}
    </div>
  )
}

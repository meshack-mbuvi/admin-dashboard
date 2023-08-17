import { PropsWithChildren } from "react"

import NoDataIcon from "@/components/icons/NoData"

interface EmptyStateProps extends PropsWithChildren {
  heading: string
  description: JSX.Element | string
}

const EmptyState = (props: EmptyStateProps) => {
  const { heading, description, children } = props

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <div className="flex flex-col items-center justify-center max-w-md text-center ">
        <NoDataIcon className="h-[71px] w-[70px] ml-[19px]" />
        <div className="text-lg mt-9">{heading}</div>
        <div className="mt-2 text-sm text-gray-4">{description}</div>
        {children}
      </div>
    </div>
  )
}

export default EmptyState

import NoDataIcon from "@/components/icons/NoData"

interface EmptyStateProps {
  heading: string
  description: JSX.Element | string
}

const EmptyState = (props: EmptyStateProps) => {
  const { heading, description } = props

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <div className="flex flex-col items-center justify-center  max-w-[240px] text-center ">
        <NoDataIcon className="h-[71px] w-[70px] ml-[19px]" />
        <div className="text-lg mt-9">{heading}</div>
        <div className="text-sm text-gray-4 mt-2">{description}</div>
      </div>
    </div>
  )
}

export default EmptyState

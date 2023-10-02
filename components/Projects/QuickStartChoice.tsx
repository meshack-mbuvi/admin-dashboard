import ArrowRight from "@/components/icons/ArrowRight"

export interface QuickStartChoiceProps {
  icon: any
  title: string
  description: string
  onClick: () => void
  premium?: boolean
}

export default function QuickStartChoice({
  icon,
  title,
  description,
  onClick,
  premium,
}: QuickStartChoiceProps) {
  return (
    <div
      className="w-full md:w-88 group cursor-pointer pb-20"
      onClick={() => onClick()}
    >
      <div className="group-hover:text-lime-1 text-gray-3 h-64 pt-20 transition ease-in-out delay-75 group-hover:translate-x-4 group-hover:scale-110 duration-300">
        {icon}
      </div>
      <div className="text-2xl leading-9 flex items-center space-x-4">
        <span>{title}</span> <ArrowRight className="h-4" />
      </div>
      <div className="text-gray-4 pt-2">{description}</div>
      {premium && (
        <div className="bg-blue-nasa w-fit py-2.5 px-6 rounded-3xl mt-8">
          Premium Feature
        </div>
      )}
    </div>
  )
}

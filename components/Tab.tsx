"use client"
import clsx from "clsx"

export type TabProps = {
  headers: string[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export const Tab = (props: TabProps) => {
  const { headers, activeIndex, setActiveIndex } = props

  return (
    <div className="flex flex-col">
      <div className="flex space-x-10 w-full mt-2 mb-12">
        {headers.map((header, index) => {
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "w-fit pb-1",
                activeIndex === index
                  ? "border-b text-gray-1 border-gray-1"
                  : "text-gray-5 "
              )}
            >
              {header}
            </button>
          )
        })}
      </div>
    </div>
  )
}

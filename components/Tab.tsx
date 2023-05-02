"use client"
import clsx from "clsx"

export type TabProps = {
  headers: string[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}
/**
 * Renders tab headers and content for the active header
 * @param tabs
 * @returns
 */
export const Tab = (props: TabProps) => {
  const { headers, activeIndex, setActiveIndex } = props

  return (
    <div className="flex flex-col">
      <div className="flex space-x-10 w-full mt-2 mb-12">
        {headers.map((header: string, index: number) => {
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

"use client"
import { cn } from "@/utils/cn"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export type TabProps = {
  headers: string[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  tabSuffixes?: string[]
}

const getTabClassName = (isActive: boolean) => {
  return cn(
    "w-fit pb-1 z-10 shrink-0",
    isActive ? "border-b text-gray-1 border-gray-1" : "text-gray-5"
  )
}

export const Tab = (props: TabProps) => {
  const { headers, activeIndex, setActiveIndex, tabSuffixes } = props
  return (
    <TabContainer>
      {headers.map((header, index) => {
        return (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={getTabClassName(activeIndex === index)}
          >
            {header}
            {tabSuffixes && tabSuffixes[index]}
          </button>
        )
      })}
    </TabContainer>
  )
}

export const TabContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex w-full space-x-10 before:content-[''] before:block before:absolute before:w-full before:border-b before:border-gray-7 before:bottom-0 relative before:z-0">
        {children}
      </div>
    </div>
  )
}

interface LinkTabProps<T extends string> {
  tabs: Array<{
    title: string
    href: Route<T> | URL | string
  }>
}

export function LinkTab<T extends string>(props: LinkTabProps<T>) {
  const { tabs } = props
  const pathname = usePathname()
  return (
    <TabContainer>
      {tabs.map((tab, index) => {
        return (
          <Link
            key={`link-${index}`}
            href={tab.href as Route}
            className={getTabClassName(pathname === tab.href)}
          >
            {tab.title}
          </Link>
        )
      })}
    </TabContainer>
  )
}

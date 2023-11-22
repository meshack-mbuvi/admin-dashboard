"use client"

import clsx from "clsx"
import Link from "next/link"
import { useParams, useSelectedLayoutSegment } from "next/navigation"

interface NavLinkProps {
  path: string
  page: string | null
  children: React.ReactNode
  className?: string
}
const NavLink = (props: NavLinkProps) => {
  const { path, page, children, className } = props
  const { projectId } = useParams()

  const segment = useSelectedLayoutSegment()

  const isActive = segment === page

  return (
    <Link
      href={{
        pathname: `/projects/${projectId}/${path}`,
      }}
      className={clsx(
        className,
        isActive ? "text-black bg-white" : "text-gray-3 hover:bg-gray-8"
      )}
    >
      {children}
    </Link>
  )
}

export default NavLink

"use client"

import Link from "next/link"
import { useParams, useSelectedLayoutSegment } from "next/navigation"

interface NavLinkProps {
  path: string
  page: string | null
  children: React.ReactNode
}
const NavLink = (props: NavLinkProps) => {
  const { path, page, children } = props
  const params = useParams()

  const segment = useSelectedLayoutSegment()

  const projectSlug = params["project-slug"]

  const isActive = () => {
    return segment === page
  }

  return (
    <Link
      href={`/${projectSlug}${path}`}
      className={isActive() ? "" : "opacity-40"}
    >
      {children}
    </Link>
  )
}

export default NavLink

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * A Navigation link component with both active and inactive navigation states.
 * @param props
 * @returns
 */
const NavLink = (props: { path: any; children: any }) => {
  const { path, children } = props
  const pathname = usePathname()

  const isActive = () => {
    return path === pathname
  }

  return (
    <Link href={path} className={isActive() ? "" : "opacity-40"}>
      {children}
    </Link>
  )
}

export default NavLink

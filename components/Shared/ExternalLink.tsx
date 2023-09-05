import { Route } from "next"
import Link from "next/link"
import ArrowUpperRight from "../icons/ArrowUpperRight"
import clsx from "clsx"

type ExternalLinkProps = {
  href: Route
  className?: string
  linkText: string
}

export default function ExternalLink(props: ExternalLinkProps) {
  const { href, linkText, className } = props

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className={clsx("flex", className)}
    >
      {linkText} <ArrowUpperRight className="w-4 ml-2" />
    </Link>
  )
}

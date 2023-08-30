import { Route } from "next"
import Link from "next/link"
import ArrowUpperRight from "../icons/ArrowUpperRight"

type ExternalLinkProps = {
  href: Route
  className?: string
  linkText: string
}

export default function ExternalLink(props: ExternalLinkProps) {
  const {
    href,
    linkText,
    className = "text-yellow-secondary flex space-x-2 py-4",
  } = props

  return (
    <Link href={href} target="_blank" rel="noopener" className={className}>
      {linkText} <ArrowUpperRight className="w-4 ml-2" />
    </Link>
  )
}

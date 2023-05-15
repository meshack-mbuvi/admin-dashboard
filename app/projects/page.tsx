import NextLink from "next/link"

import Logo from "@/components/icons/Logo"
import RightArrow from "@/components/icons/RightArrow"

export default function Projects() {
  return (
    <div className="max-w-lg mx-auto py-32">
      <Logo className="w-12   mb-10 mx-auto" />
      <p className="font-medium text-2xl   text-center mb-12">Projects</p>

      <div>
        <NextLink
          href={`/dot-swoosh`}
          className="  bg-gray-9 rounded-2xl py-5 text-center w-full flex items-center justify-center"
        >
          .SWOOSH <RightArrow className="w-4 ml-2" />
        </NextLink>
      </div>
    </div>
  )
}

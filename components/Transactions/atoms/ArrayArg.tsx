import StructArg from "./StructArg"

import { isObject } from "@/utils/isObject"

interface ArrayArgProps {
  array: unknown[]
}

export default function ArrayArg(props: ArrayArgProps) {
  const { array } = props

  return (
    <div>
      [
      <div className="ml-4">
        {array.map((a, i) => {
          return isObject(a) ? (
            <StructArg struct={a} key={i} />
          ) : (
            a?.toString() || "error parsing input"
          )
        })}
      </div>
      ]
    </div>
  )
}

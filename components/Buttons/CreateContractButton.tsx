import { cn } from "@/utils/cn"

import Button, { LightButtonStyles } from "."
import Add from "../icons/Add"

interface CreateContractButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "className"
  > {}
export default function CreateContractButton(props: CreateContractButtonProps) {
  const { onClick, className } = props
  return (
    <Button
      className={cn(
        LightButtonStyles,
        "flex space-x-2 items-center",
        className
      )}
      onClick={(e) => onClick && onClick(e)}
    >
      <Add className="w-4 h-4" />
      <span className="py-1 leading-4">Add Contract</span>
    </Button>
  )
}

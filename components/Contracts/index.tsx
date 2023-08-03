import clsx from "clsx"

import Add from "@/components/icons/Add"
import Button, { LightButtonStyles } from "@/components/Buttons"
import EmptyState from "@/components/Shared/Empty"

export default function Contracts() {
  return (
    <div className="w-full pl-7">
      <div className="flex justify-between items-center">
        <div className="text-2xl">Contracts</div>
        <Button
          className={clsx(LightButtonStyles, "flex items-center space-x-2")}
        >
          <Add className="h-4 w-4" />
          <span className="leading-4 py-1">Add Contract</span>
        </Button>
      </div>
      <div className="text-sm text-gray-3">
        No contracts have been added to your project yet.
      </div>
      <EmptyState
        heading={"No contracts yet"}
        description={
          <span>
            {"When contracts are added to your project, they'll appear here"}
          </span>
        }
      />
    </div>
  )
}

import clsx from "clsx"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

import Add from "@/components/icons/Add"
import AddContractModal from "@/components/Contracts/AddContractModal"
import Button, { LightButtonStyles } from "@/components/Buttons"
import EmptyState from "@/components/Shared/Empty"
import ProjectContracts from "@/components/Contracts/ProjectContracts"
import StatusModal, { RequestStatus } from "@/components/StatusModal"
import { NetworkId } from "@/utils/getNetwork"
import useGetProjectById from "@/hooks/useGetProjectById"
import useDeleteContract from "@/hooks/useDeleteContract"
import useAuthToken from "@/hooks/useAuthToken"

export default function Contracts() {
  const [showAddContractModal, setShowAddContractModal] =
    useState<boolean>(false)
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false)
  const { projectId } = useParams()
  const sessionToken = useAuthToken()
  const { mutate, reset, isLoading, isSuccess, isError } = useDeleteContract()
  const { data: projectData } = useGetProjectById({
    projectId,
  })

  const NetworkContracts = useMemo(() => {
    const networkContracts: any = {}
    projectData?.contracts?.forEach((contract) => {
      if (!networkContracts[contract.chainId]) {
        networkContracts[contract.chainId] = []
      }
      networkContracts[contract.chainId].push(contract)
    })
    return networkContracts
  }, [projectData?.contracts])

  const handleDeleteContract = (contractId: string) => {
    const confirm = window.confirm("Are you sure you want to delete contract?")
    if (confirm && sessionToken) {
      setShowStatusModal(true)
      mutate({
        sessionToken,
        method: "DELETE",
        endpointPath: `/admin/project/${projectId}/contract/${contractId}`,
      })
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center pl-7">
        <div className="text-2xl">Contracts</div>
        <Button
          className={clsx(LightButtonStyles, "flex items-center space-x-2")}
          onClick={() => setShowAddContractModal(true)}
        >
          <Add className="h-4 w-4" />
          <span className="leading-4 py-1">Add Contract</span>
        </Button>
      </div>
      <div className="text-sm text-gray-3 pl-7">
        {!Object.keys(NetworkContracts).length ? (
          "No contracts have been added to your project yet."
        ) : (
          <span>
            These contracts have been added to your project. Please add your
            wallets to them as an allowed operator.
          </span>
        )}
      </div>
      {!Object.keys(NetworkContracts).length ? (
        <EmptyState
          heading={"No contracts yet"}
          description={
            <span>
              {"When contracts are added to your project, they'll appear here"}
            </span>
          }
        />
      ) : (
        <div className="mt-5">
          {Object.keys(NetworkContracts).map((key, index) => {
            return (
              <ProjectContracts
                key={index}
                networkId={+key as NetworkId}
                contracts={NetworkContracts[key]}
                handleDeleteContract={handleDeleteContract}
              />
            )
          })}
        </div>
      )}
      <AddContractModal
        show={showAddContractModal}
        closeModal={() => setShowAddContractModal(false)}
      />
      <StatusModal
        show={showStatusModal}
        closeModal={() => {
          reset()
          setShowStatusModal(false)
        }}
        status={
          isLoading
            ? RequestStatus.PENDING
            : isSuccess
            ? RequestStatus.SUCCESS
            : isError
            ? RequestStatus.FAILURE
            : RequestStatus.PENDING
        }
      >
        {isLoading
          ? "Deleting contract..."
          : isSuccess
          ? "Contract deleted"
          : isError
          ? "Error deleting contract"
          : ""}
      </StatusModal>
    </div>
  )
}

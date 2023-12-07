import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Loading from "@/components/Loading"
import EmptyState from "@/components/Shared/Empty"
import TablePagination from "@/components/Table/TablePagination"
import useGetRequests, { RequestsDataType } from "@/hooks/useGetRequests"
import TransactionRequestModal from "./TransactionRequestModal"

import getFirstOrString from "@/utils/getFirstOrString"
import RequestCard from "./RequestCard"
import { cn } from "@/utils/cn"

interface FailedRequestsProps {
  searchTerm: string
}

export default function FailedRequests(props: FailedRequestsProps) {
  const { searchTerm } = props
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(20)

  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] =
    useState<RequestsDataType | null>(null)

  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)

  const {
    isLoading,
    isFetching,
    data: requestsResp,
    refetch,
    isPreviousData,
  } = useGetRequests({
    projectId: projectIdString,
    page,
    limit,
    invalid: true,
    search: searchTerm,
  })

  const onPageChange = (page: number) => {
    setPage(page)
    refetch?.()
  }

  const debouncedFetch = useDebouncedCallback(() => {
    refetch?.()
  }, 300)

  useEffect(() => {
    debouncedFetch()
  }, [searchTerm, debouncedFetch])

  return (
    <div>
      {isLoading ? (
        [...Array(10)].map((_, i) => (
          <Loading key={i} className="w-full h-24 mb-6" />
        ))
      ) : !isLoading && requestsResp?.total ? (
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "flex flex-col gap-4 w-full",
              isFetching && "opacity-60 pointer-events-none"
            )}
          >
            {requestsResp?.transactionRequests?.map((request) => (
              <RequestCard
                key={request.transactionId}
                request={request}
                onShowRequestDetails={() => {
                  setSelectedRequest(request)
                  setShowModal(true)
                }}
              />
            ))}
          </div>
          <TablePagination
            page={page}
            limit={limit}
            total={requestsResp.total}
            onPageChange={onPageChange}
            isLoading={isFetching || isPreviousData}
          />
        </div>
      ) : (
        <EmptyState heading="No failed requests" description={""} />
      )}

      <TransactionRequestModal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        request={selectedRequest}
      />
    </div>
  )
}

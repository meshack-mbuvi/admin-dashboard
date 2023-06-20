import clsx from "clsx"

import ArrowLeft from "@/components/icons/ArrowLeft"
import ArrowRight from "@/components/icons/ArrowRight"

interface PaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  isLoading: boolean
}

const TransactionPagination = (props: PaginationProps) => {
  const { page, total, limit, onPageChange, isLoading } = props

  // use loading to limit request spamming
  const nextPage = () => {
    if (page * limit <= total && !isLoading) {
      onPageChange(page + 1)
    }
  }

  const prevPage = () => {
    if (page >= 1 && !isLoading) {
      onPageChange(page - 1)
    }
  }

  return (
    <div
      className={clsx(
        "flex font-mono space-x-10 items-center mt-10 mb-11",
        (page + 1) * limit >= total && page === 0 && "invisible"
      )}
    >
      <button
        onClick={prevPage}
        className={clsx(
          page === 0 && "invisible",
          isLoading ? "cursor-wait" : "cursor-pointer"
        )}
      >
        <ArrowLeft className="h-4 w-4 text-text-gray-4 hover:text-white" />
      </button>

      <div>
        Page
        <span className={`${isLoading && "text-gray-4"}`}> {page + 1} </span>
        of {Math.ceil(total / limit)}
      </div>
      <button
        onClick={nextPage}
        className={clsx(
          (page + 1) * limit >= total && "invisible",
          isLoading ? "cursor-wait" : "cursor-pointer"
        )}
      >
        <ArrowRight className="h-4 w-4 text-gray-4 hover:text-white" />
      </button>
    </div>
  )
}

export default TransactionPagination

import useContactSales from "@/hooks/useContactSales"
import useGetUser from "@/hooks/useGetUser"
import { usePathname } from "next/navigation"
import { FormEvent } from "react"
import ArrowRight from "../icons/ArrowRight"
import Spinner from "../icons/Spinner"

type ContactUsToUpgradeProps = {
  onSuccess: () => void
}
export default function ContactUsToUpgrade(props: ContactUsToUpgradeProps) {
  const { onSuccess } = props
  const { data } = useGetUser()
  const { mutateAsync, isLoading } = useContactSales()
  const pathname = usePathname()

  const handleUpgradeClick = async (e: FormEvent) => {
    e.preventDefault()
    if (!data) return

    mutateAsync({
      email: data?.emailAddress,
      referrer: pathname,
    }).then(() => {
      onSuccess()
    })
  }
  return (
    <button
      className="flex text-blue-secondary items-center mb-7 cursor-pointer"
      onClick={handleUpgradeClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex justify-center w-full gap-3">
          <Spinner className="h-6 w-6 text-blue-secondary animate-spin" />
          Submitting...
        </span>
      ) : (
        <>
          Contact us to upgrade your account and access this feature{" "}
          <ArrowRight className="h-4 ml-[6px]" />
        </>
      )}
    </button>
  )
}

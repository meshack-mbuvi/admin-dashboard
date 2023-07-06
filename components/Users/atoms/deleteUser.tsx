import Button from "@/components/Buttons"
import RemoveIcon from "@/components/icons/Remove"
import useAuthToken from "@/hooks/useAuthToken"
import useDeleteUserById from "@/hooks/useDeleteUser"

interface RemoveProps {
  stytchId: number
}
export default function DeleteUser({ stytchId }: RemoveProps) {
  const sessionToken = useAuthToken()
  const deleteMutation = useDeleteUserById()

  const handleDeleteUser = () => {
    // TODO: Update endpoint once its ready
    const confirm = window.confirm("Are you sure you want to delete this user?")
    if (sessionToken && confirm) {
      // deleteMutation.mutate({
      //   method: "DELETE",
      //   sessionToken,
      //   endpointPath: `/admin/users`,
      //   body: JSON.stringify({
      //     stytchId,
      //     roleTitle: "admin",
      //   }),
      // })
    }
  }

  return (
    <Button
      className="flex items-center text-gray-4 text-sm"
      onClick={handleDeleteUser}
    >
      <RemoveIcon className="w-4 h-4 mr-2" /> Remove
    </Button>
  )
}

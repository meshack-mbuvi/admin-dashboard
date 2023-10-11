"use client"

import useGetUser from "./useGetUser"

export default function useIsViewerUser() {
  const { data: user } = useGetUser()
  return user?.role === "viewer"
}

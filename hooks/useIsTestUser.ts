"use client"

import useGetUser from "./useGetUser"

export default function useIsTestUser() {
  const { data: user } = useGetUser()
  return user?.role === "test-user"
}

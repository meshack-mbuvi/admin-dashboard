"use client"

import useGetUser from "./useGetUser"

export default function useTestUser() {
  const { data: user } = useGetUser()
  return user?.role === "test-user"
}

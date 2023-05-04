"use client"

import useAuth from "@/hooks/useAuth"

import Section from "./Section"

interface AuthLoadingProps {
  children: React.ReactNode
}

export default function AuthLoading(props: AuthLoadingProps) {
  const { children } = props

  const { isSessionLoading } = useAuth()

  if (isSessionLoading) return <PageLoading />

  return <>{children}</>
}

function PageLoading() {
  return (
    <div className="flex justify-center h-full">
      <Section className="my-auto py-8 px-8">
        <p className="text-2xl text-white text-center ">Loading...</p>
      </Section>
    </div>
  )
}

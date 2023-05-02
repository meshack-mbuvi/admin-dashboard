import PageLoading from '@/components/PageLoading'
import useAuth from '@/hooks/useAuth'

export default function Home() {
  const { isSessionLoading, session } = useAuth()

  if (isSessionLoading) return <PageLoading />
  return <main>Unauthenticated page</main>
}

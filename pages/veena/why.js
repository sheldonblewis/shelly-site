import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function WhyRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/veena#why')
  }, [router])

  return null
}

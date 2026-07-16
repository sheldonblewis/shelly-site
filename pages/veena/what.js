import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function WhatRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/veena#what')
  }, [router])

  return null
}

'use client'

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import { Button } from './ui/button'

export const LoginSection = () => {
  return (
    <main className="flex h-dvh w-screen items-center justify-center">
      <LoginLink>
        <Button>Login</Button>
      </LoginLink>
    </main>
  )
}

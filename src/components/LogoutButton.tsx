'use client'

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

export const LogoutButton = () => {
  return (
    <LogoutLink className="ml-auto inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      Logout
    </LogoutLink>
  )
}

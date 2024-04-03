import { Chat } from '@/components/Chat'
import { LoginSection } from '@/components/LoginSection'
import { LogoutButton } from '@/components/LogoutButton'
import { Button } from '@/components/ui/button'
import { isAuthenticated } from '@/lib/auth'
import { Triangle } from 'lucide-react'

export default async function Home() {
  const authenticated = await isAuthenticated()

  if (!authenticated) return <LoginSection />

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
      </aside>
      <div className="flex flex-col">
        <nav>
          <header className="fixed top-0 z-10 flex h-[57px] w-full items-center gap-1 border-b bg-background pl-4 pr-[72px]">
            <h1 className="text-xl font-semibold">Luna Lander</h1>
            <LogoutButton />
          </header>
        </nav>
        <main className="container mx-auto grid max-w-screen-md flex-1 gap-4 overflow-auto p-4">
          <Chat />
        </main>
      </div>
    </div>
  )
}

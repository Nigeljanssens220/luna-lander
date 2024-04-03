import { LoginSection } from '@/components/LoginSection'
import { LogoutButton } from '@/components/LogoutButton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { isAuthenticated } from '@/lib/auth'
import { CornerDownLeft, Triangle } from 'lucide-react'

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
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Luna Lander</h1>
          <LogoutButton className="ml-auto inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Logout
          </LogoutButton>
        </header>
        <main className="container mx-auto grid max-w-screen-md flex-1 gap-4 overflow-auto p-4">
          <div className="relative flex h-full min-h-[50vh] w-full flex-col rounded-xl bg-muted p-4 lg:col-span-2">
            <div className="flex flex-1 items-center justify-center">No assistants found. Create a new one?</div>
            <form className="relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:border-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  <span className="hidden md:block">Send Message</span>
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

// src/app/dashboard/layout.tsx
import { AppSidebar } from '@/components/app-sidebar'
import HeaderBreadcrumb from '@/components/header-breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const defaultOpen = !!cookieStore.get('sidebar_state')?.value

  if (!accessToken) {
    redirect('/login')
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className='w-full'>
        <SidebarInset>
          <header className='flex h-16 items-center gap-2'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <HeaderBreadcrumb />
            </div>
          </header>
        </SidebarInset>
        {children}
      </main>
    </SidebarProvider>
  )
}

"use client";

import {
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Users
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@radix-ui/react-collapsible'
import { NavUser } from './nav-user'
import Link from 'next/link'
import { useActiveRoute } from '@/hooks/use-active-route'
import { cn } from '@/lib/utils'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
      items: [
        { title: "All Products", url: "/dashboard/products" },
        { title: "Add Product", url: "/dashboard/products/new" },
        { title: "Categories", url: "/dashboard/products/categories" },
        { title: "Variants", url: "/dashboard/products/variants" },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
      items: [
        { title: "All Orders", url: "/dashboard/orders" },
        { title: "Pending", url: "/dashboard/orders/pending" },
        { title: "Completed", url: "/dashboard/orders/completed" },
        { title: "Returns", url: "/dashboard/orders/returns" },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
      items: [
        { title: "Customer List", url: "/dashboard/customers" },
        { title: "Reviews", url: "/dashboard/customers/reviews" },
      ],
    },
    {
      title: "Access Control",
      url: "/dashboard/access-control",
      icon: ShieldCheck,
      items: [
        { title: "Users", url: "/dashboard/access-control/users" },
        { title: "Roles", url: "/dashboard/access-control/roles" },
        { title: "Activity Logs", url: "/dashboard/access-control/logs" },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        { title: "Profile", url: "/dashboard/settings/profile" },
        { title: "Notifications", url: "/dashboard/settings/notifications" },
        { title: "Billing", url: "/dashboard/settings/billing" },
      ],
    },
  ],
}

export function AppSidebar() {
  const { isActiveRoute, isActiveSubRoute } = useActiveRoute()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data?.navMain.map((item) => {
              const isActive = isActiveRoute(item.url, true) // Use exact matching for main items
              const hasActiveSubItem = item.items?.some(subItem => 
                isActiveSubRoute(item.url, subItem.url)
              )
              
              return item?.items?.length ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive || hasActiveSubItem}
                  className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        tooltip={item.title}
                        isActive={isActive || hasActiveSubItem}
                        className={cn(
                          (isActive || hasActiveSubItem) && "bg-primary/10 text-primary border-l-2 border-primary shadow-sm"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubActive = isActiveSubRoute(item.url, subItem.url)
                          
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isSubActive}
                                className={cn(
                                  isSubActive && "bg-primary/10 text-primary border-1 border-primary shadow-sm font-medium"
                                )}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={isActive}
                    className={cn(
                      isActive && "bg-primary/10 text-primary border-l-4 border-primary shadow-sm"
                    )}
                  >
                    <Link
                      href={item.url ?? '/'}
                      className='flex items-center gap-2'>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

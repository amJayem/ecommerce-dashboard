import {
  BarChart,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Tag,
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

// Menu items.

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      isActive: true
      // items: [  { title: "All Products", url: "/" },],
    },
    {
      title: 'Products',
      url: '/products',
      icon: Package,
      isActive: true,
      items: [
        { title: 'All Products', url: '/products' },
        { title: 'Add Product', url: '/products/new' },
        { title: 'Categories', url: '/products/categories' },
        { title: 'Variants', url: '/products/variants' }
      ]
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: ShoppingCart,
      isActive: true,
      items: [
        { title: 'All Orders', url: '/orders' },
        { title: 'Pending', url: '/orders/pending' },
        { title: 'Completed', url: '/orders/completed' },
        { title: 'Returns', url: '/orders/returns' }
      ]
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: Users,
      isActive: true,
      items: [
        { title: 'Customer List', url: '/customers' },
        { title: 'Reviews', url: '/customers/reviews' }
      ]
    },
    // {
    //   title: 'Payments',
    //   url: '/payments',
    //   icon: CreditCard,
    //   isActive: !true,
    //   items: [
    //     { title: 'Transactions', url: '/payments/transactions' },
    //     { title: 'Refunds', url: '/payments/refunds' }
    //   ]
    // },
    {
      title: 'Discounts',
      url: '/discounts',
      isActive: !true,
      icon: Tag,
      items: [
        { title: 'Coupons', url: '/discounts/coupons' },
        { title: 'Campaigns', url: '/discounts/campaigns' }
      ]
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChart,
      isActive: !true,
      items: [
        { title: 'Sales Report', url: '/analytics/sales' },
        { title: 'Product Performance', url: '/analytics/products' },
        { title: 'Customer Insights', url: '/analytics/customers' }
      ]
    },
    // {
    //   title: 'Shipping',
    //   url: '/shipping',
    //   icon: Truck,
    //   isActive: !true,
    //   items: [
    //     { title: 'Shipping Zones', url: '/shipping/zones' },
    //     { title: 'Rates', url: '/shipping/rates' }
    //   ]
    // },
    // {
    //   title: 'Store Settings',
    //   url: '/store-settings',
    //   icon: Store, isActive: !true,
    //   items: [
    //     { title: 'General', url: '/store-settings/general' },
    //     { title: 'Tax', url: '/store-settings/tax' },
    //     { title: 'Payments', url: '/store-settings/payments' }
    //   ]
    // },
    {
      title: 'Access Control',
      url: '/access-control',
      icon: ShieldCheck,
      isActive: true,
      items: [
        { title: 'Users', url: '/access-control/users' },
        { title: 'Roles', url: '/access-control/roles' },
        { title: 'Activity Logs', url: '/access-control/logs' }
      ]
    },
    // {
    //   title: 'Support',
    //   url: '/support',
    //   icon: HelpCircle, isActive: !true,
    //   items: [
    //     { title: 'Tickets', url: '/support/tickets' },
    //     { title: 'FAQs', url: '/support/faqs' }
    //   ]
    // },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      items: [
        { title: 'Profile', url: '/settings/profile' },
        { title: 'Notifications', url: '/settings/notifications' },
        { title: 'Billing', url: '/settings/billing' }
      ]
    }
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: 'IconCamera',
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#'
        },
        {
          title: 'Archived',
          url: '#'
        }
      ]
    },
    {
      title: 'Proposal',
      icon: 'IconFileDescription',
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#'
        },
        {
          title: 'Archived',
          url: '#'
        }
      ]
    },
    {
      title: 'Prompts',
      icon: 'IconFileAi',
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#'
        },
        {
          title: 'Archived',
          url: '#'
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: 'IconSettings'
    },
    {
      title: 'Get Help',
      url: '#',
      icon: 'IconHelp'
    },
    {
      title: 'Search',
      url: '#',
      icon: 'IconSearch'
    }
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: 'IconDatabase'
    },
    {
      name: 'Reports',
      url: '#',
      icon: 'IconReport'
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: 'IconFileWord'
    }
  ]
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data?.navMain.map((item) => item?.items?.length ? (

              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                            {/* <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a> */}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) :
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url ?? "/"} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

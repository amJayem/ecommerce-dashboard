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
    // ───────────────────────────────────── Dashboard root
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },

    // ───────────────────────────────────── Products
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
      isActive: true,
      items: [
        { title: "All Products", url: "/dashboard/products" },
        { title: "Add Product", url: "/dashboard/products/new" },
        { title: "Categories", url: "/dashboard/products/categories" },
        { title: "Variants", url: "/dashboard/products/variants" },
      ],
    },

    // ───────────────────────────────────── Orders
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
      isActive: true,
      items: [
        { title: "All Orders", url: "/dashboard/orders" },
        { title: "Pending", url: "/dashboard/orders/pending" },
        { title: "Completed", url: "/dashboard/orders/completed" },
        { title: "Returns", url: "/dashboard/orders/returns" },
      ],
    },

    // ───────────────────────────────────── Customers
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
      isActive: true,
      items: [
        { title: "Customer List", url: "/dashboard/customers" },
        { title: "Reviews", url: "/dashboard/customers/reviews" },
      ],
    },

    // ───────────────────────────────────── Discounts
    {
      title: "Discounts",
      url: "/dashboard/discounts",
      icon: Tag,
      isActive: false, // set true when pages exist
      items: [
        { title: "Coupons", url: "/dashboard/discounts/coupons" },
        { title: "Campaigns", url: "/dashboard/discounts/campaigns" },
      ],
    },

    // ───────────────────────────────────── Analytics
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
      isActive: false,
      items: [
        { title: "Sales Report", url: "/dashboard/analytics/sales" },
        { title: "Product Performance", url: "/dashboard/analytics/products" },
        { title: "Customer Insights", url: "/dashboard/analytics/customers" },
      ],
    },

    // ───────────────────────────────────── Access Control
    {
      title: "Access Control",
      url: "/dashboard/access-control",
      icon: ShieldCheck,
      isActive: true,
      items: [
        { title: "Users", url: "/dashboard/access-control/users" },
        { title: "Roles", url: "/dashboard/access-control/roles" },
        { title: "Activity Logs", url: "/dashboard/access-control/logs" },
      ],
    },

    // ───────────────────────────────────── Settings
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: true,
      items: [
        { title: "Profile", url: "/dashboard/settings/profile" },
        { title: "Notifications", url: "/dashboard/settings/notifications" },
        { title: "Billing", url: "/dashboard/settings/billing" },
      ],
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

    // {
    //   title: 'Support',
    //   url: '/support',
    //   icon: HelpCircle, isActive: !true,
    //   items: [
    //     { title: 'Tickets', url: '/support/tickets' },
    //     { title: 'FAQs', url: '/support/faqs' }
    //   ]
    // },
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
            {data?.navMain.map((item) =>
              item?.items?.length ? (
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
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url ?? '/'}
                      className='flex items-center gap-2'>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
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

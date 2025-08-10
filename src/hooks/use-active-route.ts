import { usePathname } from 'next/navigation'

export function useActiveRoute() {
  const pathname = usePathname()

  const isActiveRoute = (route: string, exact: boolean = false) => {
    if (exact) {
      return pathname === route
    }
    // For non-exact matching, ensure we match the full segment
    // This prevents /dashboard from matching /dashboard/products
    if (route === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(route + '/') || pathname === route
  }

  const isActiveSubRoute = (parentRoute: string, subRoute: string) => {
    return pathname === subRoute
  }

  return {
    pathname,
    isActiveRoute,
    isActiveSubRoute
  }
}

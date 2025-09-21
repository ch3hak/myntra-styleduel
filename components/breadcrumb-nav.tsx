"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

const pathLabels: Record<string, string> = {
  "/": "Home",
  "/themes": "Themes",
  "/create-outfit": "Create Outfit",
  "/create-outfit/moodboard": "Moodboard",
  "/vote": "Vote",
  "/leaderboard": "Leaderboard",
  "/winners": "Winners",
  "/my-outfits": "My Outfits",
}

export function BreadcrumbNav() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/")
    return {
      label: pathLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
      isLast: index === pathSegments.length - 1,
    }
  })

  return (
    <nav className="bg-white border-b px-4 py-2">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
              <Home className="h-4 w-4" />
            </Link>
          </li>
          {breadcrumbs.map((crumb) => (
            <li key={crumb.path} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {crumb.isLast ? (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.path} className="text-gray-500 hover:text-gray-700">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Palette, Vote, Trophy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === "/" || pathname.startsWith("/create-outfit") || pathname.startsWith("/vote")) {
    return null
  }

  const actions = [
    { href: "/themes", icon: Palette, label: "Create Outfit", color: "bg-amber-600 hover:bg-amber-700" },
    { href: "/vote", icon: Vote, label: "Vote", color: "bg-indigo-600 hover:bg-indigo-700" },
    { href: "/leaderboard", icon: Trophy, label: "Leaderboard", color: "bg-purple-600 hover:bg-purple-700" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Button
                  size="sm"
                  className={`${action.color} text-white shadow-lg animate-in slide-in-from-bottom-2 duration-200`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              </Link>
            )
          })}
        </div>
      )}

      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-700 hover:to-indigo-700 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className={`h-6 w-6 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </Button>
    </div>
  )
}

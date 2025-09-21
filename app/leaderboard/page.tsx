import { Suspense } from "react"
import { LeaderboardClient } from "@/components/leaderboard-client"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
        }
      >
        <LeaderboardClient />
      </Suspense>
    </div>
  )
}

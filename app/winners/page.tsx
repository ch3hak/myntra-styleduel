import { Suspense } from "react"
import { WinnersShowcase } from "@/components/winners-showcase"

export default function WinnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          }
        >
          <WinnersShowcase />
        </Suspense>
      </div>
    </div>
  )
}

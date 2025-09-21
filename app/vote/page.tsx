import { Suspense } from "react"
import { VotingClient } from "@/components/voting-client"
import { SuccessModal } from "@/components/success-modal"

export default function VotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-50">
      <Suspense fallback={<div>Loading...</div>}>
        <VotingClient />
      </Suspense>
      <SuccessModal />
    </div>
  )
}

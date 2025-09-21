import { Suspense } from "react"
import { MoodboardClient } from "@/components/moodboard-client"

export default function MoodboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoodboardClient />
    </Suspense>
  )
}

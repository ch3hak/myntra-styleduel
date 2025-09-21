import { Suspense } from "react"
import { CreateOutfitClient } from "@/components/create-outfit-client"

export default function CreateOutfitPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateOutfitClient />
    </Suspense>
  )
}

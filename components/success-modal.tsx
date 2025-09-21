"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Trophy, Users, ArrowRight } from "lucide-react"

export function SuccessModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      setIsVisible(true)
    }
  }, [searchParams])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Outfit Submitted!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Your outfit has been successfully submitted to the style duel. Now it's time to vote on other amazing
            creations!
          </p>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-amber-600" />
              <p className="text-sm font-medium">Compete for prizes</p>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
              <p className="text-sm font-medium">Community voting</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                setIsVisible(false)
                router.push("/vote")
              }}
              className="w-full"
            >
              Start Voting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsVisible(false)
                router.push("/my-outfits")
              }}
              className="w-full"
            >
              View My Outfits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

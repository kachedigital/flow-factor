"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, SnowflakeIcon as Confetti } from "lucide-react"

export default function RewardCard() {
  const [rewardClaimed, setRewardClaimed] = useState(false)

  const handleClaimReward = () => {
    setRewardClaimed(true)
  }

  return (
    <Card className="p-6 rounded-lg shadow-md bg-card text-card-foreground flex flex-col justify-between">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl flex items-center">
          {rewardClaimed ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Reward Claimed!
            </>
          ) : (
            <>
              <Confetti className="mr-2 h-5 w-5 text-yellow-500" />
              Congratulations!
            </>
          )}
        </CardTitle>
        <CardDescription>You've earned a reward for completing your task!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewardClaimed ? (
          <p className="text-center text-lg">Enjoy your well-deserved break!</p>
        ) : (
          <>
            <p className="text-center text-lg">Take a 15-minute break to recharge.</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Step away from your computer</li>
              <li>Do something enjoyable</li>
              <li>Return refreshed</li>
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {!rewardClaimed ? (
          <Button onClick={handleClaimReward} className="w-full">
            Claim Reward
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            Reward Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Regular Card */}
      <Card>
        <CardHeader>
          <CardTitle>Regular Card</CardTitle>
          <CardDescription>This is a standard card without glow effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has no special effects applied to it.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>

      {/* Card with Hover Glow */}
      <Card glow>
        <CardHeader>
          <CardTitle>Hover Glow Card</CardTitle>
          <CardDescription>This card has an orange glow on hover</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hover over this card to see the orange glow effect.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>

      {/* Card with Permanent Glow */}
      <Card glowActive>
        <CardHeader>
          <CardTitle>Active Glow Card</CardTitle>
          <CardDescription>This card always has the orange glow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card always displays the orange glow effect.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

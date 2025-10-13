import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

export default function ToolsLoading() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Skeleton className="h-12 w-[300px] sm:w-[400px] md:w-[500px] mx-auto" />
              <Skeleton className="h-6 w-[250px] sm:w-[350px] md:w-[450px] mx-auto" />
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex space-x-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Skeleton className="h-10 w-[250px] mx-auto" />
              <Skeleton className="h-6 w-[300px] mx-auto" />
            </div>
          </div>

          <div className="mt-12">
            <Skeleton className="h-10 w-full mb-8" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-[150px]" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-3/4 mt-1" />
                    </CardHeader>
                    <CardFooter>
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Skeleton className="h-10 w-[300px] mx-auto" />
              <Skeleton className="h-6 w-[350px] mx-auto" />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}

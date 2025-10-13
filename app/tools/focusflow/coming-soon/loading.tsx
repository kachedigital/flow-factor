import { Skeleton } from "@/components/ui/skeleton"

export default function ComingSoonLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl mx-auto px-4 py-8 flex-1 flex flex-col">
        <Skeleton className="h-10 w-32 mb-8" />

        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <Skeleton className="w-24 h-24 rounded-full mb-8" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>

          <Skeleton className="h-12 w-full max-w-md mx-auto" />
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <Skeleton className="h-6 w-full max-w-lg mx-auto" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function MindShiftLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
          <Skeleton className="h-6 w-[500px] mx-auto" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

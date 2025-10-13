import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Skeleton className="h-8 w-[200px]" />
          <div className="ml-auto flex items-center space-x-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-8 w-[120px]" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Skeleton className="h-[300px] w-full lg:col-span-4" />
            <Skeleton className="h-[300px] w-full lg:col-span-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

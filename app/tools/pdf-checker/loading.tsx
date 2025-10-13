import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-12 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-textSecondary">Loading PDF Checker...</p>
      </div>
    </div>
  )
}

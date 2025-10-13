import Link from "next/link"

export function LogoBanner() {
  return (
    <div className="w-full bg-white py-6 border-b">
      <div className="container mx-auto px-6 flex justify-start">
        <Link href="/">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FlowFactor
          </h1>
        </Link>
      </div>
    </div>
  )
}

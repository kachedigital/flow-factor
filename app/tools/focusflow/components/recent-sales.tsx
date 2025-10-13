import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Website Redesign</p>
          <p className="text-sm text-muted-foreground">Completed wireframes and mockups</p>
        </div>
        <div className="ml-auto font-medium">Today</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>LM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Client Presentation</p>
          <p className="text-sm text-muted-foreground">Finalized slides and talking points</p>
        </div>
        <div className="ml-auto font-medium">Yesterday</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Marketing Campaign</p>
          <p className="text-sm text-muted-foreground">Created social media content calendar</p>
        </div>
        <div className="ml-auto font-medium">2 days ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Product Development</p>
          <p className="text-sm text-muted-foreground">Completed feature specification</p>
        </div>
        <div className="ml-auto font-medium">3 days ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Research Project</p>
          <p className="text-sm text-muted-foreground">Analyzed competitor strategies</p>
        </div>
        <div className="ml-auto font-medium">5 days ago</div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Sparkles, Palette, Layers, Zap, FileText, Globe, Accessibility } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToolCard } from "@/components/tool-card"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
  CommandItem,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MindShiftFeatureCard } from "@/components/mindshift-feature-card"
import { AlignaFeatureCard } from "@/components/aligna-feature-card"
import { AxiaFeatureCard } from "@/components/axia-feature-card"
import { ComingSoonClient } from "./coming-soon-client"

const categories = [
  {
    label: "All",
    value: "all",
    icon: Sparkles,
  },
  {
    label: "Design",
    value: "design",
    icon: Palette,
  },
  {
    label: "Frontend",
    value: "frontend",
    icon: Layers,
  },
  {
    label: "Backend",
    value: "backend",
    icon: Zap,
  },
  {
    label: "Documentation",
    value: "documentation",
    icon: FileText,
  },
  {
    label: "SEO",
    value: "seo",
    icon: Globe,
  },
  {
    label: "Accessibility",
    value: "accessibility",
    icon: Accessibility,
  },
]

const tools = [
  {
    icon: Palette,
    title: "Figma",
    description: "Collaborative interface design tool.",
    link: "/tools/figma",
    category: "design",
  },
  {
    icon: Layers,
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    link: "/tools/react",
    category: "frontend",
  },
  {
    icon: Zap,
    title: "Node.js",
    description: "JavaScript runtime environment.",
    link: "/tools/node",
    category: "backend",
  },
  {
    icon: FileText,
    title: "Docusaurus",
    description: "Static site generator for documentation.",
    link: "/tools/docusaurus",
    category: "documentation",
  },
  {
    icon: Globe,
    title: "Semrush",
    description: "Online visibility management and SEO platform",
    link: "/tools/semrush",
    category: "seo",
  },
  {
    icon: Accessibility,
    title: {
      main: "Axia",
      sub: "Complete Accessibility Suite",
    },
    description: "Comprehensive accessibility testing for both web content and PDF documents in one unified platform.",
    link: "/tools/axia",
    category: "accessibility",
  },
]

export const ToolsClient = () => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<string>("all")

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Input placeholder="Search tools..." />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="ml-auto w-[200px] justify-between"
            >
              Category
              <Sparkles className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentValue) => {
                        setCategory(currentValue === category.value ? "" : category.value)
                        setOpen(false)
                      }}
                    >
                      {category.label}
                      <Check
                        className={cn("ml-auto h-4 w-4", category.value === category ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <CommandSeparator />
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            {category.value === "all" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                <AlignaFeatureCard />
                <MindShiftFeatureCard />
                <AxiaFeatureCard />
                {tools
                  .filter(
                    (tool) =>
                      typeof tool.title === "string" ||
                      (typeof tool.title === "object" &&
                        tool.title.main !== "Aligna" &&
                        tool.title.main !== "MindShift" &&
                        tool.title.main !== "Axia"),
                  )
                  .map((tool) => (
                    <ToolCard key={typeof tool.title === "string" ? tool.title : tool.title.main} {...tool} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {tools
                  .filter((tool) => tool.category === category.value)
                  .map((tool) => (
                    <ToolCard key={typeof tool.title === "string" ? tool.title : tool.title.main} {...tool} />
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

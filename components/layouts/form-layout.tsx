"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModuleNav, type MenuItem } from "@/components/module-nav"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface FormLayoutProps {
  title: string
  subtitle: string
  moduleKey: string
  navItems: MenuItem[]
  backPath: string
  backLabel: string
  isNew?: boolean
  onSave: () => Promise<void>
  onDelete?: () => Promise<void>
  children: React.ReactNode
}

export function FormLayout({
  title,
  subtitle,
  moduleKey,
  navItems,
  backPath,
  backLabel,
  isNew = false,
  onSave,
  onDelete,
  children,
}: FormLayoutProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await onSave()
      toast({
        title: "Saved successfully",
        description: `${title} has been saved.`,
      })
      router.push(backPath)
    } catch (error) {
      toast({
        title: "Error saving",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete) return

    setIsLoading(true)
    try {
      await onDelete()
      toast({
        title: "Deleted successfully",
        description: `${title} has been deleted.`,
      })
      router.push(backPath)
    } catch (error) {
      toast({
        title: "Error deleting",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <ModuleNav items={navItems} moduleKey={moduleKey} />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push(backPath)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">{isNew ? `Add New ${title}` : subtitle}</h2>
          </div>
          <div className="flex items-center space-x-2">
            {!isNew && onDelete && (
              <Button variant="outline" onClick={handleDelete} disabled={isLoading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}


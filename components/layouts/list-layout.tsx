"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { ModuleNav, type MenuItem } from "@/components/module-nav"
import { Plus } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import type { ColumnDef } from "@tanstack/react-table"

interface ListLayoutProps<TData> {
  title: string
  moduleKey: string
  navItems: MenuItem[]
  columns: ColumnDef<TData, any>[]
  data: TData[]
  addNewPath: string
  addNewTitleKey: string
  detailPath: (id: string) => string
  getItemId: (item: TData) => string
  filterField?: string
  filterPlaceholder?: string
}

export function ListLayout<TData>({
  title,
  moduleKey,
  navItems,
  columns,
  data,
  addNewPath,
  addNewTitleKey,
  detailPath,
  getItemId,
  filterField = "name",
  filterPlaceholder,
}: ListLayoutProps<TData>) {
  const { t } = useApp()
  const router = useRouter()

  const handleRowClick = (item: TData) => {
    const id = getItemId(item)
    router.push(detailPath(id))
  }

  return (
    <div className="flex flex-col">
      <ModuleNav items={navItems} moduleKey={moduleKey} />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => router.push(addNewPath)}>
              <Plus className="mr-2 h-4 w-4" />
              {t(addNewTitleKey)}
            </Button>
          </div>
        </div>
        <div className="container mx-auto py-4">
          <DataTable
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            filterField={filterField}
            filterPlaceholder={filterPlaceholder || `Filter ${title.toLowerCase()}...`}
          />
        </div>
      </div>
    </div>
  )
}


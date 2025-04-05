"use client"
import { useApp } from "@/contexts/app-context"
import { ListLayout } from "@/components/layouts/list-layout"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

const inventoryNavItems = [
  {
    titleKey: "products",
    href: "/inventory",
  },
  {
    titleKey: "categories",
    href: "/inventory/categories",
  },
  {
    titleKey: "suppliers",
    href: "/inventory/suppliers",
  },
  {
    titleKey: "movements",
    href: "/inventory/movements",
  },
]

// Tipo para categoría
type Category = {
  id: string
  name: string
  description: string
  productCount: number
  status: "Active" | "Inactive"
}

// Datos de ejemplo
const categoryData: Category[] = [
  {
    id: "CAT001",
    name: "Electronics",
    description: "Electronic devices and accessories",
    productCount: 24,
    status: "Active",
  },
  {
    id: "CAT002",
    name: "Furniture",
    description: "Office and home furniture",
    productCount: 12,
    status: "Active",
  },
  {
    id: "CAT003",
    name: "Office Supplies",
    description: "General office supplies and stationery",
    productCount: 35,
    status: "Active",
  },
  {
    id: "CAT004",
    name: "Networking",
    description: "Network equipment and accessories",
    productCount: 8,
    status: "Active",
  },
  {
    id: "CAT005",
    name: "Software",
    description: "Software licenses and subscriptions",
    productCount: 15,
    status: "Active",
  },
  {
    id: "CAT006",
    name: "Accessories",
    description: "Computer and device accessories",
    productCount: 42,
    status: "Active",
  },
  {
    id: "CAT007",
    name: "Storage",
    description: "Storage solutions and devices",
    productCount: 9,
    status: "Inactive",
  },
]

// Columnas para la tabla
const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "productCount",
    header: "Products",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
    },
  },
]

export default function CategoriesPage() {
  const { t } = useApp()

  return (
    <ListLayout<Category>
      title={t("categories")}
      moduleKey="inventory"
      navItems={inventoryNavItems}
      columns={columns}
      data={categoryData}
      addNewPath="/inventory/categories/new"
      addNewTitleKey="addCategory"
      detailPath={(id) => `/inventory/categories/${id}`}
      getItemId={(category) => category.id}
      filterField="name"
    />
  )
}


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

// Tipo para movimiento
type Movement = {
  id: string
  date: string
  productId: string
  productName: string
  type: "In" | "Out" | "Adjustment"
  quantity: number
  reason: string
  user: string
}

// Datos de ejemplo
const movementData: Movement[] = [
  {
    id: "MOV001",
    date: "2023-04-15",
    productId: "INV001",
    productName: "Dell XPS 13 Laptop",
    type: "In",
    quantity: 10,
    reason: "Purchase from supplier",
    user: "John Smith",
  },
  {
    id: "MOV002",
    date: "2023-04-16",
    productId: "INV002",
    productName: 'LG 27" Monitor',
    type: "Out",
    quantity: 2,
    reason: "Customer order",
    user: "Mary Johnson",
  },
  {
    id: "MOV003",
    date: "2023-04-17",
    productId: "INV003",
    productName: "Logitech Mechanical Keyboard",
    type: "In",
    quantity: 15,
    reason: "Purchase from supplier",
    user: "John Smith",
  },
  {
    id: "MOV004",
    date: "2023-04-18",
    productId: "INV004",
    productName: "Wireless Mouse",
    type: "Out",
    quantity: 5,
    reason: "Customer order",
    user: "Sarah Brown",
  },
  {
    id: "MOV005",
    date: "2023-04-19",
    productId: "INV005",
    productName: "HP LaserJet Printer",
    type: "Adjustment",
    quantity: -1,
    reason: "Inventory count correction",
    user: "Michael Davis",
  },
  {
    id: "MOV006",
    date: "2023-04-20",
    productId: "INV006",
    productName: "Adjustable Desk",
    type: "In",
    quantity: 3,
    reason: "Purchase from supplier",
    user: "John Smith",
  },
  {
    id: "MOV007",
    date: "2023-04-21",
    productId: "INV007",
    productName: "Ergonomic Chair",
    type: "Out",
    quantity: 1,
    reason: "Internal use",
    user: "Jennifer Miller",
  },
]

// Columnas para la tabla
const columns: ColumnDef<Movement>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "productName",
    header: "Product",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <Badge variant={type === "In" ? "default" : type === "Out" ? "secondary" : "outline"}>{type}</Badge>
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number
      const type = row.row.original.type // Access the type from the original data
      const isNegative = quantity < 0
      return (
        <div className={isNegative ? "text-red-500" : ""}>
          {quantity > 0 && type !== "Out" ? "+" : ""}
          {quantity}
        </div>
      )
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "user",
    header: "User",
  },
]

export default function MovementsPage() {
  const { t } = useApp()

  return (
    <ListLayout<Movement>
      title={t("movements")}
      moduleKey="inventory"
      navItems={inventoryNavItems}
      columns={columns}
      data={movementData}
      addNewPath="/inventory/movements/new"
      addNewTitleKey="addMovement"
      detailPath={(id) => `/inventory/movements/${id}`}
      getItemId={(movement) => movement.id}
      filterField="productName"
    />
  )
}


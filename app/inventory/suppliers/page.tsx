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

// Tipo para proveedor
type Supplier = {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  address: string
  status: "Active" | "Inactive"
}

// Datos de ejemplo
const supplierData: Supplier[] = [
  {
    id: "SUP001",
    name: "Tech Solutions Inc.",
    contact: "John Doe",
    email: "john.doe@techsolutions.com",
    phone: "555-123-4567",
    address: "123 Tech St, San Francisco, CA",
    status: "Active",
  },
  {
    id: "SUP002",
    name: "Office Depot",
    contact: "Jane Smith",
    email: "jane.smith@officedepot.com",
    phone: "555-987-6543",
    address: "456 Office Blvd, Chicago, IL",
    status: "Active",
  },
  {
    id: "SUP003",
    name: "Furniture World",
    contact: "Robert Johnson",
    email: "robert@furnitureworld.com",
    phone: "555-456-7890",
    address: "789 Furniture Ave, New York, NY",
    status: "Active",
  },
  {
    id: "SUP004",
    name: "Network Systems",
    contact: "Sarah Williams",
    email: "sarah@networksystems.com",
    phone: "555-789-0123",
    address: "321 Network Dr, Austin, TX",
    status: "Inactive",
  },
  {
    id: "SUP005",
    name: "Global Electronics",
    contact: "Michael Brown",
    email: "michael@globalelectronics.com",
    phone: "555-234-5678",
    address: "567 Global St, Seattle, WA",
    status: "Active",
  },
]

// Columnas para la tabla
const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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

export default function SuppliersPage() {
  const { t } = useApp()

  return (
    <ListLayout<Supplier>
      title={t("suppliers")}
      moduleKey="inventory"
      navItems={inventoryNavItems}
      columns={columns}
      data={supplierData}
      addNewPath="/inventory/suppliers/new"
      addNewTitleKey="addSupplier"
      detailPath={(id) => `/inventory/suppliers/${id}`}
      getItemId={(supplier) => supplier.id}
      filterField="name"
    />
  )
}


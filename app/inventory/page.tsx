"use client"

import { columns, type Product } from "./columns"
import { ListLayout } from "@/components/layouts/list-layout"
import { useApp } from "@/contexts/app-context"

// Corregir las rutas de navegación
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

// Datos de ejemplo más completos
export const productData: Product[] = [
  {
    id: "INV001",
    name: "Dell XPS 13 Laptop",
    category: "Electronics",
    price: 1299.99,
    stock: 24,
    status: "Available",
    description: "13-inch laptop with Intel Core i7, 16GB RAM, 512GB SSD, and Windows 11 Pro.",
    sku: "DELL-XPS13-001",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV002",
    name: 'LG 27" Monitor',
    category: "Electronics",
    price: 349.99,
    stock: 15,
    status: "Available",
    description: "27-inch 4K UHD IPS monitor with HDR support and USB-C connectivity.",
    sku: "LG-MON27-002",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV003",
    name: "Logitech Mechanical Keyboard",
    category: "Accessories",
    price: 129.99,
    stock: 42,
    status: "Available",
    description: "Mechanical gaming keyboard with RGB lighting and programmable keys.",
    sku: "LOG-MECH-003",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV004",
    name: "Wireless Mouse",
    category: "Accessories",
    price: 49.99,
    stock: 38,
    status: "Available",
    description: "Ergonomic wireless mouse with adjustable DPI and long battery life.",
    sku: "WL-MOUSE-004",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV005",
    name: "HP LaserJet Printer",
    category: "Electronics",
    price: 299.99,
    stock: 7,
    status: "Low Stock",
    description: "Color laser printer with wireless connectivity and automatic duplex printing.",
    sku: "HP-LASER-005",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV006",
    name: "Adjustable Desk",
    category: "Furniture",
    price: 499.99,
    stock: 3,
    status: "Low Stock",
    description: "Electric height-adjustable standing desk with memory settings.",
    sku: "ADJ-DESK-006",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV007",
    name: "Ergonomic Chair",
    category: "Furniture",
    price: 249.99,
    stock: 0,
    status: "Out of Stock",
    description: "Ergonomic office chair with lumbar support and adjustable armrests.",
    sku: "ERG-CHAIR-007",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "INV008",
    name: "Samsung Tablet",
    category: "Electronics",
    price: 399.99,
    stock: 12,
    status: "Available",
    description: "10.5-inch Android tablet with 128GB storage and S Pen support.",
    sku: "SAM-TAB-008",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function InventoryPage() {
  const { t } = useApp()

  return (
    <ListLayout<Product>
      title={t("products")}
      moduleKey="inventory"
      navItems={inventoryNavItems}
      columns={columns}
      data={productData}
      addNewPath="/inventory/new"
      addNewTitleKey="addProduct"
      detailPath={(id) => `/inventory/${id}`}
      getItemId={(product) => product.id}
      filterField="name"
    />
  )
}


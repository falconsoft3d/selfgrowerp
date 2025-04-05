"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
import { productData } from "../page"
import type { Product } from "../columns"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FormLayout } from "@/components/layouts/form-layout"

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

const categories = ["Electronics", "Accessories", "Furniture", "Office Supplies", "Networking", "Storage", "Software"]

const statuses = ["Available", "Low Stock", "Out of Stock"]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const isNew = params.id === "new"

  // Fetch product data
  useEffect(() => {
    const productId = params.id as string

    // For new product
    if (isNew) {
      setProduct({
        id: `INV${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(3, "0")}`,
        name: "",
        category: "Electronics",
        price: 0,
        stock: 0,
        status: "Available",
        description: "",
        sku: "",
        image: "/placeholder.svg?height=300&width=300",
      })
      return
    }

    // Find product in our sample data
    const foundProduct = productData.find((p) => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      toast({
        title: "Product not found",
        description: "The requested product could not be found.",
        variant: "destructive",
      })
      router.push("/inventory")
    }
  }, [params.id, router, toast, isNew])

  const handleSave = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  const handleDelete = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  if (!product) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <FormLayout
      title="Product"
      subtitle={`Edit Product: ${product.name}`}
      moduleKey="inventory"
      navItems={inventoryNavItems}
      backPath="/inventory"
      backLabel="Back to Products"
      isNew={isNew}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Product Information */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={product.sku || ""}
                  onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={product.description || ""}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing and Inventory */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pricing & Inventory</h3>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: Number.parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={product.status}
                  onValueChange={(value: "Available" | "Low Stock" | "Out of Stock") =>
                    setProduct({ ...product, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative h-40 w-40 overflow-hidden rounded-md border">
                    <Image
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  )
}


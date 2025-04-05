"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FormLayout } from "@/components/layouts/form-layout"
import type { Employee } from "../columns"
import type { MenuItem } from "@/components/module-nav"

// Estructura de menú jerárquica para empleados
const employeesNavItems: MenuItem[] = [
  {
    titleKey: "list",
    href: "/employees",
  },
  {
    titleKey: "departments",
    href: "/employees/departments",
  },
  {
    titleKey: "positions",
    href: "/employees/positions",
  },
  {
    titleKey: "contracts",
    href: "/employees/contracts",
    children: [
      {
        titleKey: "initialContracts",
        href: "/employees/contracts/initial",
      },
      {
        titleKey: "renewals",
        href: "/employees/contracts/renewals",
      },
      {
        titleKey: "terminations",
        href: "/employees/contracts/terminations",
      },
    ],
  },
  {
    titleKey: "permissions",
    href: "/employees/permissions",
  },
]

// Sample data for departments and positions
const departments = [
  "Development",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Support",
  "Design",
  "Operations",
]
const positions = [
  "Senior Developer",
  "Frontend Developer",
  "Backend Developer",
  "Marketing Director",
  "Sales Representative",
  "HR Manager",
  "Accountant",
  "Support Technician",
  "UX/UI Designer",
]

// Sample employee data
const employeeData: Employee[] = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Development",
    position: "Senior Developer",
    email: "john.smith@company.com",
    hireDate: "2020-05-12",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Mary Johnson",
    department: "Marketing",
    position: "Marketing Director",
    email: "mary.johnson@company.com",
    hireDate: "2019-03-24",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Robert Williams",
    department: "Sales",
    position: "Sales Representative",
    email: "robert.williams@company.com",
    hireDate: "2021-01-15",
    status: "Active",
  },
  {
    id: "EMP004",
    name: "Sarah Brown",
    department: "Human Resources",
    position: "HR Manager",
    email: "sarah.brown@company.com",
    hireDate: "2018-11-05",
    status: "Active",
  },
  {
    id: "EMP005",
    name: "Michael Davis",
    department: "Finance",
    position: "Accountant",
    email: "michael.davis@company.com",
    hireDate: "2022-02-28",
    status: "Active",
  },
  {
    id: "EMP006",
    name: "Jennifer Miller",
    department: "Development",
    position: "Frontend Developer",
    email: "jennifer.miller@company.com",
    hireDate: "2021-07-19",
    status: "Active",
  },
  {
    id: "EMP007",
    name: "David Wilson",
    department: "Support",
    position: "Support Technician",
    email: "david.wilson@company.com",
    hireDate: "2020-09-10",
    status: "Inactive",
  },
  {
    id: "EMP008",
    name: "Lisa Taylor",
    department: "Design",
    position: "UX/UI Designer",
    email: "lisa.taylor@company.com",
    hireDate: "2022-04-03",
    status: "Active",
  },
]

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const isNew = params.id === "new"

  // Fetch employee data
  useEffect(() => {
    const employeeId = params.id as string

    // For new employee
    if (isNew) {
      setEmployee({
        id: `EMP${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(3, "0")}`,
        name: "",
        department: "Development",
        position: "Senior Developer",
        email: "",
        hireDate: new Date().toISOString().split("T")[0],
        status: "Active",
      })
      return
    }

    // Find employee in our sample data
    const foundEmployee = employeeData.find((e) => e.id === employeeId)
    if (foundEmployee) {
      setEmployee(foundEmployee)
    } else {
      toast({
        title: "Employee not found",
        description: "The requested employee could not be found.",
        variant: "destructive",
      })
      router.push("/employees")
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

  if (!employee) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <FormLayout
      title="Employee"
      subtitle={`Edit Employee: ${employee.name}`}
      moduleKey="employees"
      navItems={employeesNavItems}
      backPath="/employees"
      backLabel="Back to Employees"
      isNew={isNew}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={employee.name}
                  onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={employee.email}
                  onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={employee.hireDate}
                  onChange={(e) => setEmployee({ ...employee, hireDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt={employee.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Information */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Job Information</h3>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={employee.department}
                  onValueChange={(value) => setEmployee({ ...employee, department: value })}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={employee.position}
                  onValueChange={(value) => setEmployee({ ...employee, position: value })}
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={employee.status}
                  onValueChange={(value: "Active" | "Inactive") => setEmployee({ ...employee, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input id="employeeId" value={employee.id} disabled={true} className="bg-muted" />
                <p className="text-xs text-muted-foreground">
                  Employee ID is generated automatically and cannot be changed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  )
}


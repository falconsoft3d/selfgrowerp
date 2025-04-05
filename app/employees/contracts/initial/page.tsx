"use client"

import { useApp } from "@/contexts/app-context"
import { ListLayout } from "@/components/layouts/list-layout"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
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

// Tipo para contrato inicial
type InitialContract = {
  id: string
  employeeId: string
  employeeName: string
  startDate: string
  endDate: string
  position: string
  salary: number
  status: "Active" | "Expired" | "Terminated"
}

// Datos de ejemplo
const initialContractsData: InitialContract[] = [
  {
    id: "CONT001",
    employeeId: "EMP001",
    employeeName: "John Smith",
    startDate: "2020-05-12",
    endDate: "2021-05-11",
    position: "Senior Developer",
    salary: 85000,
    status: "Expired",
  },
  {
    id: "CONT002",
    employeeId: "EMP002",
    employeeName: "Mary Johnson",
    startDate: "2019-03-24",
    endDate: "2020-03-23",
    position: "Marketing Director",
    salary: 92000,
    status: "Expired",
  },
  {
    id: "CONT003",
    employeeId: "EMP003",
    employeeName: "Robert Williams",
    startDate: "2021-01-15",
    endDate: "2022-01-14",
    position: "Sales Representative",
    salary: 65000,
    status: "Expired",
  },
  {
    id: "CONT004",
    employeeId: "EMP004",
    employeeName: "Sarah Brown",
    startDate: "2018-11-05",
    endDate: "2019-11-04",
    position: "HR Manager",
    salary: 78000,
    status: "Expired",
  },
  {
    id: "CONT005",
    employeeId: "EMP005",
    employeeName: "Michael Davis",
    startDate: "2022-02-28",
    endDate: "2023-02-27",
    position: "Accountant",
    salary: 72000,
    status: "Active",
  },
  {
    id: "CONT006",
    employeeId: "EMP006",
    employeeName: "Jennifer Miller",
    startDate: "2021-07-19",
    endDate: "2022-07-18",
    position: "Frontend Developer",
    salary: 75000,
    status: "Expired",
  },
  {
    id: "CONT007",
    employeeId: "EMP007",
    employeeName: "David Wilson",
    startDate: "2020-09-10",
    endDate: "2021-09-09",
    position: "Support Technician",
    salary: 62000,
    status: "Terminated",
  },
]

// Columnas para la tabla
const columns: ColumnDef<InitialContract>[] = [
  {
    accessorKey: "id",
    header: "Contract ID",
  },
  {
    accessorKey: "employeeName",
    header: "Employee",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = Number.parseFloat(row.getValue("salary"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "default" : status === "Expired" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
]

export default function InitialContractsPage() {
  const { t } = useApp()

  return (
    <ListLayout<InitialContract>
      title={t("initialContracts")}
      moduleKey="employees"
      navItems={employeesNavItems}
      columns={columns}
      data={initialContractsData}
      addNewPath="/employees/contracts/initial/new"
      addNewTitleKey="addInitialContract"
      detailPath={(id) => `/employees/contracts/initial/${id}`}
      getItemId={(contract) => contract.id}
      filterField="employeeName"
    />
  )
}


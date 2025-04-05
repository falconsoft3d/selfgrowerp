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

// Tipo para renovación de contrato
type ContractRenewal = {
  id: string
  employeeId: string
  employeeName: string
  previousContractId: string
  startDate: string
  endDate: string
  position: string
  salary: number
  salaryIncrease: number
  status: "Active" | "Expired" | "Terminated"
}

// Datos de ejemplo
const renewalsData: ContractRenewal[] = [
  {
    id: "REN001",
    employeeId: "EMP001",
    employeeName: "John Smith",
    previousContractId: "CONT001",
    startDate: "2021-05-12",
    endDate: "2022-05-11",
    position: "Senior Developer",
    salary: 90000,
    salaryIncrease: 5.88,
    status: "Expired",
  },
  {
    id: "REN002",
    employeeId: "EMP002",
    employeeName: "Mary Johnson",
    previousContractId: "CONT002",
    startDate: "2020-03-24",
    endDate: "2021-03-23",
    position: "Marketing Director",
    salary: 95000,
    salaryIncrease: 3.26,
    status: "Expired",
  },
  {
    id: "REN003",
    employeeId: "EMP003",
    employeeName: "Robert Williams",
    previousContractId: "CONT003",
    startDate: "2022-01-15",
    endDate: "2023-01-14",
    position: "Sales Representative",
    salary: 68000,
    salaryIncrease: 4.62,
    status: "Active",
  },
  {
    id: "REN004",
    employeeId: "EMP001",
    employeeName: "John Smith",
    previousContractId: "REN001",
    startDate: "2022-05-12",
    endDate: "2023-05-11",
    position: "Senior Developer",
    salary: 95000,
    salaryIncrease: 5.56,
    status: "Active",
  },
  {
    id: "REN005",
    employeeId: "EMP002",
    employeeName: "Mary Johnson",
    previousContractId: "REN002",
    startDate: "2021-03-24",
    endDate: "2022-03-23",
    position: "Marketing Director",
    salary: 98000,
    salaryIncrease: 3.16,
    status: "Expired",
  },
]

// Columnas para la tabla
const columns: ColumnDef<ContractRenewal>[] = [
  {
    accessorKey: "id",
    header: "Renewal ID",
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
    accessorKey: "salaryIncrease",
    header: "Increase %",
    cell: ({ row }) => {
      const increase = Number.parseFloat(row.getValue("salaryIncrease"))
      return <div>{increase.toFixed(2)}%</div>
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

export default function ContractRenewalsPage() {
  const { t } = useApp()

  return (
    <ListLayout<ContractRenewal>
      title={t("renewals")}
      moduleKey="employees"
      navItems={employeesNavItems}
      columns={columns}
      data={renewalsData}
      addNewPath="/employees/contracts/renewals/new"
      addNewTitleKey="addRenewal"
      detailPath={(id) => `/employees/contracts/renewals/${id}`}
      getItemId={(renewal) => renewal.id}
      filterField="employeeName"
    />
  )
}


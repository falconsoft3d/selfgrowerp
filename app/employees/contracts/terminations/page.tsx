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

// Tipo para terminación de contrato
type ContractTermination = {
  id: string
  employeeId: string
  employeeName: string
  contractId: string
  terminationDate: string
  reason: string
  severancePackage: number
  type: "Voluntary" | "Involuntary" | "Retirement" | "End of Contract"
}

// Datos de ejemplo
const terminationsData: ContractTermination[] = [
  {
    id: "TERM001",
    employeeId: "EMP007",
    employeeName: "David Wilson",
    contractId: "CONT007",
    terminationDate: "2021-06-15",
    reason: "Performance issues",
    severancePackage: 5000,
    type: "Involuntary",
  },
  {
    id: "TERM002",
    employeeId: "EMP009",
    employeeName: "Thomas Anderson",
    contractId: "CONT009",
    terminationDate: "2022-02-28",
    reason: "Better opportunity elsewhere",
    severancePackage: 0,
    type: "Voluntary",
  },
  {
    id: "TERM003",
    employeeId: "EMP010",
    employeeName: "Richard Harris",
    contractId: "CONT010",
    terminationDate: "2022-05-31",
    reason: "Reached retirement age",
    severancePackage: 15000,
    type: "Retirement",
  },
  {
    id: "TERM004",
    employeeId: "EMP011",
    employeeName: "Patricia Clark",
    contractId: "CONT011",
    terminationDate: "2022-08-15",
    reason: "Contract period ended",
    severancePackage: 0,
    type: "End of Contract",
  },
  {
    id: "TERM005",
    employeeId: "EMP012",
    employeeName: "Elizabeth Walker",
    contractId: "CONT012",
    terminationDate: "2022-10-07",
    reason: "Company restructuring",
    severancePackage: 8000,
    type: "Involuntary",
  },
]

// Columnas para la tabla
const columns: ColumnDef<ContractTermination>[] = [
  {
    accessorKey: "id",
    header: "Termination ID",
  },
  {
    accessorKey: "employeeName",
    header: "Employee",
  },
  {
    accessorKey: "terminationDate",
    header: "Termination Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("terminationDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "severancePackage",
    header: "Severance",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("severancePackage"))
      if (amount === 0) return <div>N/A</div>

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge
          variant={
            type === "Voluntary"
              ? "secondary"
              : type === "Involuntary"
                ? "destructive"
                : type === "Retirement"
                  ? "default"
                  : "outline"
          }
        >
          {type}
        </Badge>
      )
    },
  },
]

export default function ContractTerminationsPage() {
  const { t } = useApp()

  return (
    <ListLayout<ContractTermination>
      title={t("terminations")}
      moduleKey="employees"
      navItems={employeesNavItems}
      columns={columns}
      data={terminationsData}
      addNewPath="/employees/contracts/terminations/new"
      addNewTitleKey="addTermination"
      detailPath={(id) => `/employees/contracts/terminations/${id}`}
      getItemId={(termination) => termination.id}
      filterField="employeeName"
    />
  )
}


"use client"

import { columns, type Employee } from "./columns"
import { ListLayout } from "@/components/layouts/list-layout"
import { useApp } from "@/contexts/app-context"
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

const data: Employee[] = [
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

export default function EmployeesPage() {
  const { t } = useApp()

  return (
    <ListLayout<Employee>
      title={t("list")}
      moduleKey="employees"
      navItems={employeesNavItems}
      columns={columns}
      data={data}
      addNewPath="/employees/new"
      addNewTitleKey="addEmployee"
      detailPath={(id) => `/employees/${id}`}
      getItemId={(employee) => employee.id}
      filterField="name"
    />
  )
}


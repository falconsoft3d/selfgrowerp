"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Tipos para las compañías
export interface Company {
  id: string
  name: string
  logo?: string
}

// Idiomas disponibles
export type Language = "es" | "en" | "fr" | "de" | "pt"

// Tipo para el contexto
interface AppContextType {
  currentCompany: Company
  companies: Company[]
  setCurrentCompany: (company: Company) => void
  language: Language
  setLanguage: (lang: Language) => void
  translations: Record<string, Record<string, string>>
  t: (key: string) => string
}

// Compañías de ejemplo
const defaultCompanies: Company[] = [
  { id: "comp1", name: "Main Company Inc." },
  { id: "comp2", name: "Tech Division" },
  { id: "comp3", name: "International Branch" },
  { id: "comp4", name: "Innovation Startup" },
]

// Traducciones de ejemplo
const defaultTranslations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    inventory: "Inventory",
    employees: "Employees",
    finances: "Finances",
    projects: "Projects",
    settings: "Settings",
    help: "Need help?",
    documentation: "View documentation",
    switchCompany: "Switch company",
    language: "Language",
    products: "Products",
    categories: "Categories",
    suppliers: "Suppliers",
    movements: "Movements",
    addProduct: "Add Product",
    addCategory: "Add Category",
    addSupplier: "Add Supplier",
    addMovement: "Add Movement",
    overview: "Overview",
    analytics: "Analytics",
    reports: "Reports",
    notifications: "Notifications",
    list: "List",
    departments: "Departments",
    positions: "Positions",
    permissions: "Permissions",
    addEmployee: "Add Employee",
    totalRevenue: "Total Revenue",
    users: "Users",
    sales: "Sales",
    pendingTasks: "Pending Tasks",
    summary: "Summary",
    recentActivity: "Recent Activity",
    completedTasks: "You have completed 65% of your planned tasks this week.",
    download: "Download",
    selectDate: "Select date",
    comparedToLastMonth: "compared to last month",
    comparedToLastWeek: "compared to last week",
    contracts: "Contracts",
    initialContracts: "Initial Contracts",
    renewals: "Renewals",
    terminations: "Terminations",
    addInitialContract: "Add Initial Contract",
    addRenewal: "Add Renewal",
    addTermination: "Add Termination",
  },
  es: {
    dashboard: "Panel de Control",
    inventory: "Inventario",
    employees: "Empleados",
    finances: "Finanzas",
    projects: "Proyectos",
    settings: "Configuración",
    help: "¿Necesitas ayuda?",
    documentation: "Ver documentación",
    switchCompany: "Cambiar empresa",
    language: "Idioma",
    products: "Productos",
    categories: "Categorías",
    suppliers: "Proveedores",
    movements: "Movimientos",
    addProduct: "Añadir Producto",
    addCategory: "Añadir Categoría",
    addSupplier: "Añadir Proveedor",
    addMovement: "Añadir Movimiento",
    overview: "Vista General",
    analytics: "Analíticas",
    reports: "Reportes",
    notifications: "Notificaciones",
    list: "Listado",
    departments: "Departamentos",
    positions: "Cargos",
    permissions: "Permisos",
    addEmployee: "Añadir Empleado",
    totalRevenue: "Ingresos Totales",
    users: "Usuarios",
    sales: "Ventas",
    pendingTasks: "Tareas Pendientes",
    summary: "Resumen",
    recentActivity: "Actividad Reciente",
    completedTasks: "Has completado 65% de tus tareas planeadas esta semana.",
    download: "Descargar",
    selectDate: "Seleccionar fecha",
    comparedToLastMonth: "respecto al mes anterior",
    comparedToLastWeek: "respecto a la semana anterior",
    contracts: "Contratos",
    initialContracts: "Contratos Iniciales",
    renewals: "Renovaciones",
    terminations: "Terminaciones",
    addInitialContract: "Añadir Contrato Inicial",
    addRenewal: "Añadir Renovación",
    addTermination: "Añadir Terminación",
  },
  fr: {
    dashboard: "Tableau de Bord",
    inventory: "Inventaire",
    employees: "Employés",
    finances: "Finances",
    projects: "Projets",
    settings: "Paramètres",
    help: "Besoin d'aide?",
    documentation: "Voir la documentation",
    switchCompany: "Changer d'entreprise",
    language: "Langue",
    products: "Produits",
    categories: "Catégories",
    suppliers: "Fournisseurs",
    movements: "Mouvements",
    addProduct: "Ajouter un Produit",
    addCategory: "Ajouter une Catégorie",
    addSupplier: "Ajouter un Fournisseur",
    addMovement: "Ajouter un Mouvement",
    overview: "Vue d'ensemble",
    analytics: "Analytique",
    reports: "Rapports",
    notifications: "Notifications",
    list: "Liste",
    departments: "Départements",
    positions: "Postes",
    permissions: "Permissions",
    addEmployee: "Ajouter un Employé",
    totalRevenue: "Revenu Total",
    users: "Utilisateurs",
    sales: "Ventes",
    pendingTasks: "Tâches en Attente",
    summary: "Résumé",
    recentActivity: "Activité Récente",
    completedTasks: "Vous avez terminé 65% de vos tâches prévues cette semaine.",
    download: "Télécharger",
    selectDate: "Sélectionner une date",
    comparedToLastMonth: "par rapport au mois précédent",
    comparedToLastWeek: "par rapport à la semaine précédente",
    contracts: "Contrats",
    initialContracts: "Contrats Initiaux",
    renewals: "Renouvellements",
    terminations: "Résiliations",
    addInitialContract: "Ajouter un Contrat Initial",
    addRenewal: "Ajouter un Renouvellement",
    addTermination: "Ajouter une Résiliation",
  },
  de: {
    dashboard: "Dashboard",
    inventory: "Inventar",
    employees: "Mitarbeiter",
    finances: "Finanzen",
    projects: "Projekte",
    settings: "Einstellungen",
    help: "Brauchst du Hilfe?",
    documentation: "Dokumentation anzeigen",
    switchCompany: "Unternehmen wechseln",
    language: "Sprache",
    products: "Produkte",
    categories: "Kategorien",
    suppliers: "Lieferanten",
    movements: "Bewegungen",
    addProduct: "Produkt hinzufügen",
    addCategory: "Kategorie hinzufügen",
    addSupplier: "Lieferant hinzufügen",
    addMovement: "Bewegung hinzufügen",
    overview: "Überblick",
    analytics: "Analytik",
    reports: "Berichte",
    notifications: "Benachrichtigungen",
    list: "Liste",
    departments: "Abteilungen",
    positions: "Positionen",
    permissions: "Berechtigungen",
    addEmployee: "Mitarbeiter hinzufügen",
    totalRevenue: "Gesamtumsatz",
    users: "Benutzer",
    sales: "Verkäufe",
    pendingTasks: "Ausstehende Aufgaben",
    summary: "Zusammenfassung",
    recentActivity: "Aktuelle Aktivität",
    completedTasks: "Sie haben 65% Ihrer geplanten Aufgaben für diese Woche erledigt.",
    download: "Herunterladen",
    selectDate: "Datum auswählen",
    comparedToLastMonth: "im Vergleich zum Vormonat",
    comparedToLastWeek: "im Vergleich zur Vorwoche",
    contracts: "Verträge",
    initialContracts: "Erstverträge",
    renewals: "Verlängerungen",
    terminations: "Kündigungen",
    addInitialContract: "Erstvertrag hinzufügen",
    addRenewal: "Verlängerung hinzufügen",
    addTermination: "Kündigung hinzufügen",
  },
  pt: {
    dashboard: "Painel de Controle",
    inventory: "Inventário",
    employees: "Funcionários",
    finances: "Finanças",
    projects: "Projetos",
    settings: "Configurações",
    help: "Precisa de ajuda?",
    documentation: "Ver documentação",
    switchCompany: "Mudar empresa",
    language: "Idioma",
    products: "Produtos",
    categories: "Categorias",
    suppliers: "Fornecedores",
    movements: "Movimentos",
    addProduct: "Adicionar Produto",
    addCategory: "Adicionar Categoria",
    addSupplier: "Adicionar Fornecedor",
    addMovement: "Adicionar Movimento",
    overview: "Visão Geral",
    analytics: "Análises",
    reports: "Relatórios",
    notifications: "Notificações",
    list: "Lista",
    departments: "Departamentos",
    positions: "Cargos",
    permissions: "Permissões",
    addEmployee: "Adicionar Funcionário",
    totalRevenue: "Receita Total",
    users: "Usuários",
    sales: "Vendas",
    pendingTasks: "Tarefas Pendentes",
    summary: "Resumo",
    recentActivity: "Atividade Recente",
    completedTasks: "Você concluiu 65% das suas tarefas planejadas esta semana.",
    download: "Baixar",
    selectDate: "Selecionar data",
    comparedToLastMonth: "em comparação com o mês anterior",
    comparedToLastWeek: "em comparação com a semana anterior",
    contracts: "Contratos",
    initialContracts: "Contratos Iniciais",
    renewals: "Renovações",
    terminations: "Rescisões",
    addInitialContract: "Adicionar Contrato Inicial",
    addRenewal: "Adicionar Renovação",
    addTermination: "Adicionar Rescisão",
  },
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined)

// Proveedor del contexto
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentCompany, setCurrentCompany] = useState<Company>(defaultCompanies[0])
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>(defaultTranslations)

  // Función para obtener traducciones
  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  return (
    <AppContext.Provider
      value={{
        currentCompany,
        companies: defaultCompanies,
        setCurrentCompany,
        language,
        setLanguage,
        translations,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Hook para usar el contexto
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}


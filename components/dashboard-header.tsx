"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es, enUS, fr, de, pt } from "date-fns/locale"
import { CalendarIcon, Download } from "lucide-react"
import { useState } from "react"
import { useApp } from "@/contexts/app-context"

// Mapping languages to date-fns locales
const locales = {
  es: es,
  en: enUS,
  fr: fr,
  de: de,
  pt: pt,
}

export function DashboardHeader() {
  const [date, setDate] = useState<Date>()
  const { language, currentCompany, t } = useApp()

  // Select locale based on current language
  const locale = locales[language]

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">{currentCompany.name}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale }) : <span>{t("selectDate")}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={locale} />
          </PopoverContent>
        </Popover>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          {t("download")}
        </Button>
      </div>
    </div>
  )
}


import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromCurrentMonth } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

type Summary = {
  id: string
  date: string
  completed: number
  amount: number
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  const dates = generateDatesFromCurrentMonth()

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data)
    })
  }, [])
  const firstDayWeekday = dayjs(dates[0]).day()

  const leadingEmptyDays = Array.from({ length: firstDayWeekday })

  return (
    <div className="m-auto w-fit flex flex-col">
      <div className="grid grid-cols-7 gap-3 mb-3">
        {weekDays.map((weekDay, i) => (
          <div
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {/* Renderiza os espaços vazios para alinhar o primeiro dia */}
        {leadingEmptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="w-10 h-10" />
        ))}

        {dates.map((date) => {
          const dayData = summary.find((day) =>
            dayjs(date).isSame(day.date, "day")
          )

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayData?.amount}
              defaultCompleted={dayData?.completed}
            />
          )
        })}
      </div>
    </div>
  )
}

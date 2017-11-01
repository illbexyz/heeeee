// @flow
import padStart from "lodash/padStart"

const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
]

export const dateToLessonId = (date: Date) => {
    const d = new Date(date)
    var day = padStart(d.getDate(), 2, "0")
    var month = padStart(d.getMonth() + 1, 2, "0")
    var year = d.getFullYear()

    return `${year}-${month}-${day}`
}

export const prettyDate = (date: Date) => {
    const d = new Date(date)
    var day = d.getDate()
    var monthIndex = d.getMonth()
    var year = d.getFullYear()

    return `${day} ${monthNames[monthIndex]} ${year}`
}

export function onlyIf<T>(condition: boolean, component: T, placeholer?: T) {
    return condition ? component : placeholer || null
}

export function countType(lesson: Lesson, type: string) {
    if (!lesson.counters) {
        return 0
    } else {
        return lesson.counters.filter(counter => counter.type === type).length
    }
}

export function areSameDate(d1: Date, d2: Date) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

// @flow

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
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()

    return `${year}-${month}-${day}`
}

export const prettyDate = (date: Date) => {
    var day = date.getDate()
    var monthIndex = date.getMonth()
    var year = date.getFullYear()

    return `${day} ${monthNames[monthIndex]} ${year}`
}

export function onlyIf<T>(condition: boolean, component: T, placeholer?: T) {
    return condition ? component : placeholer || null
}

export function countType(lesson: Lesson, type: string) {
    return lesson.counters.filter(counter => counter.type === type).length
}

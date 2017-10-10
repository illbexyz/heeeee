// @flow

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
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

    return `${day}-${monthNames[monthIndex]}-${year}`
}
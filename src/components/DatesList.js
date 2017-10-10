// @flow

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import { type Lesson } from '../config/firebase'

import { prettyDate } from '../utils'

type DatesListProps = {
    lessons: Lesson[],
    onLessonChange: (lesson: Lesson) => any
}

class Dates extends Component<DatesListProps> {
    render() {
        const { lessons, onLessonChange } = this.props
        return (
            <Menu vertical>
                {lessons.map(lesson => (
                    <Menu.Item
                        name={prettyDate(lesson.date)}
                        key={lesson.date.getTime()}
                        onClick={() => onLessonChange(lesson)}
                    />
                ))}
            </Menu>
        )
    }
}

export default Dates

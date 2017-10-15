// @flow

import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import { observer, inject } from "mobx-react"
import { Link } from "react-router-dom"

import { type Lesson } from "../config/firebase"
import { LessonsStore } from "../stores/lessons"
import { prettyDate, dateToLessonId } from "../utils"

type LessonsListProps = {
    lessons: Lesson[],
    onLessonChange: (lesson: Lesson) => any
}

export class LessonsList extends Component<LessonsListProps> {
    render() {
        const { lessons, onLessonChange } = this.props
        return (
            <List>
                {lessons.reverse().map(lesson => (
                    <Link
                        to={`/lessons/${dateToLessonId(lesson.date)}`}
                        key={dateToLessonId(lesson.date)}
                        style={{ textDecoration: "none" }}
                    >
                        <ListItem
                            button
                            onClick={() =>
                                onLessonChange(dateToLessonId(lesson.date))}
                        >
                            <ListItemText primary={prettyDate(lesson.date)} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        )
    }
}

type LessonsListContainerProps = {
    lessonsStore: LessonsStore
}

const LessonsListContainer = inject("lessonsStore")(
    observer(
        class LessonsListContainer extends Component<
            LessonsListContainerProps
        > {
            render() {
                const { lessonsStore } = this.props
                return (
                    <LessonsList
                        lessons={lessonsStore.lessons}
                        onLessonChange={lessonsStore.selectLesson}
                    />
                )
            }
        }
    )
)

export default LessonsListContainer

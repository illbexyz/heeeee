// @flow

import { action, extendObservable } from "mobx"

import type { Lesson } from "../config/firebase"
import firebaseStore from "../stores/firebase"
import { dateToLessonId } from "../utils"

export type LessonUpdateType = "haaaaa" | "heeeee" | "hmmmmm" | "okay"

export class LessonsStore {
    lessons: Lesson[]
    currentLesson: Lesson

    unsubscribe: () => any = () => {}

    constructor() {
        extendObservable(this, {
            lessons: [],
            currentLesson: null
        })
        firebaseStore.fetchLessons(lessons => {
            this.lessons = lessons
        })
    }

    selectLesson = action("selectLesson", (lessonId: string) => {
        if (
            !this.currentLesson ||
            dateToLessonId(this.currentLesson.date) !== lessonId
        ) {
            this.unsubscribe()
            this.unsubscribe = firebaseStore.subscribeForLesson(
                lessonId,
                this.onLessonUpdate
            )
        }
    })

    updateLesson = action(
        "updateLesson",
        (type: LessonUpdateType, action: "increment" | "decrement") => {
            firebaseStore.updateLesson({
                ...this.currentLesson,
                [type]:
                    action === "increment"
                        ? this.currentLesson[type] + 1
                        : this.currentLesson[type] - 1
            })
        }
    )

    incrementSelected = action("increment", (type: LessonUpdateType) => {
        this.updateLesson(type, "increment")
    })

    decrementSelected = action("decrement", (type: LessonUpdateType) => {
        this.updateLesson(type, "decrement")
    })

    onLessonUpdate = action("onLessonUpdate", doc => {
        this.currentLesson = doc.data()
    })
}

export default new LessonsStore()

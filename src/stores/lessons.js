// @flow

import { action, extendObservable } from "mobx"

import type { Lesson } from "../config/firebase"
import firebaseStore from "../stores/firebase"
import { dateToLessonId } from "../utils"

export type LessonUpdateType = "haaaaa" | "heeeee" | "hmmmmm" | "okay"

export class LessonsStore {
    lessonsDB = {}
    currentLesson: Lesson

    constructor() {
        extendObservable(this, {
            lessonsDB: [],
            currentLesson: null
        })
        firebaseStore.fetchLessons(lessons => {
            this.lessonsDB = lessons
        })
    }

    get lessons() {
        return Object.values(this.lessonsDB)
    }

    selectLesson = action("selectLesson", (lessonId: string) => {
        if (
            !this.currentLesson ||
            dateToLessonId(this.currentLesson.date) !== lessonId
        ) {
            this.currentLesson = this.lessonsDB[lessonId]
            firebaseStore.subscribeForLesson(lessonId, this.onLessonUpdate)
        }
    })

    addDataToLesson = action("addDataToLesson", (type: LessonUpdateType) => {
        const item = {
            type,
            timestamp: new Date().toString()
        }
        firebaseStore.addToCollection(
            `/counters/${dateToLessonId(this.currentLesson.date)}`,
            item
        )
    })

    removeDataToLesson = action(
        "removeDataToLesson",
        (type: LessonUpdateType) => {
            // TODO
        }
    )

    incrementSelected = action("increment", (type: LessonUpdateType) => {
        this.addDataToLesson(type)
    })

    decrementSelected = action("decrement", (type: LessonUpdateType) => {
        this.updateLesson(type, "decrement")
    })

    onLessonUpdate = action("onLessonUpdate", lesson => {
        this.currentLesson = lesson
    })
}

export default new LessonsStore()

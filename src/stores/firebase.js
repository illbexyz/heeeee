// @flow

import { action, extendObservable } from "mobx"

import type { Lesson } from "../config/firebase"
import database from "../config/firebase"

import { dateToLessonId } from "../utils"

export class FirebaseStore {
    isFetchingLessons: boolean

    constructor() {
        extendObservable(this, {
            isFetchingLessons: false
        })
    }

    fetchLessons = action("fetchLessons", (onSuccess, onFail) => {
        this.isFetchingLessons = true
        return database
            .collection("lessons")
            .get()
            .then(doc => this.fetchLessonsSuccess(doc, onSuccess))
            .catch(error => this.fetchLessonsFail(error, onFail))
    })

    fetchLessonsSuccess = action(
        "fetchLessonsSuccess",
        (querySnapshot, onSuccess) => {
            this.isFetchingLessons = false
            const lessons: Lesson[] = []
            querySnapshot.forEach(doc => lessons.push(doc.data()))
            onSuccess(lessons)
        }
    )

    fetchLessonsFail = action("fetchLessonsFail", (error, onFail) => {
        this.isFetchingLessons = false
        console.log(error)
    })

    subscribeForLesson = action(
        "selectLesson",
        (lessonId: string, subscriber: (doc: any) => any) => {
            return database
                .collection("lessons")
                .doc(lessonId)
                .onSnapshot(subscriber)
        }
    )

    updateLesson = action("updateLesson", (lesson: Lesson) => {
        database
            .collection("lessons")
            .doc(dateToLessonId(lesson.date))
            .update(lesson)
    })
}

export default new FirebaseStore()

// @flow

import { action, extendObservable } from "mobx"

import type { Lesson } from "../config/firebase"
import database from "../config/firebase"

import { dateToLessonId } from "../utils"

const counterDocToCountersArray = counterDoc =>
    counterDoc.docs.map(doc => ({
        type: doc.data().type,
        timestamp: doc.data().timestamp
    }))

export class FirebaseStore {
    isFetchingLessons: boolean
    unsubscribe: () => any = () => {}

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
        async (snapshot, onSuccess) => {
            this.isFetchingLessons = false
            const lessons = snapshot.docs.map(doc => doc.data())
            const countersDocPromises = lessons.map(lesson =>
                database
                    .collection(
                        `lessons/${dateToLessonId(lesson.date)}/counters`
                    )
                    .get()
            )
            const countersDocs = await Promise.all(countersDocPromises)

            const counters = countersDocs.map(counterDoc =>
                counterDocToCountersArray(counterDoc)
            )

            const lessonsWithCounters = lessons.map((lesson, index) => ({
                ...lesson,
                counters: counters[index]
            }))

            onSuccess(lessonsWithCounters)
        }
    )

    fetchLessonsFail = action("fetchLessonsFail", (error, onFail) => {
        this.isFetchingLessons = false
        console.log(error)
    })

    subscribeForLesson = action(
        "selectLesson",
        async (lessonId: string, subscriber: (doc: any) => any) => {
            const lessonDoc = await database
                .collection("lessons")
                .doc(lessonId)
                .get()
            const lesson = lessonDoc.data()
            this.unsubscribe()
            this.unsubscribe = database
                .collection(`lessons/${lessonId}/counters`)
                .onSnapshot(snapshot => {
                    const counters = counterDocToCountersArray(snapshot)
                    subscriber({
                        ...lesson,
                        counters
                    })
                })
        }
    )

    updateLesson = action("updateLesson", (lesson: Lesson) => {
        database
            .collection("lessons")
            .doc(dateToLessonId(lesson.date))
            .update(lesson)
    })

    addToCollection = action(
        "addToCollection",
        (collectionId: string, data: any) => {
            database.collection(collectionId).add(data)
        }
    )
}

export default new FirebaseStore()

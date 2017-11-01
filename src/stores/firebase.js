// @flow

import { action, extendObservable } from "mobx"

import database from "../config/firebase"

const counterDocToCountersArray = counterDoc => {
    const counters = counterDoc.val()
    if (counters) {
        return Object.keys(counters).map(key => {
            return {
                type: counters[key].type,
                timestamp: new Date(counters[key].timestamp)
            }
        })
    } else {
        return []
    }
}

export class FirebaseStore {
    isFetchingLessons: boolean
    unsubscribeRef = {
        off: () => {}
    }

    constructor() {
        extendObservable(this, {
            isFetchingLessons: false
        })
    }

    fetchLessons = action("fetchLessons", (onSuccess, onFail) => {
        this.isFetchingLessons = true
        return database
            .ref("/lessons")
            .once("value")
            .then(doc => this.fetchLessonsSuccess(doc, onSuccess))
            .catch(error => this.fetchLessonsFail(error, onFail))
    })

    fetchLessonsSuccess = action(
        "fetchLessonsSuccess",
        async (snapshot, onSuccess) => {
            this.isFetchingLessons = false
            const lessons = snapshot.val()
            onSuccess(lessons)
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
                .ref(`/lessons/${lessonId}`)
                .once("value")
            const lesson = lessonDoc.val()
            const ref = database.ref(`/counters/${lessonId}`)

            this.unsubscribeRef.off()
            ref.on("value", snapshot => {
                const counters = counterDocToCountersArray(snapshot)
                subscriber({
                    ...lesson,
                    counters: counters
                })
            })
            this.unsubscribeRef = ref
        }
    )

    addToCollection = action(
        "addToCollection",
        (collectionId: string, data: any) => {
            database
                .ref(collectionId)
                .push()
                .set(data)
        }
    )
}

export default new FirebaseStore()

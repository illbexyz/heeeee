// @flow

import { action, extendObservable } from 'mobx'

import database, { type Lesson } from '../config/firebase'

import { dateToLessonId } from '../utils'

export type UpdateType = 'haaaaa' | 'heeeee' | 'hmmmmm' | 'okay'

export class FirebaseStore {
    lessons: Lesson[]
    currentLesson: Lesson

    unsubscribe: () => any = () => {}

    constructor() {
        extendObservable(this, {
            lessons: [],
            currentLesson: null
        })
    }

    fetchLessons = action(() => {
        database
            .collection('lessons')
            .get()
            .then(querySnapshot => {
                const l: Lesson[] = []
                querySnapshot.forEach(doc => l.push(doc.data()))
                this.lessons = l
            })
            .catch(error => {
                console.log(error)
            })
    })

    selectLesson = action((lesson: Lesson) => {
        this.currentLesson = lesson
        this.unsubscribe()
        this.unsubscribe = database
            .collection('lessons')
            .doc(dateToLessonId(lesson.date))
            .onSnapshot(this.lessonChanged)
    })

    changeLesson = (type: UpdateType, action: 'increment' | 'decrement') => {
        database
            .collection('lessons')
            .doc(dateToLessonId(this.currentLesson.date))
            .update({
                [type]:
                    action === 'increment'
                        ? this.currentLesson[type] + 1
                        : this.currentLesson[type] - 1
            })
    }

    increment = action((type: UpdateType) => {
        this.changeLesson(type, 'increment')
    })

    decrement = action((type: UpdateType) => {
        this.changeLesson(type, 'decrement')
    })

    lessonChanged = action(doc => {
        this.currentLesson = doc.data()
    })
}

export default new FirebaseStore()

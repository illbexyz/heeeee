// @flow

import firebase from "firebase"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyC_nxjtutAjPsjy2rFwbrIHVdaeWN0Ce_M",
    authDomain: "heeeee-6552c.firebaseapp.com",
    databaseURL: "https://heeeee-6552c.firebaseio.com",
    projectId: "heeeee-6552c",
    storageBucket: "",
    messagingSenderId: "970460112045"
}

firebase.initializeApp(config)

export type LessonData = {
    type: string,
    timestamp: Date
}

export type Lesson = {
    date: Date,
    counters: LessonData[],
    haaaaa?: number,
    heeeee?: number,
    hmmmmm?: number,
    okay?: number
}

const db = firebase.firestore()

export default db

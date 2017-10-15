// @flow

import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import { Switch, Route, withRouter } from "react-router-dom"

import { LessonsStore } from "../stores/lessons"

import LessonUI from "./Lesson"
import SelectLesson from "./SelectLesson"

type AppProps = {
    lessonsStore: LessonsStore
}

const PageLessons = withRouter(
    inject("lessonsStore")(
        observer(
            class App extends Component<AppProps> {
                render() {
                    const { lessonsStore } = this.props

                    return (
                        <Switch>
                            <Route
                                path="/lessons/:id"
                                render={({ match }) => {
                                    lessonsStore.selectLesson(match.params.id)

                                    return (
                                        <LessonUI
                                            lesson={lessonsStore.getLessonById(
                                                match.params.id
                                            )}
                                            onIncrement={
                                                lessonsStore.incrementSelected
                                            }
                                            onDecrement={
                                                lessonsStore.decrementSelected
                                            }
                                            match={match}
                                        />
                                    )
                                }}
                            />
                            <Route path="/lessons" component={SelectLesson} />
                        </Switch>
                    )
                }
            }
        )
    )
)

export default PageLessons

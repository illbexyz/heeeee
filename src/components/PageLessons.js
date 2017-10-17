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
                    const {
                        currentLesson,
                        incrementSelected,
                        decrementSelected
                    } = lessonsStore
                    return (
                        <Switch>
                            <Route
                                exact
                                path="/lessons"
                                component={SelectLesson}
                            />
                            <Route
                                path="/lessons/:id"
                                render={({ match }) => {
                                    lessonsStore.selectLesson(match.params.id)

                                    return (
                                        <LessonUI
                                            lesson={currentLesson}
                                            onIncrement={incrementSelected}
                                            onDecrement={decrementSelected}
                                            match={match}
                                        />
                                    )
                                }}
                            />
                        </Switch>
                    )
                }
            }
        )
    )
)

export default PageLessons

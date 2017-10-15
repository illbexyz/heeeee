import React, { Component } from "react"
import { inject, observer } from "mobx-react"

import Typography from "material-ui/Typography"
import { CircularProgress } from "material-ui/Progress"

import { FirebaseStore } from "../stores/firebase"

import { onlyIf } from "../utils"

import LessonsList from "./LessonsList"

const SelectLesson = ({ isFetchingLessons }) => (
    <div>
        <Typography type="display2" paragraph>
            Seleziona una lezione
        </Typography>
        {onlyIf(
            !isFetchingLessons,
            <LessonsList />,
            <CircularProgress size={50} />
        )}
    </div>
)

type SelectLessonContainerProps = {
    firebaseStore: FirebaseStore
}

const SelectLessonContainer = inject("firebaseStore")(
    observer(
        class SelectLessonContainer extends Component<
            SelectLessonContainerProps
        > {
            render() {
                const { firebaseStore } = this.props
                return (
                    <SelectLesson
                        isFetchingLessons={firebaseStore.isFetchingLessons}
                    />
                )
            }
        }
    )
)

export default SelectLessonContainer

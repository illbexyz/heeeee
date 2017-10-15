import React, { Component } from "react"
import styled from "styled-components"
import { inject, observer } from "mobx-react"

import Typography from "material-ui/Typography"
import { CircularProgress } from "material-ui/Progress"

import { FirebaseStore } from "../stores/firebase"

import { onlyIf } from "../utils"

import LessonsList from "./LessonsList"

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SelectLesson = ({ isFetchingLessons }) => (
    <Container>
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
    </Container>
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

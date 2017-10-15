// @flow

import React, { Component } from "react"
import styled from "styled-components"

import Typography from "material-ui/Typography"
import { CircularProgress } from "material-ui/Progress"

import { type UpdateType } from "../stores/firebase"
import { type Lesson } from "../config/firebase"

import { onlyIf } from "../utils"

import LessonButtons from "./LessonButtons"

const Paragraph = styled.div`
    margin-bottom: 36px;
`

type LessonProps = {
    lesson: Lesson,
    onIncrement: (type: UpdateType) => any,
    onDecrement: (type: UpdateType) => any
}

class LessonUI extends Component<LessonProps> {
    render() {
        const { lesson, onIncrement, onDecrement } = this.props

        return onlyIf(
            lesson,
            <div>
                <Paragraph>
                    <LessonButtons
                        lesson={lesson}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                    />
                </Paragraph>
                <Typography type="display2" paragraph>
                    Grafici
                </Typography>
            </div>,
            <CircularProgress size={80} />
        )
    }
}

export default LessonUI

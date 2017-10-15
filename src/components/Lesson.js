// @flow

import React, { Component } from "react"
import styled from "styled-components"
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ResponsiveContainer
} from "recharts"
import compact from "lodash/compact"

import Fade from "material-ui/transitions/Fade"
import Hidden from "material-ui/Hidden"
import Typography from "material-ui/Typography"
import { CircularProgress } from "material-ui/Progress"

import type { LessonUpdateType } from "../stores/lessons"
import { type Lesson } from "../config/firebase"
import { primary } from "../config/colors"

import { onlyIf } from "../utils"

import LessonButtons from "./LessonButtons"
import LessonsDrawer from "./LessonsDrawer"

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`

const Paragraph = styled.div`
    margin-bottom: 36px;
`

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

type LessonProps = {
    lesson: Lesson,
    onIncrement: (type: LessonUpdateType) => any,
    onDecrement: (type: LessonUpdateType) => any
}

class LessonUI extends Component<LessonProps> {
    render() {
        const { lesson, onIncrement, onDecrement } = this.props

        const data =
            lesson &&
            compact(
                Object.keys(lesson).map(key => {
                    if (key !== "date") {
                        return {
                            name: key,
                            value: lesson[key]
                        }
                    } else {
                        return null
                    }
                })
            )

        return onlyIf(
            lesson,
            <Container>
                <Hidden smDown>
                    <LessonsDrawer />
                </Hidden>
                <Fade in>
                    <Wrapper>
                        <div>
                            <Paragraph>
                                <LessonButtons
                                    lesson={lesson}
                                    onIncrement={onIncrement}
                                    onDecrement={onDecrement}
                                />
                            </Paragraph>
                            <Typography
                                type="display2"
                                paragraph
                                style={{ alignSelf: "left" }}
                            >
                                Grafici
                            </Typography>
                            <ResponsiveContainer width="90%" height={300}>
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis dataKey="value" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill={primary[500]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Wrapper>
                </Fade>
            </Container>,
            <CircularProgress size={80} />
        )
    }
}

export default LessonUI

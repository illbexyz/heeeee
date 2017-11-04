// @flow

import React, { Component } from "react"
import styled from "styled-components"
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend
} from "recharts"
import compact from "lodash/compact"
import initial from "lodash/initial"
import last from "lodash/last"
import tail from "lodash/tail"
import moment from "moment"

import Fade from "material-ui/transitions/Fade"
import Hidden from "material-ui/Hidden"
import Typography from "material-ui/Typography"
import { CircularProgress } from "material-ui/Progress"

import type { LessonUpdateType } from "../stores/lessons"
import { type Lesson } from "../config/firebase"
import { primary } from "../config/colors"

import { countType, onlyIf } from "../utils"

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

function splitInIntervals(lesson: Lesson) {
    function reduceIntervals(prev, curr) {
        const lastPlusFive = moment(last(prev).timestamp).add(5, "minutes")
        const currMoment = moment(curr.timestamp)
        if (currMoment.isAfter(lastPlusFive, "minute")) {
            return [
                ...prev,
                {
                    heeeee: 0,
                    hmmmmm: 0,
                    okay: 0,
                    [curr.type]: 1,
                    timestamp: curr.timestamp
                }
            ]
        } else {
            const lastOfPrev = last(prev)
            return [
                ...initial(prev),
                { ...lastOfPrev, [curr.type]: (lastOfPrev[curr.type] || 0) + 1 }
            ]
        }
    }
    if (lesson && lesson.counters) {
        const sortedCounters = lesson.counters.sort(
            (one, two) => new Date(one.timestamp) - new Date(two.timestamp)
        )
        return tail(sortedCounters).reduce(reduceIntervals, [
            {
                heeeee: 0,
                hmmmmm: 0,
                okay: 0,
                [sortedCounters[0].type]: 1,
                timestamp: new Date(sortedCounters[0].timestamp)
            }
        ])
    } else {
        return null
    }
}

class LessonUI extends Component<LessonProps> {
    render() {
        const { lesson, onIncrement, onDecrement } = this.props

        const simpleCounters = lesson && {
            heeeee: countType(lesson, "heeeee"),
            hmmmmm: countType(lesson, "hmmmmm"),
            okay: countType(lesson, "okay")
        }

        const inputSource = lesson && (lesson.heeeee ? lesson : simpleCounters)

        const countData =
            inputSource &&
            compact(
                Object.keys(inputSource).map(key => {
                    if (key !== "date" && key !== "counters") {
                        return {
                            name: key,
                            value: inputSource[key]
                        }
                    } else {
                        return null
                    }
                })
            )

        const lineData = lesson && splitInIntervals(lesson)
        const lineData2 =
            lineData &&
            lineData.map(obj => ({
                ...obj,
                timestamp: moment(obj.timestamp).format("HH:mm")
            }))
        console.log(lineData)

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
                                <BarChart data={countData}>
                                    <XAxis dataKey="name" />
                                    <YAxis dataKey="value" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill={primary[500]} />
                                </BarChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer width="90%" height={300}>
                                <LineChart data={lineData2}>
                                    <XAxis dataKey="timestamp" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend iconType="square" />
                                    <Line
                                        type="monotone"
                                        dataKey="heeeee"
                                        stroke="#2196F3"
                                        dot={false}
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="hmmmmm"
                                        stroke="#f44336"
                                        dot={false}
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="okay"
                                        stroke="#009688"
                                        dot={false}
                                        strokeWidth={2}
                                    />
                                </LineChart>
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

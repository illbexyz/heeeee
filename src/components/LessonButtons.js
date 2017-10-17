// @flow

import React, { Component } from "react"
import { observer } from "mobx-react"

import Button from "material-ui/Button"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Grid from "material-ui/Grid"

import { type UpdateType } from "../stores/firebase"
import { type Lesson } from "../config/firebase"

import { areSameDate, countType } from "../utils"

type LessonProps = {
    lesson: Lesson,
    onIncrement: (type: UpdateType) => any,
    onDecrement: (type: UpdateType) => any
}

const LessonCard = ({ canClick, text, value, onIncrement, onDecrement }) => (
    <Card style={{ margin: "0px 4px" }}>
        <CardContent>
            <Typography type="body1">{text}</Typography>
            <Typography type="headline" component="h2">
                {value}
            </Typography>
        </CardContent>
        <CardActions>
            <Button raised dense onClick={onDecrement} disabled>
                -
            </Button>
            <Button
                color={"primary"}
                raised
                dense
                onClick={onIncrement}
                disabled={!canClick}
            >
                +
            </Button>
        </CardActions>
    </Card>
)

const LessonButtons = observer(
    class LessonButtons extends Component<LessonProps> {
        componentDidMount() {
            document.addEventListener("keydown", this.onKeyDown)
        }

        componentWillUnmount() {
            document.removeEventListener("keydown", this.onKeyDown)
        }

        onKeyDown = (event: KeyboardEvent) => {
            const { onIncrement } = this.props

            if (event.key === "a" || event.key === "1") {
                onIncrement("haaaaa")
            } else if (event.key === "e" || event.key === "2") {
                onIncrement("heeeee")
            } else if (event.key === "m" || event.key === "3") {
                onIncrement("hmmmmm")
            } else if (event.key === "o" || event.key === "4") {
                onIncrement("okay")
            }
        }

        render() {
            const { lesson, onIncrement, onDecrement } = this.props
            const now = new Date()
            const canClick =
                areSameDate(lesson.date, now) &&
                now.getUTCHours() >= 14 &&
                now.getUTCHours() <= 16
            console.log(now.getUTCHours())
            console.log(now.getHours())
            return (
                <Grid container justify={"center"} spacing={0}>
                    <Grid item>
                        <LessonCard
                            text="Haaaaa"
                            value={lesson.haaaaa || countType(lesson, "haaaaa")}
                            onIncrement={() => onIncrement("haaaaa")}
                            onDecrement={() => onDecrement("haaaaa")}
                            canClick={canClick}
                        />
                    </Grid>
                    <Grid item>
                        <LessonCard
                            text="Heeeee"
                            value={lesson.heeeee || countType(lesson, "heeeee")}
                            onIncrement={() => onIncrement("heeeee")}
                            onDecrement={() => onDecrement("heeeee")}
                            canClick={canClick}
                        />
                    </Grid>
                    <Grid item>
                        <LessonCard
                            text="Hmmmmm"
                            value={lesson.hmmmmm || countType(lesson, "hmmmmm")}
                            onIncrement={() => onIncrement("hmmmmm")}
                            onDecrement={() => onDecrement("hmmmmm")}
                            canClick={canClick}
                        />
                    </Grid>
                    <Grid item>
                        <LessonCard
                            text="Okay"
                            value={lesson.okay || countType(lesson, "okay")}
                            onIncrement={() => onIncrement("okay")}
                            onDecrement={() => onDecrement("okay")}
                            canClick={canClick}
                        />
                    </Grid>
                </Grid>
            )
        }
    }
)

export default LessonButtons

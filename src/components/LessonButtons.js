// @flow

import React, { Component } from "react"
import { observer } from "mobx-react"

import Button from "material-ui/Button"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Grid from "material-ui/Grid"

import { type UpdateType } from "../stores/firebase"
import { type Lesson } from "../config/firebase"

type LessonProps = {
    lesson: Lesson,
    onIncrement: (type: UpdateType) => any,
    onDecrement: (type: UpdateType) => any
}

const LessonCard = ({ text, value, onIncrement, onDecrement }) => (
    <Card>
        <CardContent>
            <Typography type="body1">{text}</Typography>
            <Typography type="headline" component="h2">
                {value}
            </Typography>
        </CardContent>
        <CardActions>
            <Button raised dense onClick={onDecrement}>
                -
            </Button>
            <Button color={"primary"} raised dense onClick={onIncrement}>
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
            return (
                <Grid container>
                    <Grid item>
                        <LessonCard
                            text="Haaaaa"
                            value={lesson.haaaaa}
                            onIncrement={() => onIncrement("haaaaa")}
                            onDecrement={() => onDecrement("haaaaa")}
                        />
                    </Grid>
                    <Grid item>
                        <LessonCard
                            text="Heeeee"
                            value={lesson.heeeee}
                            onIncrement={() => onIncrement("heeeee")}
                            onDecrement={() => onDecrement("heeeee")}
                        />
                    </Grid>
                    <Grid item>
                        <LessonCard
                            text="Hmmmmm"
                            value={lesson.hmmmmm}
                            onIncrement={() => onIncrement("hmmmmm")}
                            onDecrement={() => onDecrement("hmmmmm")}
                        />
                    </Grid>
                    <Grid item>
                        <LessonCard
                            text="Okay"
                            value={lesson.okay}
                            onIncrement={() => onIncrement("okay")}
                            onDecrement={() => onDecrement("okay")}
                        />
                    </Grid>
                </Grid>
            )
        }
    }
)

export default LessonButtons
